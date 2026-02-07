import { Page } from '@playwright/test';
import { BasePage } from '../framework/core/BasePage';

/**
 * LoginPage - Page Object using BasePage
 */
export class LoginPage extends BasePage {
  private readonly usernameInput = '#user-name';
  private readonly passwordInput = '#password';
  private readonly loginButton = '#login-button';
  private readonly errorMessage = '[data-test="error"]';

  constructor(page: Page, baseUrl: string = 'https://www.saucedemo.com') {
    super(page, baseUrl);
  }

  async waitForPageLoad(): Promise<void> {
    await this.waitForElement(this.usernameInput);
  }

  async enterUsername(username: string): Promise<void> {
    await this.fillField(this.usernameInput, username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.fillField(this.passwordInput, password);
  }

  async clickLoginButton(): Promise<void> {
    await this.clickElement(this.loginButton);
  }

  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
    await this.page.waitForURL('**/inventory.html', { timeout: 5000 });
  }

  async isLoggedIn(): Promise<boolean> {
    try {
      await this.page.waitForURL('**/inventory.html', { timeout: 3000 });
      return true;
    } catch {
      return false;
    }
  }

  async isErrorVisible(): Promise<boolean> {
    return await this.isElementVisible(this.errorMessage);
  }

  async getErrorMessage(): Promise<string> {
    return await this.getText(this.errorMessage);
  }
}
