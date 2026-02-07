import { Page } from '@playwright/test';

export class CheckoutCompletePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForURL('**/checkout-complete.html');
  }

  async isLoaded(): Promise<boolean> {
    try {
      await this.page.waitForURL('**/checkout-complete.html', { timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async getSuccessMessage(): Promise<string> {
    try {
      const messageElement = this.page.locator('.complete-header');
      return await messageElement.textContent() || '';
    } catch {
      return '';
    }
  }

  async isSuccessMessageVisible(message: string): Promise<boolean> {
    try {
      const messageElement = this.page.locator('.complete-header');
      const text = await messageElement.textContent();
      return text?.includes(message) || false;
    } catch {
      return false;
    }
  }
}

