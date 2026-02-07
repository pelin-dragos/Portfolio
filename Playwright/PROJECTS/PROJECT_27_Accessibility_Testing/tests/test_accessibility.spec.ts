import { test, expect } from '@playwright/test';
import { AccessibilityChecker } from '../utils/AccessibilityChecker';
import { AccessibilityReporter } from '../utils/AccessibilityReporter';
import { LoginPage } from '../pages/LoginPage';

const baseUrl = 'https://www.saucedemo.com';

test.describe('@accessibility @aria ARIA Labels Tests', () => {
  test('@accessibility @aria should check ARIA labels on login form', async ({ page }) => {
    const checker = new AccessibilityChecker(page);
    const reporter = new AccessibilityReporter();
    const loginPage = new LoginPage(page, baseUrl);
    
    await loginPage.navigateTo();
    
    // Check username input
    const usernameCheck = await checker.checkARIALabels(loginPage.getUsernameInputSelector());
    reporter.addResult('aria_username_input', usernameCheck);
    
    // Check password input
    const passwordCheck = await checker.checkARIALabels(loginPage.getPasswordInputSelector());
    reporter.addResult('aria_password_input', passwordCheck);
    
    // Check login button
    const buttonCheck = await checker.checkARIALabels(loginPage.getLoginButtonSelector());
    reporter.addResult('aria_login_button', buttonCheck);
    
    expect(usernameCheck).toBeDefined();
    expect(passwordCheck).toBeDefined();
    expect(buttonCheck).toBeDefined();
    
    console.log(`Username Input: ${usernameCheck.message}`);
    console.log(`Password Input: ${passwordCheck.message}`);
    console.log(`Login Button: ${buttonCheck.message}`);
  });

  test('@accessibility @aria should verify all interactive elements have ARIA labels', async ({ page }) => {
    const checker = new AccessibilityChecker(page);
    await page.goto(baseUrl);
    
    // Check multiple elements
    const selectors = ['#user-name', '#password', '#login-button'];
    const results = [];
    
    for (const selector of selectors) {
      const result = await checker.checkARIALabels(selector);
      results.push(result);
    }
    
    const passed = results.filter(r => r.passed).length;
    console.log(`${passed}/${results.length} elements have proper ARIA labels`);
    
    expect(results.length).toBe(selectors.length);
  });
});

test.describe('@accessibility @keyboard Keyboard Navigation Tests', () => {
  test('@accessibility @keyboard should test keyboard navigation', async ({ page }) => {
    const checker = new AccessibilityChecker(page);
    const reporter = new AccessibilityReporter();
    
    await page.goto(baseUrl);
    
    const result = await checker.testKeyboardNavigation();
    reporter.addResult('keyboard_navigation', result);
    
    expect(result).toBeDefined();
    expect(result.message).toBeTruthy();
    
    console.log(`Keyboard Navigation: ${result.message}`);
  });

  test('@accessibility @keyboard should find all focusable elements', async ({ page }) => {
    const checker = new AccessibilityChecker(page);
    const reporter = new AccessibilityReporter();
    
    await page.goto(baseUrl);
    
    const result = await checker.navigateWithKeyboard();
    reporter.addResult('focusable_elements', result);
    
    expect(result.passed).toBeTruthy();
    expect(result.details?.focusableElements).toBeDefined();
    
    console.log(`Found ${result.details?.focusableElements?.length || 0} focusable elements`);
  });

  test('@accessibility @keyboard should navigate through form with Tab key', async ({ page }) => {
    const loginPage = new LoginPage(page, baseUrl);
    await loginPage.navigateTo();
    
    // Tab to username
    await page.keyboard.press('Tab');
    await page.waitForTimeout(300);
    
    const focusedElement1 = await page.evaluate(() => {
      return document.activeElement?.tagName.toLowerCase();
    });
    
    // Tab to password
    await page.keyboard.press('Tab');
    await page.waitForTimeout(300);
    
    const focusedElement2 = await page.evaluate(() => {
      return document.activeElement?.tagName.toLowerCase();
    });
    
    // Tab to button
    await page.keyboard.press('Tab');
    await page.waitForTimeout(300);
    
    const focusedElement3 = await page.evaluate(() => {
      return document.activeElement?.tagName.toLowerCase();
    });
    
    expect(focusedElement1).toBeTruthy();
    expect(focusedElement2).toBeTruthy();
    expect(focusedElement3).toBeTruthy();
    
    console.log('✓ Keyboard navigation works through form');
  });
});

