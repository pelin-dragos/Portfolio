import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Pattern - Cart Page (SauceDemo)
 * Shopping cart page
 */
export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly removeButtons: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.removeButtons = page.locator('button.cart_button');
    this.continueShoppingButton = page.locator('#continue-shopping');
    this.checkoutButton = page.locator('#checkout');
  }

  async waitForPageLoad(): Promise<void> {
    // Wait for URL to contain cart
    await this.page.waitForURL(/.*cart.*/, { timeout: 10000 });
    // Wait for buttons to be visible
    await expect(this.checkoutButton.or(this.continueShoppingButton).first()).toBeVisible({ timeout: 10000 });
  }

  async isLoaded(): Promise<boolean> {
    try {
      await expect(this.checkoutButton.or(this.continueShoppingButton).first()).toBeVisible({ timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async getCartItemsCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async getAllCartItemsNames(): Promise<string[]> {
    const count = await this.cartItems.count();
    const names: string[] = [];
    
    for (let i = 0; i < count; i++) {
      const item = this.cartItems.nth(i);
      const name = await item.locator('.inventory_item_name').textContent();
      if (name) {
        names.push(name.trim());
      }
    }
    
    return names;
  }

  async getAllCartItemsPrices(): Promise<number[]> {
    const count = await this.cartItems.count();
    const prices: number[] = [];
    
    for (let i = 0; i < count; i++) {
      const item = this.cartItems.nth(i);
      const priceText = await item.locator('.inventory_item_price').textContent();
      if (priceText) {
        const price = parseFloat(priceText.replace('$', ''));
        prices.push(price);
      }
    }
    
    return prices;
  }

  async calculateTotalPrice(): Promise<number> {
    const prices = await this.getAllCartItemsPrices();
    return prices.reduce((sum, price) => sum + price, 0);
  }

  async removeItemFromCart(index: number): Promise<string | null> {
    const count = await this.cartItems.count();
    
    if (index < count) {
      const item = this.cartItems.nth(index);
      const name = await item.locator('.inventory_item_name').textContent();
      const removeButton = item.locator('button.cart_button');
      
      await removeButton.click();
      
      // Wait for item to be removed
      await this.page.waitForTimeout(500);
      
      return name ? name.trim() : null;
    }
    return null;
  }

  async clickContinueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
    await this.page.waitForURL(/.*inventory.*/, { timeout: 10000 });
  }

  async clickCheckout(): Promise<void> {
    await this.checkoutButton.click();
    await this.page.waitForURL(/.*checkout-step-one.*/, { timeout: 10000 });
  }

  getCurrentUrl(): string {
    return this.page.url();
  }
}

