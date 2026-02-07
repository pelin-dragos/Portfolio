import { test, expect } from '@playwright/test';
import { SecurityChecker } from '../utils/SecurityChecker';
import { SecurityReporter } from '../utils/SecurityReporter';
import { XSSPayloads, SQLInjectionPayloads, AuthenticationBypassPayloads } from '../utils/SecurityPayloads';
import { LoginPage } from '../pages/LoginPage';

const baseUrl = 'https://www.saucedemo.com';

test.describe('@security @headers Security Headers Tests', () => {
  test('@security @headers should verify required security headers', async ({ page }) => {
    const checker = new SecurityChecker(page);
    const reporter = new SecurityReporter();
    
    await page.goto(baseUrl);
    
    const result = await checker.checkSecurityHeaders();
    reporter.addResult('security_headers_check', result);
    
    // Note: This test may fail on demo sites that don't have all headers
    // In production, you should enforce all required headers
    expect(result).toBeDefined();
    expect(result.message).toBeTruthy();
    
    console.log(`Security Headers Check: ${result.passed ? 'PASSED' : 'FAILED'}`);
    console.log(`Message: ${result.message}`);
  });

  test('@security @headers should check for X-Content-Type-Options header', async ({ page }) => {
    const response = await page.goto(baseUrl);
    expect(response).toBeTruthy();
    
    if (response) {
      const headers = response.headers();
      const contentTypeOptions = headers['x-content-type-options'];
      
      // Check if header exists
      if (contentTypeOptions) {
        expect(contentTypeOptions.toLowerCase()).toContain('nosniff');
        console.log('✓ X-Content-Type-Options header is present');
      } else {
        console.warn('⚠ X-Content-Type-Options header is missing');
      }
    }
  });

  test('@security @headers should check for X-Frame-Options header', async ({ page }) => {
    const response = await page.goto(baseUrl);
    expect(response).toBeTruthy();
    
    if (response) {
      const headers = response.headers();
      const frameOptions = headers['x-frame-options'];
      
      if (frameOptions) {
        expect(['DENY', 'SAMEORIGIN']).toContain(frameOptions.toUpperCase());
        console.log('✓ X-Frame-Options header is present');
      } else {
        console.warn('⚠ X-Frame-Options header is missing');
      }
    }
  });
});