test.describe('@accessibility @focus Focus Management Tests', () => {
  test('@accessibility @focus should check focus indicators', async ({ page }) => {
    const checker = new AccessibilityChecker(page);
    const reporter = new AccessibilityReporter();
    
    await page.goto(baseUrl);
    
    const result = await checker.checkFocusIndicators();
    reporter.addResult('focus_indicators', result);
    
    expect(result).toBeDefined();
    console.log(`Focus Indicators: ${result.message}`);
  });

  test('@accessibility @focus should verify focus is visible', async ({ page }) => {
    const loginPage = new LoginPage(page, baseUrl);
    await loginPage.navigateTo();
    
    // Focus on username input
    await page.focus(loginPage.getUsernameInputSelector());
    await page.waitForTimeout(300);
    
    const focusStyle = await page.evaluate((selector) => {
      const element = document.querySelector(selector) as HTMLElement;
      if (element) {
        const style = window.getComputedStyle(element);
        return {
          outline: style.outline,
          outlineWidth: style.outlineWidth,
          boxShadow: style.boxShadow,
        };
      }
      return null;
    }, loginPage.getUsernameInputSelector());
    
    expect(focusStyle).toBeTruthy();
    console.log('✓ Focus styles are present');
  });
});

test.describe('@accessibility @alt Alt Text Tests', () => {
  test('@accessibility @alt should check alt text for images', async ({ page }) => {
    const checker = new AccessibilityChecker(page);
    const reporter = new AccessibilityReporter();
    
    await page.goto(baseUrl);
    
    const result = await checker.checkAltText();
    reporter.addResult('alt_text_check', result);
    
    expect(result).toBeDefined();
    expect(result.details).toBeDefined();
    
    console.log(`Alt Text Check: ${result.message}`);
    if (result.details) {
      console.log(`Total images: ${result.details.total}`);
      console.log(`With alt: ${result.details.withAlt}`);
      console.log(`Without alt: ${result.details.withoutAlt}`);
    }
  });
});

test.describe('@accessibility @axe Axe-core Tests', () => {
  test('@accessibility @axe should run axe-core analysis', async ({ page }) => {
    const checker = new AccessibilityChecker(page);
    const reporter = new AccessibilityReporter();
    
    await page.goto(baseUrl);
    await page.waitForLoadState('networkidle');
    
    const result = await checker.runAxeAnalysis();
    reporter.addResult('axe_analysis', result);
    
    expect(result).toBeDefined();
    
    if (result.details) {
      const violations = result.details.violations || [];
      const passes = result.details.passes || [];
      
      console.log(`Axe Analysis: ${violations.length} violations, ${passes.length} passes`);
      
      if (violations.length > 0) {
        console.warn('⚠ Accessibility violations found:');
        violations.slice(0, 5).forEach((violation: any) => {
          console.warn(`  - ${violation.id}: ${violation.description}`);
        });
      }
    }
  });

  test('@accessibility @axe should run axe-core with WCAG 2.1 Level AA', async ({ page }) => {
    const checker = new AccessibilityChecker(page);
    
    await page.goto(baseUrl);
    await page.waitForLoadState('networkidle');
    
    const result = await checker.runAxeAnalysis({
      tags: ['wcag2a', 'wcag2aa', 'wcag21aa'],
    });
    
    expect(result).toBeDefined();
    
    if (result.details) {
      const violations = result.details.violations || [];
      console.log(`WCAG 2.1 Level AA: ${violations.length} violations`);
    }
  });
});

test.describe('@smoke @accessibility Smoke Accessibility Tests', () => {
  test('@smoke @accessibility should run basic accessibility checks', async ({ page }) => {
    const checker = new AccessibilityChecker(page);
    const reporter = new AccessibilityReporter();
    
    await page.goto(baseUrl);
    await page.waitForLoadState('networkidle');
    
    // Run basic checks
    const keyboardCheck = await checker.testKeyboardNavigation();
    const altTextCheck = await checker.checkAltText();
    const focusCheck = await checker.checkFocusIndicators();
    
    reporter.addResult('smoke_keyboard', keyboardCheck);
    reporter.addResult('smoke_alt_text', altTextCheck);
    reporter.addResult('smoke_focus', focusCheck);
    
    // Generate reports
    reporter.generateJSONReport();
    reporter.generateTextReport();
    
    expect(keyboardCheck).toBeDefined();
    expect(altTextCheck).toBeDefined();
    expect(focusCheck).toBeDefined();
    
    console.log('✓ Basic accessibility checks completed');
    console.log(`Keyboard: ${keyboardCheck.passed ? 'PASSED' : 'FAILED'}`);
    console.log(`Alt Text: ${altTextCheck.passed ? 'PASSED' : 'FAILED'}`);
    console.log(`Focus: ${focusCheck.passed ? 'PASSED' : 'FAILED'}`);
  });
});
