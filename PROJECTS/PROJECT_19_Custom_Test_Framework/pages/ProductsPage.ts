import { Page } from '@playwright/test';
import { BasePage } from '../framework/core/BasePage';

/**
 * ProductsPage - Page Object using BasePage
 */
export class ProductsPage extends BasePage {
  private readonly productList = '.inventory_list';
  private readonly addToCartButton = 'button:has-text("Add to cart")';
  private readonly cartBadge = '.shopping_cart_badge';
  private readonly cartIcon = '.shopping_cart_link';
  private readonly menuButton = '#react-burger-menu-btn';
  private readonly logoutButton = '#logout_sidebar_link';

  constructor(page: Page, baseUrl: string = 'https://www.saucedemo.com') {
    super(page, baseUrl);
  }

  async waitForPageLoad(): Promise<void> {
    await this.waitForElement(this.productList);
  }

  async getProductCount(): Promise<number> {
    return await this.page.locator('.inventory_item').count();
  }

  async addProductToCart(index: number = 0): Promise<void> {
    const buttons = this.page.locator(this.addToCartButton);
    await buttons.nth(index).click();
    await this.page.waitForTimeout(500);
  }

  async getCartBadgeCount(): Promise<number> {
    try {
      const badge = this.page.locator(this.cartBadge);
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
    await this.clickElement(this.cartIcon);
    await this.page.waitForURL('**/cart.html');
  }

  async clickMenuButton(): Promise<void> {
    await this.clickElement(this.menuButton);
    await this.page.waitForTimeout(500);
  }

  async clickLogout(): Promise<void> {
    await this.clickElement(this.logoutButton);
    await this.page.waitForURL('**/index.html');
  }
}
