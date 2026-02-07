import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Pattern - Dynamic Content Page (The Internet)
 * Pages with dynamic content: AJAX, lazy loading, infinite scroll
 */
export class DynamicContentPage {
  readonly page: Page;
  
  // Locators for Dynamic Content
  readonly dynamicContentLink: Locator;
  readonly contentRows: Locator;
  readonly contentImages: Locator;
  
  // Locators for AJAX
  readonly ajaxDataLink: Locator;
  readonly ajaxLoadingLink: Locator;
  readonly ajaxStartButton: Locator;
  readonly ajaxLoadingMessage: Locator;
  readonly ajaxFinishMessage: Locator;
  
  // Locators for Infinite Scroll
  readonly infiniteScrollLink: Locator;
  
  private readonly baseUrl: string = 'https://the-internet.herokuapp.com/';

  constructor(page: Page) {
    this.page = page;
    
    // Dynamic Content locators
    this.dynamicContentLink = page.locator('text=Dynamic Content');
    this.contentRows = page.locator('.row .large-10.columns');
    this.contentImages = page.locator('.row .large-10.columns img');
    
    // AJAX locators
    this.ajaxDataLink = page.locator('text=Dynamic Loading');
    this.ajaxLoadingLink = page.locator('text=Example 1: Element on page that is hidden');
    this.ajaxStartButton = page.locator('#start button');
    this.ajaxLoadingMessage = page.locator('#loading');
    this.ajaxFinishMessage = page.locator('#finish');
    
    // Infinite Scroll locators
    this.infiniteScrollLink = page.locator('text=Infinite Scroll');
  }

  /**
   * Navigate to Dynamic Content page
   */
  async navigateToDynamicContent(): Promise<void> {
    await this.page.goto(this.baseUrl);
    await this.dynamicContentLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Navigate to AJAX Loading page
   */
  async navigateToAjaxLoading(): Promise<void> {
    await this.page.goto(this.baseUrl);
    await this.ajaxDataLink.click();
    await this.ajaxLoadingLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Navigate to Infinite Scroll page
   */
  async navigateToInfiniteScroll(): Promise<void> {
    await this.page.goto(this.baseUrl);
    await this.infiniteScrollLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Wait for page to load completely
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Get all dynamic content rows
   */
  async getDynamicContentRows(): Promise<Locator[]> {
    const count = await this.contentRows.count();
    const rows: Locator[] = [];
    for (let i = 0; i < count; i++) {
      rows.push(this.contentRows.nth(i));
    }
    return rows;
  }

  /**
   * Get dynamic content count
   */
  async getDynamicContentCount(): Promise<number> {
    return await this.contentRows.count();
  }

  /**
   * Get dynamic content text by index
   */
  async getDynamicContentText(index: number): Promise<string | null> {
    const count = await this.contentRows.count();
    if (index < count) {
      const row = this.contentRows.nth(index);
      return await row.textContent();
    }
    return null;
  }

  /**
   * Get all dynamic content images
   */
  async getDynamicContentImages(): Promise<Locator[]> {
    const count = await this.contentImages.count();
    const images: Locator[] = [];
    for (let i = 0; i < count; i++) {
      images.push(this.contentImages.nth(i));
    }
    return images;
  }

  /**
   * Click AJAX start button
   */
  async clickAjaxStartButton(): Promise<void> {
    await this.ajaxStartButton.click();
  }

  /**
   * Wait for AJAX loading to complete
   */
  async waitForAjaxLoadingComplete(timeout: number = 15000): Promise<string | null> {
    // Wait for loading message to disappear
    await expect(this.ajaxLoadingMessage).toBeHidden({ timeout });
    
    // Wait for finish message to appear
    await expect(this.ajaxFinishMessage).toBeVisible({ timeout });
    
    return await this.ajaxFinishMessage.textContent();
  }

  /**
   * Get AJAX finish message
   */
  async getAjaxFinishMessage(): Promise<string | null> {
    try {
      if (await this.ajaxFinishMessage.isVisible({ timeout: 5000 })) {
        return await this.ajaxFinishMessage.textContent();
      }
      return null;
    } catch {
      return null;
    }
  }

  /**
   * Scroll to bottom of page
   */
  async scrollToBottom(): Promise<void> {
    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await this.page.waitForTimeout(500); // Allow content to load
  }

  /**
   * Scroll incrementally until no new content loads
   */
  async scrollIncrementally(scrollPauseTime: number = 1000): Promise<number> {
    let scrollCount = 0;
    let previousHeight = 0;
    let currentHeight = await this.getPageHeight();
    
    while (currentHeight !== previousHeight) {
      previousHeight = currentHeight;
      await this.page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
      await this.page.waitForTimeout(scrollPauseTime);
      currentHeight = await this.getPageHeight();
      scrollCount++;
      
      // Limit to prevent infinite loops
      if (scrollCount > 10) break;
    }
    
    return scrollCount;
  }

  /**
   * Get current scroll position
   */
  async getCurrentScrollPosition(): Promise<number> {
    return await this.page.evaluate(() => window.pageYOffset);
  }

  /**
   * Get page height
   */
  async getPageHeight(): Promise<number> {
    return await this.page.evaluate(() => document.body.scrollHeight);
  }

  /**
   * Wait for new content after scroll
   */
  async waitForNewContentAfterScroll(initialCount: number, timeout: number = 10000): Promise<boolean> {
    const startTime = Date.now();
    while (Date.now() - startTime < timeout * 1000) {
      const currentCount = await this.contentRows.count();
      if (currentCount > initialCount) {
        return true;
      }
      await this.page.waitForTimeout(500);
    }
    return false;
  }

  /**
   * Refresh page
   */
  async refreshPage(): Promise<void> {
    await this.page.reload();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Get current URL
   */
  getCurrentUrl(): string {
    return this.page.url();
  }
}

