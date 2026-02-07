import { Page, Locator } from '@playwright/test';
import { ViewportConfigs, ViewportSize } from '../utils/ViewportConfigs';

/**
 * BasePage - Base class with viewport detection
 */
export class BasePage {
  protected page: Page;
  protected baseUrl: string;

  constructor(page: Page, baseUrl: string = 'https://www.saucedemo.com') {
    this.page = page;
    this.baseUrl = baseUrl;
  }

  /**
   * Get current viewport size
   * @returns Viewport size
   */
  async getViewportSize(): Promise<{ width: number; height: number }> {
    return await this.page.viewportSize() || { width: 0, height: 0 };
  }

  /**
   * Check if current viewport is mobile
   * @returns True if mobile viewport
   */
  async isMobileViewport(): Promise<boolean> {
    const size = await this.getViewportSize();
    return ViewportConfigs.detectViewportType(size.width) === 'mobile';
  }

  /**
   * Check if current viewport is tablet
   * @returns True if tablet viewport
   */
  async isTabletViewport(): Promise<boolean> {
    const size = await this.getViewportSize();
    return ViewportConfigs.detectViewportType(size.width) === 'tablet';
  }

  /**
   * Check if current viewport is desktop
   * @returns True if desktop viewport
   */
  async isDesktopViewport(): Promise<boolean> {
    const size = await this.getViewportSize();
    return ViewportConfigs.detectViewportType(size.width) === 'desktop';
  }

  /**
   * Navigate to URL
   * @param url - URL to navigate to
   */
  async navigateTo(url?: string): Promise<void> {
    const targetUrl = url || this.baseUrl;
    await this.page.goto(targetUrl);
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Take screenshot with viewport name
   * @param viewport - Viewport configuration
   */
  async takeViewportScreenshot(viewport: ViewportSize): Promise<void> {
    const filename = `screenshots/viewports/${viewport.name.replace(/\s+/g, '_')}_${Date.now()}.png`;
    await this.page.screenshot({ path: filename, fullPage: true });
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
}
