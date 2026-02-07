import { chromium, firefox, webkit, Browser, BrowserContext, Page, BrowserType } from '@playwright/test';

/**
 * BaseDriver - Factory Pattern
 * Creates browser instances for different browsers
 */
export class BaseDriver {
  private static browserTypeMap: Map<string, BrowserType> = new Map([
    ['chrome', chromium],
    ['chromium', chromium],
    ['firefox', firefox],
    ['webkit', webkit],
    ['safari', webkit],
  ]);

  /**
   * Factory method to create a browser instance
   * @param browserType - Type of browser (chrome, firefox, webkit)
   * @param headless - Whether to run in headless mode
   * @returns Browser instance
   */
  static async createBrowser(
    browserType: string = 'chrome',
    headless: boolean = true
  ): Promise<Browser> {
    const browser = this.browserTypeMap.get(browserType.toLowerCase());
    
    if (!browser) {
      throw new Error(`Unsupported browser type: ${browserType}`);
    }

    return await browser.launch({
      headless,
    });
  }

  /**
   * Create a browser context
   * @param browser - Browser instance
   * @param options - Context options
   * @returns BrowserContext instance
   */
  static async createContext(
    browser: Browser,
    options: { viewport?: { width: number; height: number } } = {}
  ): Promise<BrowserContext> {
    return await browser.newContext({
      viewport: options.viewport || { width: 1280, height: 720 },
    });
  }

  /**
   * Create a new page
   * @param context - Browser context
   * @returns Page instance
   */
  static async createPage(context: BrowserContext): Promise<Page> {
    return await context.newPage();
  }

  /**
   * Get available browser types
   * @returns Array of browser type names
   */
  static getAvailableBrowsers(): string[] {
    return Array.from(this.browserTypeMap.keys());
  }
}
