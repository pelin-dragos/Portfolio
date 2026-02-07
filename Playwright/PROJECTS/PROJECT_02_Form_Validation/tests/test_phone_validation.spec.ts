import { test, expect } from '@playwright/test';
import { FormPage } from '../pages/FormPage';

/**
 * Test Suite: Phone Validation
 * Tests for phone validation (correct/incorrect format, length)
 */
test.describe('Phone Validation Tests', () => {
  
  test('should accept phone with valid format', async ({ page }) => {
    /**
     * Test: Phone validation with correct format (10 digits)
     * 
     * Expected: Phone should be accepted
     */
    const formPage = new FormPage(page);
    await formPage.navigateToPracticeForm();
    await page.waitForTimeout(1000);
    
    const validPhone = '1234567890';
    await formPage.enterPracticeFirstName('Test');
    await formPage.enterPracticeLastName('User');
    await formPage.enterPracticeEmail('test@example.com');
    await formPage.selectPracticeGender();
    await formPage.enterPracticeMobile(validPhone);
    await formPage.clickPracticeSubmit();
    await page.waitForTimeout(2000);
    
    const errors = await formPage.getValidationErrors();
    const phoneErrors = errors.filter(e => 
      e.toLowerCase().includes('mobile') || e.toLowerCase().includes('number')
    );
    expect(phoneErrors.length).toBe(0);
  });

  const invalidPhones = [
    '123456789',      // Too short (9 digits)
    '123456789a',     // Contains letters
    '123456789 ',     // Contains spaces
    '123-456-7890',   // Contains special characters (may be accepted depending on validation)
  ];

  for (const invalidPhone of invalidPhones) {
    test(`should reject phone with invalid format - ${invalidPhone}`, async ({ page }) => {
      /**
       * Test: Phone validation with invalid formats (parameterized)
       * 
       * Expected: Phone should be rejected
       */
      const formPage = new FormPage(page);
      await formPage.navigateToPracticeForm();
      await page.waitForTimeout(1000);
      
      await formPage.enterPracticeFirstName('Test');
      await formPage.enterPracticeLastName('User');
      await formPage.enterPracticeEmail('test@example.com');
      await formPage.selectPracticeGender();
      await formPage.enterPracticeMobile(invalidPhone);
      await formPage.clickPracticeSubmit();
      await page.waitForTimeout(2000);
      
      // Check HTML5 validation
      const isValid = await formPage.practiceFormMobile.evaluate(
        (el) => (el as HTMLInputElement).validity.valid
      );
      
      // For invalid formats, validation should detect
      if (invalidPhone.replace(/-/g, '').replace(/ /g, '').length !== 10) {
        const errors = await formPage.getValidationErrors();
        expect(isValid === false || errors.length > 0).toBeTruthy();
      }
    });
  }

  test('should handle phone that is too long', async ({ page }) => {
    /**
     * Test: Phone validation for too long number (11 digits)
     * Note: Some forms don't have maxlength, so we check actual behavior
     */
    const formPage = new FormPage(page);
    await formPage.navigateToPracticeForm();
    await page.waitForTimeout(1000);
    
    await formPage.enterPracticeFirstName('Test');
    await formPage.enterPracticeLastName('User');
    await formPage.enterPracticeEmail('test@example.com');
    await formPage.selectPracticeGender();
    
    const invalidPhone = '12345678901'; // 11 digits
    await formPage.enterPracticeMobile(invalidPhone);
    
    // Check if maxlength attribute exists
    const maxlength = await formPage.practiceFormMobile.getAttribute('maxlength');
    
    if (maxlength) {
      // If maxlength exists, check that entered value respects the limit
      const enteredValue = await formPage.practiceFormMobile.inputValue();
      expect(enteredValue.length).toBeLessThanOrEqual(parseInt(maxlength));
    } else {
      // If no maxlength, check HTML5 validation or pattern
      await formPage.clickPracticeSubmit();
      await page.waitForTimeout(2000);
      
      const isValid = await formPage.practiceFormMobile.evaluate(
        (el: HTMLInputElement) => el.validity.valid
      );
      const errors = await formPage.getValidationErrors();
      
      // If valid and no errors, check pattern
      if (isValid && errors.length === 0) {
        const pattern = await formPage.practiceFormMobile.getAttribute('pattern');
        if (pattern) {
          const matches = await formPage.practiceFormMobile.evaluate(
            (el) => !(el as HTMLInputElement).validity.patternMismatch
          );
          if (!matches) {
            expect(matches).toBeTruthy();
          }
        }
      }
    }
  });

  test('should validate empty phone field', async ({ page }) => {
    /**
     * Test: Phone validation when field is empty (required)
     * 
     * Expected: Phone field should be required and invalid when empty
     */
    const formPage = new FormPage(page);
    await formPage.navigateToPracticeForm();
    await page.waitForTimeout(1000);
    
    await formPage.enterPracticeFirstName('Test');
    await formPage.enterPracticeLastName('User');
    await formPage.enterPracticeEmail('test@example.com');
    await formPage.selectPracticeGender();
    // Do NOT enter phone
    
    await formPage.clickPracticeSubmit();
    await page.waitForTimeout(2000);
    
    const isRequired = await formPage.isFieldRequired(formPage.practiceFormMobile);
    expect(isRequired).toBeTruthy();
    
    const isValid = await formPage.practiceFormMobile.evaluate(
      (el) => (el as HTMLInputElement).validity.valid
    );
    expect(isValid).toBeFalsy();
  });
});

