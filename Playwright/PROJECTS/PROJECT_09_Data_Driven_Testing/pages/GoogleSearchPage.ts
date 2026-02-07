import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Pattern - Google Search Page
 * Used for data-driven search testing
 */
export class GoogleSearchPage {
  readonly page: Page;
  readonly searchBox: Locator;
  readonly searchButton: Locator;
  readonly searchResults: Locator;
  
  private readonly baseUrl: string = 'https://www.google.com';

  constructor(page: Page) {
    this.page = page;
    this.searchBox = page.locator('textarea[name="q"]');
    this.searchButton = page.locator('input[name="btnK"]');
    this.searchResults = page.locator('div.g').filter({ has: page.locator('h3') });
  }

  async navigateTo(): Promise<void> {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('domcontentloaded');
    
    // Try to accept cookies
    await this.acceptCookies();
  }

  async acceptCookies(): Promise<boolean> {
    try {
      const acceptButton = this.page.locator('button:has-text("Accept all"), button:has-text("Accept All")');
      await acceptButton.click({ timeout: 5000 });
      await this.page.waitForTimeout(1000);
      return true;
    } catch {
      return false;
    }
  }

  async enterSearchQuery(query: string): Promise<void> {
    await this.searchBox.fill(query);
    await this.page.waitForTimeout(500);
  }

  async submitSearch(): Promise<void> {
    await this.searchBox.press('Enter');
    await this.page.waitForURL(/.*search\?q=.*/, { timeout: 10000 }).catch(() => {});
  }

  async search(query: string): Promise<number> {
    await this.enterSearchQuery(query);
    await this.submitSearch();
    
    // Wait for results
    await this.page.waitForTimeout(3000);
    
    // Check if reCAPTCHA appeared first
    const url = this.page.url();
    if (url.includes('/sorry') || url.includes('recaptcha')) {
      return 0; // Return 0 if reCAPTCHA appears
    }
    
    // Get results count
    try {
      // Wait for results to appear
      await this.page.waitForSelector('div.g', { timeout: 10000 }).catch(() => {});
      const count = await this.searchResults.count();
      return count;
    } catch {
      return 0;
    }
  }

  async isLoaded(): Promise<boolean> {
    try {
      await expect(this.searchBox).toBeVisible({ timeout: 10000 });
      return true;
    } catch {
      return false;
    }
  }
}

