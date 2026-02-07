import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

/**
 * Test Suite: Cross-Browser Login Testing
 * Tests run automatically on Chromium, Firefox, and WebKit
 * Each test case executes on all configured browsers
 */

test.describe('Cross-Browser Login Tests', () => {
  
  test('should login with valid credentials', async ({ page }) => {
    /**
     * Test: Login with valid credentials on all browsers
     * Runs automatically on Chromium, Firefox, and WebKit
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

  test.describe('Login with various users', () => {
    const users = [
      { username: 'standard_user', password: 'secret_sauce' },
      { username: 'problem_user', password: 'secret_sauce' },
      { username: 'performance_glitch_user', password: 'secret_sauce' }
    ];

    for (const user of users) {
      test(`should login with user: ${user.username}`, async ({ page }) => {
        /**
         * Test: Login with different users on all browsers (parametrized)
         */
        const loginPage = new LoginPage(page);
        await loginPage.navigateTo();
        await loginPage.login(user.username, user.password);
        
        // Verify navigation to inventory page
        const currentUrl = loginPage.getCurrentUrl();
        expect(currentUrl).toContain('inventory');
      });
    }
  });

  test('should show error message with invalid credentials', async ({ page }) => {
    /**
     * Test: Login with invalid credentials on all browsers
     */
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo();
    await loginPage.login('invalid_user', 'invalid_password');
    
    // Verify error message is displayed
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).not.toBeNull();
    expect(errorMessage).toBeTruthy();
    
    // Verify error message contains keywords
    const errorMessageLower = errorMessage!.toLowerCase();
    expect(
      errorMessageLower.includes('error') ||
      errorMessageLower.includes('invalid') ||
      errorMessageLower.includes('incorrect') ||
      errorMessageLower.includes('do not match') ||
      errorMessageLower.includes('epic sadface') ||
      errorMessageLower.includes('username and password')
    ).toBeTruthy();
  });
});

