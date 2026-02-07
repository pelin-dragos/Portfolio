import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

/**
 * Test Suite: Screenshot on Failure Demonstration
 * Tests demonstrate automatic screenshot capture on test failures
 * 
 * Playwright automatically captures screenshots when tests fail
 * Screenshots are saved in test-results/ directory
 */

test.describe('Screenshot on Failure Tests', () => {
  
  test('should successfully login - no screenshot', async ({ page }) => {
    /**
     * Test: Successful login - should NOT generate screenshot
     * 
     * This test should pass and not generate any screenshot
     */
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo();
    
    const isLoaded = await loginPage.isLoaded();
    expect(isLoaded).toBeTruthy();
    
    await loginPage.login('standard_user', 'secret_sauce');
    
    // Verify navigation to inventory page
    const currentUrl = loginPage.getCurrentUrl();
    expect(currentUrl).toContain('inventory');
  });

  test('@failure_test should fail with invalid credentials - screenshot captured', async ({ page }) => {
    /**
     * Test: Login with invalid credentials - WILL FAIL AND CAPTURE SCREENSHOT
     * 
     * This test intentionally fails to demonstrate screenshot on failure functionality
     * Screenshot will be automatically saved in test-results/ directory
     */
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo();
    
    const isLoaded = await loginPage.isLoaded();
    expect(isLoaded).toBeTruthy();
    
    await loginPage.login('invalid_user', 'invalid_password');
    
    // This assertion will fail - screenshot will be captured automatically
    const currentUrl = loginPage.getCurrentUrl();
    expect(currentUrl).toContain('inventory').withContext(
      '❌ INTENTIONAL TEST FAILURE for screenshot demo. ' +
      'Screenshot should be automatically saved in test-results/'
    );
  });

  test('@failure_test should fail with assertion error - screenshot captured', async ({ page }) => {
    /**
     * Test: Assertion failure demonstration - WILL FAIL AND CAPTURE SCREENSHOT
     * 
     * This test intentionally fails to demonstrate screenshot on failure
     */
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo();
    
    // Intentional assertion failure
    const isLoaded = await loginPage.isLoaded();
    expect(isLoaded).toBeFalsy().withContext(
      '❌ INTENTIONAL TEST FAILURE for screenshot demo'
    );
  });

  test('@failure_test should fail with element not found - screenshot captured', async ({ page }) => {
    /**
     * Test: Element not found failure - WILL FAIL AND CAPTURE SCREENSHOT
     * 
     * This test intentionally fails when trying to find a non-existent element
     */
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo();
    
    // Try to find an element that doesn't exist
    try {
      const nonExistentElement = page.locator('#this-element-does-not-exist');
      await expect(nonExistentElement).toBeVisible({ timeout: 2000 });
      expect(false).toBeTruthy(); // This line should not be reached
    } catch (error) {
      // Fail the test intentionally
      expect(false).toBeTruthy().withContext(
        '❌ INTENTIONAL TEST FAILURE - Element not found. ' +
        'Screenshot should be automatically saved'
      );
    }
  });

  test('@failure_test should fail with timeout - screenshot captured', async ({ page }) => {
    /**
     * Test: Timeout failure - WILL FAIL AND CAPTURE SCREENSHOT
     * 
     * This test intentionally fails due to a timeout
     */
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo();
    
    // Wait for an element that will never appear (timeout)
    try {
      await page.waitForSelector('#element-that-will-never-appear', { timeout: 2000 });
      expect(false).toBeTruthy(); // This line should not be reached
    } catch (error) {
      // Fail the test intentionally
      expect(false).toBeTruthy().withContext(
        '❌ INTENTIONAL TEST FAILURE - Timeout. ' +
        'Screenshot should be automatically saved'
      );
    }
  });
});

