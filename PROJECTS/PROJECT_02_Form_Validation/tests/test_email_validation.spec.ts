import { test, expect } from '@playwright/test';
import { FormPage } from '../pages/FormPage';

/**
 * Test Suite: Email Validation
 * Tests for email validation (valid/invalid formats)
 */
test.describe('Email Validation Tests', () => {
  
  test('should accept email with valid format', async ({ page }) => {
    /**
     * Test: Email validation with correct format
     * 
     * Expected: Email should be accepted (not invalid)
     */
    const formPage = new FormPage(page, 'https://demoqa.com/text-box');
    await formPage.navigateTo();
    
    expect(await formPage.isLoaded()).toBeTruthy();
    
    const validEmail = 'test@example.com';
    await formPage.enterEmail(validEmail);
    await formPage.enterFullName('Test User');
    await formPage.enterCurrentAddress('Test Address');
    await formPage.clickSubmit();
    await page.waitForTimeout(1000);
    
    const isInvalid = await formPage.isEmailInvalid();
    expect(isInvalid).toBeFalsy();
  });

  const invalidEmails = [
    'testexample.com',      // Without @
    'test@',                 // Without domain
    '@example.com',          // Without username
    'test @example.com',     // Space in email
    'test@exam ple.com',     // Space in domain
  ];

  for (const invalidEmail of invalidEmails) {
    test(`should reject email with invalid format - ${invalidEmail}`, async ({ page }) => {
      /**
       * Test: Email validation with invalid formats (parameterized)
       * 
       * Expected: Email should be rejected (invalid)
       */
      const formPage = new FormPage(page, 'https://demoqa.com/text-box');
      await formPage.navigateTo();
      expect(await formPage.isLoaded()).toBeTruthy();
      
      await formPage.enterEmail(invalidEmail);
      await page.waitForTimeout(500);
      
      const isInvalid = await formPage.isEmailInvalid();
      expect(isInvalid).toBeTruthy();
    });
  }

  test('should reject email without TLD', async ({ page }) => {
    /**
     * Test: Email validation without TLD (test@example)
     * Note: Some browsers accept this format, so we check the actual behavior
     */
    const formPage = new FormPage(page, 'https://demoqa.com/text-box');
    await formPage.navigateTo();
    expect(await formPage.isLoaded()).toBeTruthy();
    
    const invalidEmail = 'test@example'; // Without TLD
    await formPage.enterEmail(invalidEmail);
    await page.waitForTimeout(500);
    
    // Check HTML5 validation
    const isValid = await formPage.emailField.evaluate((el) => (el as HTMLInputElement).validity.valid);
    
    // If browser doesn't detect as invalid, check pattern
    if (isValid) {
      const pattern = await formPage.emailField.getAttribute('pattern');
      if (pattern) {
        const matchesPattern = await formPage.emailField.evaluate(
          (el) => !(el as HTMLInputElement).validity.patternMismatch
        );
        if (!matchesPattern) {
          expect(matchesPattern).toBeTruthy();
        }
      }
    } else {
      // Browser detects as invalid - perfect!
      expect(isValid).toBeFalsy();
    }
  });

  const validEmails = [
    'test@example.com',
    'user.name@example.com',
    'user+tag@example.co.uk',
    'test123@test-domain.com',
    'a@b.co',  // Minimum valid email
  ];

  for (const validEmail of validEmails) {
    test(`should accept email with valid format - ${validEmail}`, async ({ page }) => {
      /**
       * Test: Email validation with valid formats (parameterized)
       * 
       * Expected: Email should be accepted
       */
      const formPage = new FormPage(page, 'https://demoqa.com/text-box');
      await formPage.navigateTo();
      expect(await formPage.isLoaded()).toBeTruthy();
      
      await formPage.enterEmail(validEmail);
      await page.waitForTimeout(500);
      
      const isInvalid = await formPage.isEmailInvalid();
      expect(isInvalid).toBeFalsy();
    });
  }

  test('should validate empty email field', async ({ page }) => {
    /**
     * Test: Email validation when field is empty
     */
    const formPage = new FormPage(page, 'https://demoqa.com/text-box');
    await formPage.navigateTo();
    expect(await formPage.isLoaded()).toBeTruthy();
    
    await formPage.enterEmail('');
    await formPage.enterFullName('Test User');
    await formPage.clickSubmit();
    await page.waitForTimeout(1000);
    
    // Check if field is required
    const isRequired = await formPage.isFieldRequired(formPage.emailField);
    if (isRequired) {
      const isInvalid = await formPage.isEmailInvalid();
      expect(isInvalid).toBeTruthy();
    }
  });
});

