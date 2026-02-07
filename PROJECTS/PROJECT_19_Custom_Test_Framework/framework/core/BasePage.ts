import { Page, Locator, expect } from '@playwright/test';
import { Logger } from './Logger';

/**
 * BasePage - Template Method Pattern
 * Base class for all page objects with common methods
 */
export abstract class BasePage {
  protected page: Page;
  protected logger: Logger;
  protected baseUrl: string;

  constructor(page: Page, baseUrl: string = 'https://www.saucedemo.com') {
    this.page = page;
    this.baseUrl = baseUrl;
    this.logger = Logger.getInstance();
  }

  /**
   * Navigate to a URL
   * @param url - URL to navigate to
   */
  async navigateTo(url?: string): Promise<void> {
    const targetUrl = url || this.baseUrl;
    this.logger.info(`Navigating to: ${targetUrl}`);
    await this.page.goto(targetUrl);
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Click an element
   * @param locator - Element locator
   */
  async clickElement(locator: Locator | string): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    this.logger.debug(`Clicking element: ${locator}`);
    await element.click();
  }

  /**
   * Fill an input field
   * @param locator - Element locator
   * @param text - Text to fill
   */
  async fillField(locator: Locator | string, text: string): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    this.logger.debug(`Filling field: ${locator} with text: ${text}`);
    await element.fill(text);
  }

  /**
   * Get text content of an element
   * @param locator - Element locator
   * @returns Text content
   */
  async getText(locator: Locator | string): Promise<string> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    const text = await element.textContent();
    return text || '';
  }

  /**
   * Wait for element to be visible
   * @param locator - Element locator
   * @param timeout - Timeout in milliseconds
   */
  async waitForElement(locator: Locator | string, timeout: number = 10000): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.waitFor({ state: 'visible', timeout });
  }

  /**
   * Check if element is visible
   * @param locator - Element locator
   * @returns True if visible
   */
  async isElementVisible(locator: Locator | string): Promise<boolean> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    try {
      return await element.isVisible({ timeout: 5000 });
    } catch {
      return false;
    }
  }

  /**
   * Get current URL
   * @returns Current URL
   */
  getCurrentUrl(): string {
    return this.page.url();
  }

  /**
   * Take a screenshot
   * @param filename - Screenshot filename
   */
  async takeScreenshot(filename: string): Promise<void> {
    await this.page.screenshot({ path: `screenshots/${filename}`, fullPage: true });
    this.logger.info(`Screenshot saved: ${filename}`);
  }

  /**
   * Abstract method - must be implemented by subclasses
   * Wait for page to load
   */
  abstract waitForPageLoad(): Promise<void>;
}
