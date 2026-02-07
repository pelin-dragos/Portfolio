import { Page } from '@playwright/test';

export class CheckoutOverviewPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForURL('**/checkout-step-two.html');
  }

  async isLoaded(): Promise<boolean> {
    try {
      await this.page.waitForURL('**/checkout-step-two.html', { timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async getSubtotal(): Promise<string> {
    try {
      const subtotalElement = this.page.locator('.summary_subtotal_label');
      return await subtotalElement.textContent() || '';
    } catch {
      return '';
    }
  }

  async getTax(): Promise<string> {
    try {
      const taxElement = this.page.locator('.summary_tax_label');
      return await taxElement.textContent() || '';
    } catch {
      return '';
    }
  }

  async getTotal(): Promise<string> {
    try {
      const totalElement = this.page.locator('.summary_total_label');
      return await totalElement.textContent() || '';
    } catch {
      return '';
    }
  }

  async getCartItemCount(): Promise<number> {
    const items = await this.page.locator('.cart_item').count();
    return items;
  }

  async clickFinish(): Promise<void> {
    await this.page.click('#finish');
  }
}

