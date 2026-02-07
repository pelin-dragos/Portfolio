import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Pattern - Form Page
 * Represents form pages for validation (DemoQA, The Internet, etc.)
 */
export class FormPage {
  readonly page: Page;
  
  // Locators for DemoQA Text Box
  readonly fullNameField: Locator;
  readonly emailField: Locator;
  readonly currentAddressField: Locator;
  readonly permanentAddressField: Locator;
  readonly submitButton: Locator;
  
  // Locators for output section
  readonly outputSection: Locator;
  readonly outputName: Locator;
  readonly outputEmail: Locator;
  readonly outputCurrentAddress: Locator;
  readonly outputPermanentAddress: Locator;
  
  // Locators for DemoQA Practice Form (phone, required fields)
  readonly practiceFormFirstName: Locator;
  readonly practiceFormLastName: Locator;
  readonly practiceFormEmail: Locator;
  readonly practiceFormGender: Locator;
  readonly practiceFormMobile: Locator;
  readonly practiceFormSubmit: Locator;
  readonly practiceFormValidationError: Locator;
  
  // Locators for The Internet Form Authentication
  readonly internetUsername: Locator;
  readonly internetPassword: Locator;
  readonly internetLoginButton: Locator;
  readonly internetErrorMessage: Locator;
  
  private baseUrl: string;

  constructor(page: Page, baseUrl: string = 'https://demoqa.com/text-box') {
    this.page = page;
    this.baseUrl = baseUrl;

    // DemoQA Text Box locators
    this.fullNameField = page.locator('#userName');
    this.emailField = page.locator('#userEmail');
    this.currentAddressField = page.locator('#currentAddress');
    this.permanentAddressField = page.locator('#permanentAddress');
    this.submitButton = page.locator('#submit');
    
    // Output section locators
    this.outputSection = page.locator('#output');
    this.outputName = page.locator('#name');
    this.outputEmail = page.locator('#email');
    this.outputCurrentAddress = page.locator('#currentAddress');
    this.outputPermanentAddress = page.locator('#permanentAddress');
    
    // Practice Form locators
    this.practiceFormFirstName = page.locator('#firstName');
    this.practiceFormLastName = page.locator('#lastName');
    this.practiceFormEmail = page.locator('#userEmail');
    this.practiceFormGender = page.locator('#gender-radio-1');
    this.practiceFormMobile = page.locator('#userNumber');
    this.practiceFormSubmit = page.locator('#submit');
    this.practiceFormValidationError = page.locator('.invalid-feedback');
    
    // The Internet locators
    this.internetUsername = page.locator('#username');
    this.internetPassword = page.locator('#password');
    this.internetLoginButton = page.locator('button[type="submit"]');
    this.internetErrorMessage = page.locator('#flash');
  }

  /**
   * Navigate to the form page
   */
  async navigateTo(): Promise<void> {
    await this.page.goto(this.baseUrl);
    await expect(this.submitButton).toBeVisible();
  }

  /**
   * Enter full name
   */
  async enterFullName(fullName: string): Promise<void> {
    await this.fullNameField.clear();
    await this.fullNameField.fill(fullName);
  }

  /**
   * Enter email address
   */
  async enterEmail(email: string): Promise<void> {
    await this.emailField.clear();
    await this.emailField.fill(email);
  }

  /**
   * Enter current address
   */
  async enterCurrentAddress(address: string): Promise<void> {
    await this.currentAddressField.clear();
    await this.currentAddressField.fill(address);
  }

  /**
   * Enter permanent address
   */
  async enterPermanentAddress(address: string): Promise<void> {
    await this.permanentAddressField.clear();
    await this.permanentAddressField.fill(address);
  }

  /**
   * Click submit button
   */
  async clickSubmit(): Promise<void> {
    await this.submitButton.scrollIntoViewIfNeeded();
    await this.submitButton.click();
    await this.page.waitForTimeout(1000); // Wait for form processing
  }

  /**
   * Submit complete form
   */
  async submitForm(
    fullName?: string,
    email?: string,
    currentAddress?: string,
    permanentAddress?: string
  ): Promise<void> {
    if (fullName) await this.enterFullName(fullName);
    if (email) await this.enterEmail(email);
    if (currentAddress) await this.enterCurrentAddress(currentAddress);
    if (permanentAddress) await this.enterPermanentAddress(permanentAddress);
    await this.clickSubmit();
  }

  /**
   * Check if email is invalid (HTML5 validation)
   */
  async isEmailInvalid(): Promise<boolean> {
    const isValid = await this.emailField.evaluate((el) => (el as HTMLInputElement).validity.valid);
    return !isValid;
  }

