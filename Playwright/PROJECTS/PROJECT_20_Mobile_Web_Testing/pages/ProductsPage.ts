import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * ProductsPage - Mobile navigation page
 */
export class ProductsPage extends BasePage {
  private readonly productList = '.inventory_list';
  private readonly menuButton = '#react-burger-menu-btn';
  private readonly menu = '.bm-menu';
  private readonly logoutButton = '#logout_sidebar_link';
  private readonly cartIcon = '.shopping_cart_link';
  private readonly addToCartButton = 'button:has-text("Add to cart")';

  constructor(page: Page, baseUrl: string = 'https://www.saucedemo.com') {
    super(page, baseUrl);
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForSelector(this.productList);
  }

  async getProductCount(): Promise<number> {
    return await this.page.locator('.inventory_item').count();
  }

  /**
   * Click hamburger menu (mobile navigation)
   */
  async clickMenuButton(): Promise<void> {
    await this.page.click(this.menuButton);
    await this.page.waitForTimeout(500);
  }

  /**
   * Check if hamburger menu is visible (mobile)
   * @returns True if menu button is visible
   */
  async isMenuButtonVisible(): Promise<boolean> {
    return await this.isElementVisible(this.menuButton);
  }

  /**
   * Check if menu is open
   * @returns True if menu is visible
   */
  async isMenuOpen(): Promise<boolean> {
    return await this.isElementVisible(this.menu);
  }

  /**
   * Click logout from menu
   */
  async clickLogout(): Promise<void> {
    try {
      // Wait for menu to be visible first
      await this.page.waitForSelector(this.menu, { state: 'visible', timeout: 5000 });
      // Then wait for logout button
      await this.page.waitForSelector(this.logoutButton, { state: 'visible', timeout: 5000 });
      await this.page.click(this.logoutButton);
      await this.page.waitForURL('**/index.html', { timeout: 5000 });
    } catch (error) {
      // If logout button not found, try alternative selector
      const altLogoutButton = '#logout_sidebar_link';
      if (await this.page.locator(altLogoutButton).isVisible({ timeout: 2000 })) {
        await this.page.click(altLogoutButton);
        await this.page.waitForURL('**/index.html', { timeout: 5000 });
      } else {
        throw error;
      }
    }
  }

  async clickCartIcon(): Promise<void> {
    await this.page.click(this.cartIcon);
    await this.page.waitForURL('**/cart.html');
  }

  async addProductToCart(index: number = 0): Promise<void> {
    const buttons = this.page.locator(this.addToCartButton);
    await buttons.nth(index).click();
    await this.page.waitForTimeout(500);
  }

  /**
   * Check if products are visible in viewport
   * @returns True if products are visible
   */
  async areProductsVisible(): Promise<boolean> {
    const productCount = await this.getProductCount();
    if (productCount === 0) return false;
    
    const firstProduct = this.page.locator('.inventory_item').first();
    return await this.isElementVisible(firstProduct);
  }
}
