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
    return await this.page.locator('.inventory_item').count();
  }

  async addProductToCart(index: number = 0): Promise<void> {
    const addToCartButtons = this.page.locator('button:has-text("Add to cart")');
    await addToCartButtons.nth(index).click();
    await this.page.waitForTimeout(500);
  }

  async removeProductFromCart(index: number = 0): Promise<void> {
    const removeButtons = this.page.locator('button:has-text("Remove")');
    await removeButtons.nth(index).click();
    await this.page.waitForTimeout(500);
  }

  async getCartBadgeCount(): Promise<number> {
    try {
      const badge = this.page.locator('.shopping_cart_badge');
      if (await badge.isVisible({ timeout: 2000 })) {
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
    await this.page.waitForURL('**/cart.html');
  }

  async selectSortOption(option: string): Promise<void> {
    await this.page.selectOption('.product_sort_container', option);
    await this.page.waitForTimeout(1000);
  }

  async getFirstProductName(): Promise<string> {
    const firstProduct = this.page.locator('.inventory_item_name').first();
    return await firstProduct.textContent() || '';
  }

  async getFirstProductPrice(): Promise<number> {
    const firstProductPrice = this.page.locator('.inventory_item_price').first();
    const priceText = await firstProductPrice.textContent() || '';
    return parseFloat(priceText.replace('$', ''));
  }

  async clickMenuButton(): Promise<void> {
    await this.page.click('#react-burger-menu-btn');
    await this.page.waitForTimeout(500);
  }

  async clickLogout(): Promise<void> {
    await this.page.click('#logout_sidebar_link');
    await this.page.waitForURL('**/index.html');
  }

  async getAllProductNames(): Promise<string[]> {
    const productNames = this.page.locator('.inventory_item_name');
    const count = await productNames.count();
    const names: string[] = [];
    for (let i = 0; i < count; i++) {
      const name = await productNames.nth(i).textContent();
      if (name) names.push(name);
    }
    return names;
  }

  async getAllProductPrices(): Promise<number[]> {
    const productPrices = this.page.locator('.inventory_item_price');
    const count = await productPrices.count();
    const prices: number[] = [];
    for (let i = 0; i < count; i++) {
      const priceText = await productPrices.nth(i).textContent();
      if (priceText) {
        prices.push(parseFloat(priceText.replace('$', '')));
      }
    }
    return prices;
  }
}

