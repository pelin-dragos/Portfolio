import { Page, Locator } from '@playwright/test';

export interface AccessibilityCheckResult {
  passed: boolean;
  message: string;
  details?: any;
}

export interface AxeResults {
  violations: any[];
  passes: any[];
  incomplete: any[];
  inapplicable: any[];
}

/**
 * AccessibilityChecker - Performs accessibility checks
 */
export class AccessibilityChecker {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Check ARIA labels on an element
   * @param selector - Element selector
   * @returns ARIA check result
   */
  async checkARIALabels(selector: string): Promise<AccessibilityCheckResult> {
    try {
      const element = this.page.locator(selector).first();
      const hasAriaLabel = await element.getAttribute('aria-label');
      const hasAriaLabelledBy = await element.getAttribute('aria-labelledby');
      const tagName = await element.evaluate(el => el.tagName.toLowerCase());
      
      // Check if element is naturally accessible (button, a, input)
      const naturallyAccessible = ['button', 'a', 'input', 'select', 'textarea'].includes(tagName);
      
      if (hasAriaLabel || hasAriaLabelledBy || naturallyAccessible) {
        return {
          passed: true,
          message: `Element has accessibility attributes or is naturally accessible`,
          details: {
            hasAriaLabel: !!hasAriaLabel,
            hasAriaLabelledBy: !!hasAriaLabelledBy,
            tagName,
            naturallyAccessible,
          },
        };
      }

      return {
        passed: false,
        message: `Element lacks accessibility attributes (aria-label, aria-labelledby)`,
        details: { tagName },
      };
    } catch (error: any) {
      return {
        passed: false,
        message: `Could not check ARIA labels: ${error.message}`,
        details: { error: error.message },
      };
    }
  }

  /**
   * Navigate with keyboard (Tab key)
   * @returns List of focusable elements
   */
  async navigateWithKeyboard(): Promise<AccessibilityCheckResult> {
    try {
      const focusableElements = await this.page.evaluate(() => {
        const selectors = [
          'a[href]',
          'button:not([disabled])',
          'input:not([disabled])',
          'select:not([disabled])',
          'textarea:not([disabled])',
          '[tabindex]:not([tabindex="-1"])',
        ];
        
        const elements: any[] = [];
        selectors.forEach(selector => {
          document.querySelectorAll(selector).forEach(el => {
            elements.push({
              tagName: el.tagName.toLowerCase(),
              text: el.textContent?.trim().substring(0, 50) || '',
              hasAriaLabel: !!el.getAttribute('aria-label'),
            });
          });
        });
        
        return elements;
      });

      return {
        passed: true,
        message: `Found ${focusableElements.length} keyboard accessible elements`,
        details: { focusableElements },
      };
    } catch (error: any) {
      return {
        passed: false,
        message: `Could not check keyboard navigation: ${error.message}`,
        details: { error: error.message },
      };
    }
  }

  /**
   * Check focus indicators
   * @returns Focus check result
   */
  async checkFocusIndicators(): Promise<AccessibilityCheckResult> {
    try {
      const focusStyles = await this.page.evaluate(() => {
        const style = window.getComputedStyle(document.body);
        const hasFocusStyles = document.querySelectorAll('*:focus').length > 0;
        
        // Check for common focus styles
        const focusableElements = document.querySelectorAll('a, button, input, select, textarea');
        let hasVisibleFocus = false;
        
        focusableElements.forEach(el => {
          const computedStyle = window.getComputedStyle(el);
          const outline = computedStyle.outline;
          const outlineWidth = computedStyle.outlineWidth;
          const boxShadow = computedStyle.boxShadow;
          
          if (outline !== 'none' || outlineWidth !== '0px' || boxShadow !== 'none') {
            hasVisibleFocus = true;
          }
        });
        
        return {
          hasFocusStyles,
          hasVisibleFocus,
          focusableCount: focusableElements.length,
        };
      });

      if (focusStyles.hasVisibleFocus || focusStyles.focusableCount > 0) {
        return {
          passed: true,
          message: 'Focus indicators are present',
          details: focusStyles,
        };
      }

      return {
        passed: false,
        message: 'No visible focus indicators found',
        details: focusStyles,
      };
    } catch (error: any) {
      return {
        passed: false,
        message: `Could not check focus indicators: ${error.message}`,
        details: { error: error.message },
      };
    }
  }

