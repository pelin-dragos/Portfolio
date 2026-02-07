import { Page } from '@playwright/test';

export class CheckoutPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForURL('**/checkout-step-one.html');
  }

  async isLoaded(): Promise<boolean> {
    try {
      await this.page.waitForURL('**/checkout-step-one.html', { timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async fillFirstName(firstName: string): Promise<void> {
    await this.page.fill('#first-name', firstName);
  }

  async fillLastName(lastName: string): Promise<void> {
    await this.page.fill('#last-name', lastName);
  }

  async fillPostalCode(postalCode: string): Promise<void> {
    await this.page.fill('#postal-code', postalCode);
  }

  async fillCheckoutForm(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.fillFirstName(firstName);
    await this.fillLastName(lastName);
    await this.fillPostalCode(postalCode);
  }

  async clickContinue(): Promise<void> {
    await this.page.click('#continue');
  }

  async isErrorVisible(): Promise<boolean> {
    try {
      const errorElement = this.page.locator('[data-test="error"]');
      return await errorElement.isVisible();
    } catch {
      return false;
    }
  }

  async getErrorMessage(): Promise<string> {
    try {
      const errorElement = this.page.locator('[data-test="error"]');
      return await errorElement.textContent() || '';
    } catch {
      return '';
    }
  }
}

