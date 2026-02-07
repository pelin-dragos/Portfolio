import { Page } from '@playwright/test';

export class ProductsPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForURL('**/inventory.html');
    await this.page.waitForSelector('.inventory_list');
  }

  async isLoaded(): Promise<boolean> {
    try {
      await this.page.waitForSelector('.inventory_list', { timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async getProductCount(): Promise<number> {
    const products = await this.page.locator('.inventory_item').count();
    return products;
  }

  async addProductToCart(index: number = 0): Promise<void> {
    const addToCartButtons = this.page.locator('button:has-text("Add to cart")');
    await addToCartButtons.nth(index).click();
  }

  async getCartBadgeCount(): Promise<number> {
    try {
      const badge = this.page.locator('.shopping_cart_badge');
      if (await badge.isVisible()) {
        const text = await badge.textContent();
        return parseInt(text || '0', 10);
      }
      return 0;
    } catch {
      return 0;
    }
  }

  async clickCartIcon(): Promise<void> {
    await this.page.click('.shopping_cart_link');
  }

  async selectSortOption(option: string): Promise<void> {
    await this.page.selectOption('.product_sort_container', option);
  }

  async getFirstProductName(): Promise<string> {
    const firstProduct = this.page.locator('.inventory_item_name').first();
    return await firstProduct.textContent() || '';
  }

  async getFirstProductPrice(): Promise<number> {
    const firstProductPrice = this.page.locator('.inventory_item_price').first();
    const priceText = await firstProductPrice.textContent() || '';
    const price = parseFloat(priceText.replace('$', ''));
    return price;
  }

  async clickMenuButton(): Promise<void> {
    await this.page.click('#react-burger-menu-btn');
  }

  async clickLogout(): Promise<void> {
    await this.page.click('#logout_sidebar_link');
  }
}

