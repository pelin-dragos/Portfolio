import { Page } from '@playwright/test';

export class CartPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForURL('**/cart.html');
    await this.page.waitForSelector('.cart_list');
  }

  async isLoaded(): Promise<boolean> {
    try {
      await this.page.waitForURL('**/cart.html', { timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async getCartItemCount(): Promise<number> {
    return await this.page.locator('.cart_item').count();
  }

  async removeItem(index: number = 0): Promise<void> {
    const removeButtons = this.page.locator('button:has-text("Remove")');
    await removeButtons.nth(index).click();
    await this.page.waitForTimeout(1000);
  }

  async clickContinueShopping(): Promise<void> {
    await this.page.click('#continue-shopping');
    await this.page.waitForURL('**/inventory.html');
  }

  async clickCheckout(): Promise<void> {
    await this.page.click('#checkout');
    await this.page.waitForURL('**/checkout-step-one.html');
  }

  async isCartEmpty(): Promise<boolean> {
    const items = await this.getCartItemCount();
    return items === 0;
  }

  async getItemNames(): Promise<string[]> {
    const itemNames = this.page.locator('.inventory_item_name');
    const count = await itemNames.count();
    const names: string[] = [];
    for (let i = 0; i < count; i++) {
      const name = await itemNames.nth(i).textContent();
      if (name) names.push(name);
    }
    return names;
  }
}

