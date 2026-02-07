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
    const items = await this.page.locator('.cart_item').count();
    return items;
  }

  async removeItem(index: number = 0): Promise<void> {
    const removeButtons = this.page.locator('button:has-text("Remove")');
    await removeButtons.nth(index).click();
  }

  async clickContinueShopping(): Promise<void> {
    await this.page.click('#continue-shopping');
  }

  async clickCheckout(): Promise<void> {
    await this.page.click('#checkout');
  }

  async isCartEmpty(): Promise<boolean> {
    const items = await this.getCartItemCount();
    return items === 0;
  }

  async getTotalPrice(): Promise<string> {
    try {
      // On cart page, there's no total price displayed
      // Total price is shown on checkout overview page
      // For cart page, we can get item prices
      const priceElements = await this.page.locator('.inventory_item_price').allTextContents();
      if (priceElements.length > 0) {
        return priceElements.join(', ');
      }
      return '';
    } catch {
      return '';
    }
  }

  async isCheckoutButtonEnabled(): Promise<boolean> {
    const checkoutButton = this.page.locator('#checkout');
    return await checkoutButton.isEnabled();
  }
}

