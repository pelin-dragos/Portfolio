import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Pattern - Login Page (SauceDemo)
 * Used for cross-browser testing
 */
export class LoginPage {
  readonly page: Page;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly loginContainer: Locator;
  private readonly baseUrl: string = 'https://www.saucedemo.com/';

  constructor(page: Page, baseUrl?: string) {
    this.page = page;
    if (baseUrl) {
      this.baseUrl = baseUrl;
    }

    // Locators
    this.usernameField = page.locator('#user-name');
    this.passwordField = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('h3[data-test="error"]');
    this.loginContainer = page.locator('.login-container');
  }

  /**
   * Navigate to login page
   */
  async navigateTo(): Promise<void> {
    await this.page.goto(this.baseUrl);
    await expect(this.loginButton).toBeVisible();
  }

  /**
   * Enter username
   */
  async enterUsername(username: string): Promise<void> {
    await this.usernameField.clear();
    await this.usernameField.fill(username);
  }

  /**
   * Enter password
   */
  async enterPassword(password: string): Promise<void> {
    await this.passwordField.clear();
    await this.passwordField.fill(password);
  }

  /**
   * Click login button
   */
  async clickLogin(): Promise<void> {
    await this.loginButton.click();
    // Wait for navigation or error message
    await this.page.waitForTimeout(1000);
  }

  /**
   * Complete login flow
   */
  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
    // Wait for navigation to products page or error message
    await this.page.waitForTimeout(2000);
  }

  /**
   * Get error message if present
   */
  async getErrorMessage(): Promise<string | null> {
    try {
      const errorElement = this.errorMessage;
      if (await errorElement.isVisible({ timeout: 2000 })) {
        return await errorElement.textContent();
      }
      return null;
    } catch {
      return null;
    }
  }

  /**
   * Check if login page is loaded
   */
  async isLoaded(): Promise<boolean> {
    try {
      await expect(this.loginButton).toBeVisible({ timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get current URL
   */
  getCurrentUrl(): string {
    return this.page.url();
  }

  /**
   * Get page title
   */
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Check if error message is displayed
   */
  async isErrorMessageDisplayed(): Promise<boolean> {
    const errorMessage = await this.getErrorMessage();
    return errorMessage !== null && errorMessage.length > 0;
  }
}

