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

  getUsernameInputSelector(): string {
    return '#user-name';
  }

  getPasswordInputSelector(): string {
    return '#password';
  }

  getLoginButtonSelector(): string {
    return '#login-button';
  }
}
