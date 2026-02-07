import { Page } from '@playwright/test';

/**
 * ProductsPage - Page Object for products page
 */
export class ProductsPage {
  private page: Page;
  private baseUrl: string;

  constructor(page: Page, baseUrl: string = 'https://www.saucedemo.com') {
    this.page = page;
    this.baseUrl = baseUrl;
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForURL('**/inventory.html');
    await this.page.waitForSelector('.inventory_list');
  }

  async getProductCount(): Promise<number> {
    return await this.page.locator('.inventory_item').count();
  }

  async addProductToCart(index: number = 0): Promise<void> {
    const buttons = this.page.locator('button:has-text("Add to cart")');
    await buttons.nth(index).click();
    await this.page.waitForTimeout(500);
  }

  /**
   * Wait for page to be fully loaded for visual comparison
   */
  async waitForVisualStability(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(1000); // Wait for any animations
  }
}
