import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Pattern - Products Page (SauceDemo)
 * Products page after login
 */
export class ProductsPage {
  readonly page: Page;
  readonly inventoryContainer: Locator;
  readonly productItems: Locator;
  readonly shoppingCartBadge: Locator;
  readonly shoppingCartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryContainer = page.locator('#inventory_container');
    this.productItems = page.locator('.inventory_item');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
  }

  async waitForPageLoad(): Promise<void> {
    // Wait for URL to contain inventory
    await this.page.waitForURL(/.*inventory.*/, { timeout: 10000 });
    // Wait for at least one product item to be visible
    await expect(this.productItems.first()).toBeVisible({ timeout: 10000 });
  }

  async isLoaded(): Promise<boolean> {
    try {
      // Verify URL first
      const url = this.page.url();
      if (!url.includes('inventory')) {
        return false;
      }
      // Check if product items are visible
      const count = await this.productItems.count();
      if (count > 0) {
        await expect(this.productItems.first()).toBeVisible({ timeout: 5000 });
        return true;
      }
      // Fallback to container check
      await expect(this.inventoryContainer).toBeVisible({ timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async getProductsCount(): Promise<number> {
    return await this.productItems.count();
  }

  async getProductInfo(index: number): Promise<{ name: string; price: number } | null> {
    const products = this.productItems;
    const count = await products.count();
    
    if (index < count) {
      const product = products.nth(index);
      const name = await product.locator('.inventory_item_name').textContent();
      const priceText = await product.locator('.inventory_item_price').textContent();
      
      if (name && priceText) {
        const price = parseFloat(priceText.replace('$', ''));
        return { name: name.trim(), price };
      }
    }
    return null;
  }

  async addProductToCart(index: number): Promise<string | null> {
    const products = this.productItems;
    const count = await products.count();
    
    if (index < count) {
      const product = products.nth(index);
      const name = await product.locator('.inventory_item_name').textContent();
      const addButton = product.locator('button.btn_inventory');
      
      // Check if button text is "Remove" (already in cart)
      const buttonText = await addButton.textContent();
      if (buttonText && buttonText.trim().toLowerCase().includes('remove')) {
        return name ? name.trim() : null;
      }
      
      await addButton.scrollIntoViewIfNeeded();
      await addButton.click();
      
      // Wait for button to change to "Remove"
      await expect(addButton).toHaveText(/Remove/i, { timeout: 3000 }).catch(() => {});
      
      return name ? name.trim() : null;
    }
    return null;
  }

  async addMultipleProductsToCart(indices: number[]): Promise<string[]> {
    const addedProducts: string[] = [];
    for (const index of indices) {
      const productName = await this.addProductToCart(index);
      if (productName) {
        addedProducts.push(productName);
      }
    }
    return addedProducts;
  }

  async getCartItemsCount(): Promise<number> {
    try {
      if (await this.shoppingCartBadge.isVisible({ timeout: 2000 })) {
        const text = await this.shoppingCartBadge.textContent();
        return text ? parseInt(text, 10) : 0;
      }
      return 0;
    } catch {
      return 0;
    }
  }

  async clickCart(): Promise<void> {
    await this.shoppingCartLink.click();
    await this.page.waitForURL(/.*cart.*/, { timeout: 10000 });
  }

  getCurrentUrl(): string {
    return this.page.url();
  }
}

