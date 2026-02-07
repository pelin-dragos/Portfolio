import { Page } from '@playwright/test';

/**
 * ProductsPage - Page Object for products page (Docker/Headless optimized)
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
    await this.page.waitForSelector('.inventory_list', { timeout: 10000 });
  }

  async getProductCount(): Promise<number> {
    return await this.page.locator('.inventory_item').count();
  }

  async addProductToCart(index: number = 0): Promise<void> {
    const buttons = this.page.locator('button:has-text("Add to cart")');
    await buttons.nth(index).click();
    await this.page.waitForTimeout(500);
  }

  async clickCartIcon(): Promise<void> {
    await this.page.click('.shopping_cart_link');
    await this.page.waitForURL('**/cart.html');
  }
}
