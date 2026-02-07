import { Page } from '@playwright/test';

/**
 * LoginPage - Page Object for login page
 */
export class LoginPage {
  private page: Page;
  private baseUrl: string;

  constructor(page: Page, baseUrl: string = 'https://www.saucedemo.com') {
    this.page = page;
    this.baseUrl = baseUrl;
  }

  async navigateTo(): Promise<void> {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async enterUsername(username: string): Promise<void> {
    await this.page.fill('#user-name', username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.page.fill('#password', password);
  }

  async clickLoginButton(): Promise<void> {
    await this.page.click('#login-button');
  }

  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
    await this.page.waitForURL('**/inventory.html', { timeout: 10000 });
  }

  async isLoggedIn(): Promise<boolean> {
    try {
      await this.page.waitForURL('**/inventory.html', { timeout: 3000 });
      return true;
    } catch {
      return false;
    }
  }
}
