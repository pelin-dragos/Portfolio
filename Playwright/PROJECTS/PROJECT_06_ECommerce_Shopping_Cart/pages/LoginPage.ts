import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Pattern - Login Page (SauceDemo)
 * Used for e-commerce shopping cart flow
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

  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
    // Wait for navigation to inventory page
    await this.page.waitForURL(/.*inventory.*/, { timeout: 15000 });
    // Wait a bit more for page to fully load
    await this.page.waitForLoadState('networkidle');
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

  getCurrentUrl(): string {
    return this.page.url();
  }
}

