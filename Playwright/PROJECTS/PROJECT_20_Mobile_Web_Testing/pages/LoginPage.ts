import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * LoginPage - Mobile optimized login page
 */
export class LoginPage extends BasePage {
  private readonly usernameInput = '#user-name';
  private readonly passwordInput = '#password';
  private readonly loginButton = '#login-button';
  private readonly errorMessage = '[data-test="error"]';

  constructor(page: Page, baseUrl: string = 'https://www.saucedemo.com') {
    super(page, baseUrl);
  }

  async enterUsername(username: string): Promise<void> {
    await this.page.fill(this.usernameInput, username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.page.fill(this.passwordInput, password);
  }

  async clickLoginButton(): Promise<void> {
    await this.page.click(this.loginButton);
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

  /**
   * Check if login form fits in viewport (mobile responsive check)
   * @returns True if form fits
   */
  async isFormFittingInViewport(): Promise<boolean> {
    const viewport = await this.getViewportSize();
    const form = this.page.locator('.login-box');
    const box = await form.boundingBox();
    
    if (!box) return false;
    
    // Check if form width fits in viewport
    return box.width <= viewport.width;
  }
}
