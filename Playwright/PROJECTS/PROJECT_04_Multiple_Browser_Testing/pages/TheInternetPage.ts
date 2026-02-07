import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Pattern - The Internet Page (herokuapp)
 * Used for cross-browser navigation testing
 */
export class TheInternetPage {
  readonly page: Page;
  private readonly baseUrl: string = 'https://the-internet.herokuapp.com/';

  constructor(page: Page, baseUrl?: string) {
    this.page = page;
    if (baseUrl) {
      this.baseUrl = baseUrl;
    }
  }

  /**
   * Navigate to a specific page
   */
  async navigateTo(path: string = ''): Promise<void> {
    const url = this.baseUrl + path;
    await this.page.goto(url);
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(1000); // Wait for page to fully load
  }

  /**
   * Click on a link by text
   */
  async clickLink(linkText: string): Promise<void> {
    const link = this.page.locator(`text=${linkText}`).first();
    await link.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(1000);
  }

  /**
   * Get page title (h3, h1, or h2)
   */
  async getPageTitle(): Promise<string | null> {
    try {
      // Try h3 first
      const h3 = this.page.locator('h3').first();
      if (await h3.isVisible({ timeout: 2000 })) {
        return await h3.textContent();
      }
    } catch {
      // Fallback to h1
      try {
        const h1 = this.page.locator('h1').first();
        if (await h1.isVisible({ timeout: 2000 })) {
          return await h1.textContent();
        }
      } catch {
        // Fallback to h2
        try {
          const h2 = this.page.locator('h2').first();
          if (await h2.isVisible({ timeout: 2000 })) {
            return await h2.textContent();
          }
        } catch {
          return null;
        }
      }
    }
    return null;
  }

  /**
   * Check if page is loaded
   */
  async isPageLoaded(): Promise<boolean> {
    try {
      // Wait for body element to be present
      await this.page.waitForSelector('body', { timeout: 5000 });
      
      // Try to find any heading element
      try {
        await this.page.waitForSelector('h1, h2, h3', { timeout: 2000 });
        return true;
      } catch {
        // If no heading, check if body is present (homepage might not have h3)
        const body = this.page.locator('body');
        return await body.isVisible();
      }
    } catch {
      return false;
    }
  }

  /**
   * Get current URL
   */
  getCurrentUrl(): string {
    return this.page.url();
  }

  /**
   * Get page title (document title)
   */
  async getDocumentTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Get all links on the page
   */
  async getAllLinks(): Promise<string[]> {
    const links = this.page.locator('a');
    const count = await links.count();
    const linkTexts: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await links.nth(i).textContent();
      if (text && text.trim()) {
        linkTexts.push(text.trim());
      }
    }
    return linkTexts;
  }

  /**
   * Check if element is visible
   */
  async isElementVisible(selector: string): Promise<boolean> {
    try {
      const element = this.page.locator(selector);
      await expect(element).toBeVisible({ timeout: 2000 });
      return true;
    } catch {
      return false;
    }
  }
}

