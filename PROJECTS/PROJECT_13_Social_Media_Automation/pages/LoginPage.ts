/**
 * Page Object Pattern - Social Media Login Page
 * Template for login on social media platforms
 */
import { Page, Locator } from '@playwright/test';
import { HumanBehavior } from '../utils/HumanBehavior';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly errorMessage: Locator;
  
  private baseUrl: string;

  constructor(page: Page) {
    this.page = page;
    // Default: demo social feed (no login required - direct access to feed)
    // For real platforms, adapt this URL
    this.baseUrl = 'http://localhost:8000/demo-social-feed.html';
    
    // Locators - template (must be adapted to specific platform)
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator("button[type='submit']");
    this.rememberMeCheckbox = page.locator('#remember');
    this.errorMessage = page.locator('.error-message');
  }

  /**
   * Navigate to login page
   */
  async navigateTo(): Promise<void> {
    await this.page.goto(this.baseUrl);
    await HumanBehavior.randomDelay(1.0, 2.0);
  }

  /**
   * Wait for login page to load
   */
  async waitForPageLoad(): Promise<void> {
    try {
      await this.usernameInput.waitFor({ state: 'visible', timeout: 10000 });
      await HumanBehavior.randomDelay(0.5, 1.0);
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
    await HumanBehavior.humanType(this.page, '#username', username);
  }

  /**
   * Enter password
   * 
   * @param password Password to enter
   */
  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.waitFor({ state: 'visible' });
    await HumanBehavior.humanType(this.page, '#password', password);
  }

  /**
   * Click login button
   */
  async clickLoginButton(): Promise<void> {
    await this.loginButton.waitFor({ state: 'visible' });
    await HumanBehavior.humanClick(this.page, "button[type='submit']");
    await HumanBehavior.randomDelay(2.0, 3.5); // Longer delay for redirect
  }

  /**
   * Complete login on platform
   * 
   * @param username Username
   * @param password Password
   * @param rememberMe Whether to check "Remember me" (default: false)
   * @returns True if login succeeded
   */
  async login(username: string, password: string, rememberMe: boolean = false): Promise<boolean> {
    await this.waitForPageLoad();
    
    // Enter username
    await this.enterUsername(username);
    await HumanBehavior.thinkDelay();
    
    // Enter password
    await this.enterPassword(password);
    await HumanBehavior.thinkDelay();
    
    // Remember me (optional)
    if (rememberMe && await this.rememberMeCheckbox.isVisible({ timeout: 2000 })) {
      const isChecked = await this.rememberMeCheckbox.isChecked();
      if (!isChecked) {
        await HumanBehavior.humanClick(this.page, '#remember');
        await HumanBehavior.randomDelay(0.3, 0.6);
      }
    }
    
    // Click login
    await this.clickLoginButton();
    
    // Check if login failed (check for error message)
    if (await this.errorMessage.isVisible({ timeout: 3000 })) {
      const errorMsg = await this.errorMessage.textContent();
      throw new Error(`Login failed: ${errorMsg}`);
    }
    
    // Check redirect or URL change
    await HumanBehavior.randomDelay(1.0, 2.0);
    return true;
  }

  /**
   * Get error message (if exists)
   * 
   * @returns Error message or null
   */
  async getErrorMessage(): Promise<string | null> {
    if (await this.errorMessage.isVisible({ timeout: 2000 })) {
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
    // Check if URL changed from login page
    return !currentUrl.toLowerCase().includes('login');
  }

  /**
   * Get current URL
   */
  getCurrentUrl(): string {
    return this.page.url();
  }
}

