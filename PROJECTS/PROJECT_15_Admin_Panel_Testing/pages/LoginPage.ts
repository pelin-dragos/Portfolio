/**
 * Page Object Pattern - Admin Login Page
 * For login on admin panel (OrangeHRM, etc.)
 */
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly dashboardTitle: Locator;
  
  private baseUrl: string;

  constructor(page: Page, baseUrl?: string) {
    this.page = page;
    this.baseUrl = baseUrl || 'https://opensource-demo.orangehrmlive.com/';
    
    // Locators - adapted for OrangeHRM (or other admin platforms)
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
    this.errorMessage = page.locator('.oxd-alert-content-text');
    this.dashboardTitle = page.locator('h6.oxd-text--h6');
  }

  /**
   * Navigate to login page
   */
  async navigateTo(): Promise<void> {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Wait for login page to load
   */
  async waitForPageLoad(): Promise<void> {
    try {
      await this.usernameInput.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error('Login page did not load properly');
    }
  }

  /**
   * Check if login page is loaded
   */
  async isLoaded(): Promise<boolean> {
    try {
      return await this.usernameInput.isVisible({ timeout: 5000 });
    } catch {
      return false;
    }
  }

  /**
   * Enter username
   * 
   * @param username Username to enter
   */
  async enterUsername(username: string): Promise<void> {
    await this.usernameInput.waitFor({ state: 'visible' });
    await this.usernameInput.fill(username);
  }

  /**
   * Enter password
   * 
   * @param password Password to enter
   */
  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.waitFor({ state: 'visible' });
    await this.passwordInput.fill(password);
  }

  /**
   * Click login button
   */
  async clickLoginButton(): Promise<void> {
    await this.loginButton.waitFor({ state: 'visible' });
    await this.loginButton.click();
    await this.page.waitForTimeout(2000); // Delay for redirect
  }

  /**
   * Complete login on admin platform
   * 
   * @param username Username
   * @param password Password
   * @returns True if login succeeded
   */
  async login(username: string, password: string): Promise<boolean> {
    await this.waitForPageLoad();
    
    // Enter username
    await this.enterUsername(username);
    await this.page.waitForTimeout(300);
    
    // Enter password
    await this.enterPassword(password);
    await this.page.waitForTimeout(300);
    
    // Click login
    await this.clickLoginButton();
    
    // Check if login failed
    if (await this.errorMessage.isVisible({ timeout: 3000 }).catch(() => false)) {
      const errorMsg = await this.errorMessage.textContent();
      throw new Error(`Login failed: ${errorMsg}`);
    }
    
    // Check redirect or URL change
    await this.page.waitForTimeout(1000);
    return true;
  }

  /**
   * Get error message (if exists)
   * 
   * @returns Error message or null
   */
  async getErrorMessage(): Promise<string | null> {
    if (await this.errorMessage.isVisible({ timeout: 2000 }).catch(() => false)) {
      return await this.errorMessage.textContent();
    }
    return null;
  }

  /**
   * Check if user is logged in (by URL or specific elements)
   * 
   * @returns True if logged in
   */
  async isLoggedIn(): Promise<boolean> {
    const currentUrl = this.page.url();
    // For OrangeHRM, after login URL contains "dashboard"
    return currentUrl.toLowerCase().includes('dashboard') || 
           currentUrl.toLowerCase().includes('index');
  }

  /**
   * Get current URL
   */
  getCurrentUrl(): string {
    return this.page.url();
  }
}

