import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Pattern - Login Page (SauceDemo)
 * Used for data-driven login testing
 */
export class LoginPage {
  readonly page: Page;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  private readonly baseUrl: string = 'https://www.saucedemo.com/';

  constructor(page: Page, baseUrl?: string) {
    this.page = page;
    if (baseUrl) {
      this.baseUrl = baseUrl;
    }

    this.usernameField = page.locator('#user-name');
    this.passwordField = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('h3[data-test="error"]');
  }

  async navigateTo(): Promise<void> {
    await this.page.goto(this.baseUrl);
    await expect(this.loginButton).toBeVisible();
  }

  async enterUsername(username: string): Promise<void> {
    await this.usernameField.clear();
    await this.usernameField.fill(username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.passwordField.clear();
    await this.passwordField.fill(password);
  }

  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  async login(username: string, password: string): Promise<boolean> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
    
    // Wait for navigation or error message
    try {
      await this.page.waitForURL(/.*inventory.*/, { timeout: 5000 });
      return true;
    } catch {
      // Check if error message is displayed (login failed)
      return false;
    }
  }

  async isLoggedIn(): Promise<boolean> {
    try {
      // Wait a bit for URL to update
      await this.page.waitForTimeout(1000);
      const currentUrl = this.page.url();
      return currentUrl.includes('inventory');
    } catch {
      return false;
    }
  }

  async getErrorMessage(): Promise<string | null> {
    try {
      if (await this.errorMessage.isVisible({ timeout: 2000 })) {
        return await this.errorMessage.textContent();
      }
      return null;
    } catch {
      return null;
    }
  }

  async isLoaded(): Promise<boolean> {
    try {
      await expect(this.loginButton).toBeVisible({ timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }
}