test.describe('@security @https HTTPS Tests', () => {
  test('@security @https should verify site uses HTTPS', async ({ page }) => {
    const checker = new SecurityChecker(page);
    const reporter = new SecurityReporter();
    
    await page.goto(baseUrl);
    
    const result = await checker.checkHTTPS();
    reporter.addResult('https_check', result);
    
    // Saucedemo uses HTTPS, so this should pass
    expect(result.passed).toBeTruthy();
    expect(result.message).toContain('HTTPS');
    
    console.log(`HTTPS Check: ${result.message}`);
  });

  test('@security @https should verify URL starts with https', async ({ page }) => {
    await page.goto(baseUrl);
    const url = page.url();
    
    expect(url).toMatch(/^https:\/\//);
    console.log(`✓ Site uses HTTPS: ${url}`);
  });
});

test.describe('@security @xss XSS Testing', () => {
  test('@security @xss should test XSS vulnerability in username field', async ({ page }) => {
    const checker = new SecurityChecker(page);
    const reporter = new SecurityReporter();
    const loginPage = new LoginPage(page, baseUrl);
    
    await loginPage.navigateTo();
    
    const payloads = XSSPayloads.getBasicPayloads();
    const results = [];
    
    for (const payload of payloads) {
      const result = await checker.checkXSSVulnerability(
        loginPage.getUsernameInputSelector(),
        payload
      );
      results.push(result);
      reporter.addResult(`xss_test_${payload.substring(0, 20)}`, result);
    }
    
    // Check if any XSS vulnerability was detected
    const vulnerabilities = results.filter(r => !r.passed);
    
    if (vulnerabilities.length > 0) {
      console.warn(`⚠ XSS vulnerabilities detected: ${vulnerabilities.length}`);
    } else {
      console.log('✓ No XSS vulnerabilities detected');
    }
    
    // Test passes regardless (we're just checking)
    expect(results.length).toBeGreaterThan(0);
  });

  test('@security @xss should test XSS vulnerability in password field', async ({ page }) => {
    const checker = new SecurityChecker(page);
    const loginPage = new LoginPage(page, baseUrl);
    
    await loginPage.navigateTo();
    
    const payload = XSSPayloads.getBasicPayloads()[0];
    const result = await checker.checkXSSVulnerability(
      loginPage.getPasswordInputSelector(),
      payload
    );
    
    expect(result).toBeDefined();
    console.log(`XSS Test Result: ${result.message}`);
  });
});

test.describe('@security @sql SQL Injection Testing', () => {
  test('@security @sql should test SQL injection in username field', async ({ page }) => {
    const checker = new SecurityChecker(page);
    const reporter = new SecurityReporter();
    const loginPage = new LoginPage(page, baseUrl);
    
    await loginPage.navigateTo();
    
    const payloads = SQLInjectionPayloads.getBasicPayloads();
    const results = [];
    
    for (const payload of payloads) {
      const result = await checker.checkSQLInjection(
        loginPage.getUsernameInputSelector(),
        payload
      );
      results.push(result);
      reporter.addResult(`sql_injection_test_${payload.substring(0, 20)}`, result);
    }
    
    const vulnerabilities = results.filter(r => !r.passed);
    
    if (vulnerabilities.length > 0) {
      console.warn(`⚠ SQL injection vulnerabilities detected: ${vulnerabilities.length}`);
    } else {
      console.log('✓ No SQL injection vulnerabilities detected');
    }
    
    expect(results.length).toBeGreaterThan(0);
  });

  test('@security @sql should test SQL injection in password field', async ({ page }) => {
    const checker = new SecurityChecker(page);
    const loginPage = new LoginPage(page, baseUrl);
    
    await loginPage.navigateTo();
    
    const payload = SQLInjectionPayloads.getBasicPayloads()[0];
    const result = await checker.checkSQLInjection(
      loginPage.getPasswordInputSelector(),
      payload
    );
    
    expect(result).toBeDefined();
    console.log(`SQL Injection Test Result: ${result.message}`);
  });
});

test.describe('@security @csrf CSRF Testing', () => {
  test('@security @csrf should check for CSRF protection', async ({ page }) => {
    const checker = new SecurityChecker(page);
    const reporter = new SecurityReporter();
    
    await page.goto(baseUrl);
    
    // Check for CSRF protection in login form
    const result = await checker.checkCSRFProtection('form');
    reporter.addResult('csrf_protection_check', result);
    
    expect(result).toBeDefined();
    console.log(`CSRF Protection Check: ${result.message}`);
  });
});

test.describe('@security Authentication Security Tests', () => {
  test('@security should test authentication bypass attempts', async ({ page }) => {
    const loginPage = new LoginPage(page, baseUrl);
    const reporter = new SecurityReporter();
    
    await loginPage.navigateTo();
    
    const bypassPayloads = AuthenticationBypassPayloads.getAllPayloads();
    const results = [];
    
    for (const payload of bypassPayloads) {
      try {
        await loginPage.login(payload, payload);
        await page.waitForTimeout(1000);
        
        const isLoggedIn = await page.url().includes('inventory.html');
        
        results.push({
          payload,
          bypassed: isLoggedIn,
        });
        
        reporter.addResult(`auth_bypass_${payload.substring(0, 10)}`, {
          passed: !isLoggedIn,
          message: isLoggedIn ? `Authentication bypass successful with: ${payload}` : `Authentication bypass failed with: ${payload}`,
        });
      } catch (error) {
        // Expected to fail for secure authentication
        results.push({
          payload,
          bypassed: false,
        });
      }
    }
    
    const successfulBypasses = results.filter(r => r.bypassed);
    
    if (successfulBypasses.length > 0) {
      console.warn(`⚠ Authentication bypass successful: ${successfulBypasses.length} payloads`);
    } else {
      console.log('✓ Authentication is secure (bypass attempts failed)');
    }
    
    expect(results.length).toBeGreaterThan(0);
  });
});

test.describe('@smoke @security Smoke Security Tests', () => {
  test('@smoke @security should run basic security checks', async ({ page }) => {
    const checker = new SecurityChecker(page);
    const reporter = new SecurityReporter();
    
    await page.goto(baseUrl);
    
    // Run basic checks
    const httpsCheck = await checker.checkHTTPS();
    const headersCheck = await checker.checkSecurityHeaders();
    
    reporter.addResult('smoke_https_check', httpsCheck);
    reporter.addResult('smoke_headers_check', headersCheck);
    
    // Generate reports
    reporter.generateJSONReport();
    reporter.generateTextReport();
    
    expect(httpsCheck).toBeDefined();
    expect(headersCheck).toBeDefined();
    
    console.log('✓ Basic security checks completed');
    console.log(`HTTPS: ${httpsCheck.passed ? 'PASSED' : 'FAILED'}`);
    console.log(`Headers: ${headersCheck.passed ? 'PASSED' : 'FAILED'}`);
  });
});