  /**
   * Get output text after submit
   */
  async getOutputText(): Promise<Record<string, string | null>> {
    try {
      await expect(this.outputSection).toBeVisible({ timeout: 5000 });
      
      const outputData: Record<string, string | null> = {
        name: null,
        email: null,
        currentAddress: null,
        permanentAddress: null
      };
      
      try {
        outputData.name = await this.outputName.textContent();
      } catch {}
      
      try {
        outputData.email = await this.outputEmail.textContent();
      } catch {}
      
      try {
        outputData.currentAddress = await this.outputCurrentAddress.textContent();
      } catch {}
      
      try {
        outputData.permanentAddress = await this.outputPermanentAddress.textContent();
      } catch {}
      
      return outputData;
    } catch {
      return {};
    }
  }

  /**
   * Check if output section is displayed
   */
  async isOutputDisplayed(): Promise<boolean> {
    try {
      await expect(this.outputSection).toBeVisible({ timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  // Methods for Practice Form (phone, required fields)
  /**
   * Navigate to Practice Form
   */
  async navigateToPracticeForm(): Promise<void> {
    await this.page.goto('https://demoqa.com/automation-practice-form');
    await this.page.waitForTimeout(1000);
  }

  /**
   * Enter first name in Practice Form
   */
  async enterPracticeFirstName(firstName: string): Promise<void> {
    await this.practiceFormFirstName.clear();
    await this.practiceFormFirstName.fill(firstName);
  }

  /**
   * Enter last name in Practice Form
   */
  async enterPracticeLastName(lastName: string): Promise<void> {
    await this.practiceFormLastName.clear();
    await this.practiceFormLastName.fill(lastName);
  }

  /**
   * Enter email in Practice Form
   */
  async enterPracticeEmail(email: string): Promise<void> {
    await this.practiceFormEmail.clear();
    await this.practiceFormEmail.fill(email);
  }

  /**
   * Enter mobile number in Practice Form
   */
  async enterPracticeMobile(mobile: string): Promise<void> {
    await this.practiceFormMobile.clear();
    await this.practiceFormMobile.fill(mobile);
  }

  /**
   * Select gender in Practice Form
   */
  async selectPracticeGender(): Promise<void> {
    // Use JavaScript click to avoid iframe interception issues
    await this.practiceFormGender.evaluate((el) => (el as HTMLInputElement).click());
    // Wait a bit to ensure selection is registered
    await this.page.waitForTimeout(500);
  }

  /**
   * Click submit button in Practice Form
   */
  async clickPracticeSubmit(): Promise<void> {
    await this.practiceFormSubmit.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(500);
    await this.practiceFormSubmit.click();
    await this.page.waitForTimeout(1000);
  }

  /**
   * Get all validation error messages
   */
  async getValidationErrors(): Promise<string[]> {
    try {
      const errors = await this.practiceFormValidationError.all();
      const errorTexts: string[] = [];
      for (const error of errors) {
        const text = await error.textContent();
        if (text && text.trim()) {
          errorTexts.push(text.trim());
        }
      }
      return errorTexts;
    } catch {
      return [];
    }
  }

  /**
   * Check if a field is marked as required
   */
  async isFieldRequired(field: Locator): Promise<boolean> {
    try {
      const required = await field.getAttribute('required');
      return required !== null;
    } catch {
      return false;
    }
  }

  /**
   * Check if page is loaded correctly
   */
  async isLoaded(): Promise<boolean> {
    try {
      await expect(this.submitButton).toBeVisible({ timeout: 10000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get page title
   */
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Get current URL
   */
  getCurrentUrl(): string {
    return this.page.url();
  }

  /**
   * Navigate to The Internet login page
   */
  async navigateToInternetLogin(): Promise<void> {
    await this.page.goto('https://the-internet.herokuapp.com/login');
    await this.page.waitForTimeout(1000);
  }

  /**
   * Enter username in The Internet login
   */
  async enterInternetUsername(username: string): Promise<void> {
    await this.internetUsername.clear();
    await this.internetUsername.fill(username);
  }

  /**
   * Enter password in The Internet login
   */
  async enterInternetPassword(password: string): Promise<void> {
    await this.internetPassword.clear();
    await this.internetPassword.fill(password);
  }

  /**
   * Click login button in The Internet
   */
  async clickInternetLogin(): Promise<void> {
    await this.internetLoginButton.click();
    await this.page.waitForTimeout(1000);
  }

  /**
   * Get error message from The Internet login
   */
  async getInternetErrorMessage(): Promise<string | null> {
    try {
      const errorElement = this.internetErrorMessage;
      if (await errorElement.isVisible()) {
        return await errorElement.textContent();
      }
      return null;
    } catch {
      return null;
    }
  }
}

