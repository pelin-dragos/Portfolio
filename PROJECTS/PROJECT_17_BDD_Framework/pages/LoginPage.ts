import { Page } from '@playwright/test';

export class LoginPage {
  private page: Page;
  private baseUrl: string;

  constructor(page: Page, baseUrl: string) {
    this.page = page;
    this.baseUrl = baseUrl;
  }

  async navigateTo(): Promise<void> {
    await this.page.goto(this.baseUrl);
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
  }

  async isLoggedIn(): Promise<boolean> {
    try {
      await this.page.waitForURL('**/inventory.html', { timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async isErrorVisible(): Promise<boolean> {
    try {
      const errorElement = this.page.locator('[data-test="error"]');
      return await errorElement.isVisible();
    } catch {
      return false;
    }
  }

  async getErrorMessage(): Promise<string> {
    try {
      const errorElement = this.page.locator('[data-test="error"]');
      return await errorElement.textContent() || '';
    } catch {
      return '';
    }
  }

  async isOnLoginPage(): Promise<boolean> {
    return this.page.url().includes('index.html');
  }
}