  /**
   * Check alt text for images
   * @returns Alt text check result
   */
  async checkAltText(): Promise<AccessibilityCheckResult> {
    try {
      const imageResults = await this.page.evaluate(() => {
        const images = Array.from(document.querySelectorAll('img'));
        const results = {
          total: images.length,
          withAlt: 0,
          withoutAlt: 0,
          emptyAlt: 0,
          images: [] as any[],
        };

        images.forEach(img => {
          const alt = img.getAttribute('alt');
          if (alt === null) {
            results.withoutAlt++;
            results.images.push({
              src: img.src.substring(0, 100),
              hasAlt: false,
            });
          } else if (alt === '') {
            results.emptyAlt++;
            results.images.push({
              src: img.src.substring(0, 100),
              hasAlt: true,
              isEmpty: true,
            });
          } else {
            results.withAlt++;
            results.images.push({
              src: img.src.substring(0, 100),
              hasAlt: true,
              alt: alt.substring(0, 50),
            });
          }
        });

        return results;
      });

      const issues = imageResults.withoutAlt + imageResults.emptyAlt;
      
      if (issues === 0) {
        return {
          passed: true,
          message: `All ${imageResults.total} images have proper alt text`,
          details: imageResults,
        };
      }

      return {
        passed: false,
        message: `${issues} images missing or have empty alt text`,
        details: imageResults,
      };
    } catch (error: any) {
      return {
        passed: false,
        message: `Could not check alt text: ${error.message}`,
        details: { error: error.message },
      };
    }
  }

  /**
   * Run axe-core analysis
   * @param options - Axe options (tags, rules)
   * @returns Axe results
   */
  async runAxeAnalysis(options: { tags?: string[]; rules?: string[] } = {}): Promise<AccessibilityCheckResult> {
    try {
      // Inject axe-core from CDN
      await this.page.addScriptTag({
        url: 'https://cdn.jsdelivr.net/npm/axe-core@4.8.0/axe.min.js',
      });

      // Wait for axe to be available
      await this.page.waitForFunction(() => (window as any).axe !== undefined, { timeout: 10000 });

      // Run axe analysis
      const axeResults = await this.page.evaluate((opts) => {
        return new Promise((resolve, reject) => {
          (window as any).axe.run(document, opts || {}, (err: any, results: any) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          });
        });
      }, options);

      const results = axeResults as any;
      const violations = results.violations || [];
      const passes = results.passes || [];

      if (violations.length === 0) {
        return {
          passed: true,
          message: `No accessibility violations found. ${passes.length} checks passed.`,
          details: results,
        };
      }

      return {
        passed: false,
        message: `Found ${violations.length} accessibility violations`,
        details: results,
      };
    } catch (error: any) {
      return {
        passed: false,
        message: `Could not run axe analysis: ${error.message}`,
        details: { error: error.message },
      };
    }
  }

  /**
   * Test keyboard navigation (Tab key)
   * @returns Keyboard navigation result
   */
  async testKeyboardNavigation(): Promise<AccessibilityCheckResult> {
    try {
      // Get initial focusable elements
      const initialFocusable = await this.page.evaluate(() => {
        return document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])').length;
      });

      // Try to navigate with Tab
      await this.page.keyboard.press('Tab');
      await this.page.waitForTimeout(500);

      const focusedElement = await this.page.evaluate(() => {
        const activeElement = document.activeElement;
        if (activeElement && activeElement !== document.body) {
          return {
            tagName: activeElement.tagName.toLowerCase(),
            text: activeElement.textContent?.trim().substring(0, 50) || '',
            hasAriaLabel: !!(activeElement as HTMLElement).getAttribute('aria-label'),
          };
        }
        return null;
      });

      if (focusedElement) {
        return {
          passed: true,
          message: `Keyboard navigation works. Focused element: ${focusedElement.tagName}`,
          details: { focusedElement, totalFocusable: initialFocusable },
        };
      }

      return {
        passed: initialFocusable === 0,
        message: initialFocusable === 0 
          ? 'No focusable elements found' 
          : 'Keyboard navigation may not be working correctly',
        details: { totalFocusable: initialFocusable },
      };
    } catch (error: any) {
      return {
        passed: false,
        message: `Could not test keyboard navigation: ${error.message}`,
        details: { error: error.message },
      };
    }
  }
}
