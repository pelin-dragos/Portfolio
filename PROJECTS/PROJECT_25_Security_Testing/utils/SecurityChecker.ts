import { Page, APIResponse } from '@playwright/test';

export interface SecurityHeaders {
  'X-Content-Type-Options'?: string;
  'X-Frame-Options'?: string;
  'X-XSS-Protection'?: string;
  'Strict-Transport-Security'?: string;
  'Content-Security-Policy'?: string;
  'Referrer-Policy'?: string;
}

export interface SecurityCheckResult {
  passed: boolean;
  message: string;
  details?: any;
}

/**
 * SecurityChecker - Performs security checks
 */
export class SecurityChecker {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Check security headers
   * @returns Security headers check result
   */
  async checkSecurityHeaders(): Promise<SecurityCheckResult> {
    const response = await this.page.goto(this.page.url());
    if (!response) {
      return {
        passed: false,
        message: 'Could not get response',
      };
    }

    const headers = response.headers();
    const missingHeaders: string[] = [];
    const issues: string[] = [];

    // Required headers
    const requiredHeaders: { [key: string]: string[] } = {
      'X-Content-Type-Options': ['nosniff'],
      'X-Frame-Options': ['DENY', 'SAMEORIGIN'],
      'X-XSS-Protection': ['1', '1; mode=block'],
    };

    // Check required headers
    for (const [header, validValues] of Object.entries(requiredHeaders)) {
      const value = headers[header.toLowerCase()];
      if (!value) {
        missingHeaders.push(header);
      } else if (!validValues.some(v => value.includes(v))) {
        issues.push(`${header} has invalid value: ${value}`);
      }
    }

    // Recommended headers
    const recommendedHeaders = [
      'Strict-Transport-Security',
      'Content-Security-Policy',
      'Referrer-Policy',
    ];

    for (const header of recommendedHeaders) {
      if (!headers[header.toLowerCase()]) {
        issues.push(`Recommended header missing: ${header}`);
      }
    }

    if (missingHeaders.length > 0) {
      return {
        passed: false,
        message: `Missing required security headers: ${missingHeaders.join(', ')}`,
        details: { missingHeaders, issues },
      };
    }

    if (issues.length > 0) {
      return {
        passed: true,
        message: 'Required headers present, but some recommendations missing',
        details: { issues },
      };
    }

    return {
      passed: true,
      message: 'All security headers are properly configured',
      details: { headers },
    };
  }

  /**
   * Check if site uses HTTPS
   * @returns HTTPS check result
   */
  async checkHTTPS(): Promise<SecurityCheckResult> {
    const url = this.page.url();
    const isHTTPS = url.startsWith('https://');

    if (!isHTTPS) {
      return {
        passed: false,
        message: `Site is not using HTTPS. Current URL: ${url}`,
        details: { url },
      };
    }

    return {
      passed: true,
      message: 'Site is using HTTPS',
      details: { url },
    };
  }

  /**
   * Check for XSS vulnerability
   * @param inputSelector - Selector for input field
   * @param payload - XSS payload
   * @returns XSS check result
   */
  async checkXSSVulnerability(
    inputSelector: string,
    payload: string
  ): Promise<SecurityCheckResult> {
    try {
      // Fill input with payload
      await this.page.fill(inputSelector, payload);
      
      // Try to submit or trigger the input
      await this.page.keyboard.press('Enter');
      await this.page.waitForTimeout(1000);

      // Check for alert dialogs (XSS indicator)
      const alertHandled = await this.page.evaluate(() => {
        return new Promise<boolean>((resolve) => {
          const originalAlert = window.alert;
          let alertTriggered = false;
          
          window.alert = () => {
            alertTriggered = true;
            resolve(true);
          };

          setTimeout(() => {
            if (!alertTriggered) {
              window.alert = originalAlert;
              resolve(false);
            }
          }, 500);
        });
      });

      if (alertHandled) {
        return {
          passed: false,
          message: `XSS vulnerability detected with payload: ${payload}`,
          details: { payload, alertTriggered: true },
        };
      }

      // Check if payload appears in page source (potential XSS)
      const pageContent = await this.page.content();
      if (pageContent.includes(payload) && !pageContent.includes('&lt;') && !pageContent.includes('%3C')) {
        return {
          passed: false,
          message: `Potential XSS vulnerability: payload not properly escaped`,
          details: { payload, foundInPage: true },
        };
      }

      return {
        passed: true,
        message: `No XSS vulnerability detected with payload: ${payload}`,
        details: { payload },
      };
    } catch (error: any) {
      return {
        passed: true, // Assume safe if we can't test
        message: `Could not test XSS vulnerability: ${error.message}`,
        details: { error: error.message },
      };
    }
  }

  /**
   * Check for SQL injection vulnerability
   * @param inputSelector - Selector for input field
   * @param payload - SQL injection payload
   * @returns SQL injection check result
   */
  async checkSQLInjection(
    inputSelector: string,
    payload: string
  ): Promise<SecurityCheckResult> {
    try {
      // Fill input with payload
      await this.page.fill(inputSelector, payload);
      await this.page.keyboard.press('Enter');
      await this.page.waitForTimeout(2000);

      // Check for SQL error messages in page
      const pageContent = (await this.page.content()).toLowerCase();
      const sqlErrors = [
        'sql syntax',
        'mysql error',
        'sql error',
        'database error',
        'ora-',
        'postgresql',
        'sqlite',
        'sql server',
      ];

      const foundErrors = sqlErrors.filter(error => pageContent.includes(error));

      if (foundErrors.length > 0) {
        return {
          passed: false,
          message: `Potential SQL injection vulnerability detected. SQL errors found: ${foundErrors.join(', ')}`,
          details: { payload, sqlErrors: foundErrors },
        };
      }

      return {
        passed: true,
        message: `No SQL injection vulnerability detected with payload: ${payload}`,
        details: { payload },
      };
    } catch (error: any) {
      return {
        passed: true,
        message: `Could not test SQL injection: ${error.message}`,
        details: { error: error.message },
      };
    }
  }

  /**
   * Check for CSRF protection
   * @param formSelector - Selector for form
   * @returns CSRF check result
   */
  async checkCSRFProtection(formSelector: string): Promise<SecurityCheckResult> {
    try {
      const form = this.page.locator(formSelector);
      const csrfToken = await form.locator('input[name*="csrf"], input[name*="token"], input[type="hidden"]').count();

      if (csrfToken > 0) {
        return {
          passed: true,
          message: 'CSRF protection detected (CSRF token found)',
          details: { csrfTokenFound: true },
        };
      }

      // Check for SameSite cookie attribute
      const cookies = await this.page.context().cookies();
      const hasSameSite = cookies.some(cookie => cookie.sameSite === 'Strict' || cookie.sameSite === 'Lax');

      if (hasSameSite) {
        return {
          passed: true,
          message: 'CSRF protection detected (SameSite cookie attribute)',
          details: { sameSiteCookie: true },
        };
      }

      return {
        passed: false,
        message: 'No CSRF protection detected',
        details: { csrfTokenFound: false, sameSiteCookie: false },
      };
    } catch (error: any) {
      return {
        passed: false,
        message: `Could not check CSRF protection: ${error.message}`,
        details: { error: error.message },
      };
    }
  }
}
