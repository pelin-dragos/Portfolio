import { test, expect } from '@playwright/test';

/**
 * Test Suite: Password Validation
 * Tests for password validation (minimum length, special characters)
 */
test.describe('Password Validation Tests', () => {
  
  test('should accept password with valid format', async ({ page }) => {
    /**
     * Test: Password validation - valid format
     * 
     * Expected: Login should succeed with valid password
     */
    await page.goto('https://the-internet.herokuapp.com/login');
    await page.waitForTimeout(1000);
    
    const usernameField = page.locator('#username');
    const passwordField = page.locator('#password');
    
    const validPassword = 'SuperSecretPassword!';
    await usernameField.fill('tomsmith');
    await passwordField.fill(validPassword);
    
    const loginButton = page.locator('button[type="submit"]');
    await loginButton.click();
    await page.waitForTimeout(2000);
    
    // Check if login succeeded
    const currentUrl = page.url();
    const errorMessage = page.locator('#flash');
    
    if (await errorMessage.isVisible()) {
      const errorText = (await errorMessage.textContent())?.toLowerCase() || '';
      expect(
        !errorText.includes('invalid') && !errorText.includes('incorrect')
      ).toBeTruthy();
    }
  });

  test('should reject password with minimum length violation', async ({ page }) => {
    /**
     * Test: Password validation - minimum length
     * 
     * Expected: Login should fail with short password
     */
    await page.goto('https://the-internet.herokuapp.com/login');
    await page.waitForTimeout(1000);
    
    const usernameField = page.locator('#username');
    const passwordField = page.locator('#password');
    
    const shortPassword = '123'; // Too short
    await usernameField.fill('tomsmith');
    await passwordField.fill(shortPassword);
    
    const loginButton = page.locator('button[type="submit"]');
    await loginButton.click();
    await page.waitForTimeout(1000);
    
    const errorMessage = page.locator('#flash');
    const errorText = (await errorMessage.textContent())?.toLowerCase() || '';
    
    expect(
      errorText.includes('invalid') || 
      errorText.includes('incorrect') || 
      errorText.includes('wrong')
    ).toBeTruthy();
  });

  test('should validate empty password field', async ({ page }) => {
    /**
     * Test: Password validation - empty field
     * Note: On the tested site, the field may not be marked as required in HTML,
     * but the form validates on submit and shows error message
     * 
     * Expected: Error message should appear when password is empty
     */
    await page.goto('https://the-internet.herokuapp.com/login');
    await page.waitForTimeout(1000);
    
    const usernameField = page.locator('#username');
    const passwordField = page.locator('#password');
    
    await usernameField.fill('tomsmith');
    // Do NOT enter password
    
    const loginButton = page.locator('button[type="submit"]');
    await loginButton.click();
    await page.waitForTimeout(2000); // Wait more for processing
    
    // Check that error message exists (form validates on submit)
    const errorElements = page.locator('#flash');
    await expect(errorElements).toBeVisible();
    
    const errorText = (await errorElements.textContent())?.toLowerCase() || '';
    // Check if error message indicates password problem
    expect(
      errorText.includes('invalid') || 
      errorText.includes('incorrect') || 
      errorText.includes('wrong') || 
      errorText.includes('password')
    ).toBeTruthy();
    
    // Check HTML5 validation (even if not required, may be validated)
    const isRequired = await passwordField.getAttribute('required');
    
    // If field is marked as required, check HTML5 validation
    if (isRequired !== null && isRequired !== '') {
        const isValid = await passwordField.evaluate(
          (el) => (el as HTMLInputElement).validity.valid
        );
      // If required and empty, should be invalid
      expect(isValid).toBeFalsy();
    }
  });

  const passwords = [
    'SuperSecretPassword!@#$%',  // Special characters
    '12345678',                   // Only numbers
    'Password123',                // Letters and numbers
    'PASSWORD123!',              // Uppercase and special characters
  ];

  for (const password of passwords) {
    test(`should handle password with different format - ${password}`, async ({ page }) => {
      /**
       * Test: Password validation with different formats (parameterized)
       * 
       * Expected: Behavior may vary depending on format
       */
      await page.goto('https://the-internet.herokuapp.com/login');
      await page.waitForTimeout(1000);
      
      const usernameField = page.locator('#username');
      const passwordField = page.locator('#password');
      
      await usernameField.fill('tomsmith');
      await passwordField.fill(password);
      
      const loginButton = page.locator('button[type="submit"]');
      await loginButton.click();
      await page.waitForTimeout(1000);
      
      // Check behavior (may be accepted or rejected depending on format)
      const errorMessage = page.locator('#flash');
      
      if (await errorMessage.isVisible()) {
        const errorText = (await errorMessage.textContent())?.toLowerCase() || '';
        console.log(`Message for password '${password}': ${errorText}`);
      }
    });
  }
});

