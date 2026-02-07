import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Pattern - Checkout Pages (SauceDemo)
 * Includes: Checkout Information, Checkout Overview, Checkout Complete
 */
export class CheckoutPage {
  readonly page: Page;
  readonly firstNameField: Locator;
  readonly lastNameField: Locator;
  readonly postalCodeField: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameField = page.locator('#first-name');
    this.lastNameField = page.locator('#last-name');
    this.postalCodeField = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');
    this.cancelButton = page.locator('#cancel');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async waitForPageLoad(): Promise<void> {
    await expect(this.firstNameField).toBeVisible({ timeout: 10000 });
  }

  async isLoaded(): Promise<boolean> {
    try {
      await expect(this.firstNameField).toBeVisible({ timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async enterFirstName(firstName: string): Promise<void> {
    await this.firstNameField.clear();
    await this.firstNameField.fill(firstName);
  }

  async enterLastName(lastName: string): Promise<void> {
    await this.lastNameField.clear();
    await this.lastNameField.fill(lastName);
  }

  async enterPostalCode(postalCode: string): Promise<void> {
    await this.postalCodeField.clear();
    await this.postalCodeField.fill(postalCode);
  }

  async fillCheckoutForm(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.enterFirstName(firstName);
    await this.enterLastName(lastName);
    await this.enterPostalCode(postalCode);
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
    // Wait for either navigation to step-two or error message (validation failure)
    try {
      await this.page.waitForURL(/.*checkout-step-two.*/, { timeout: 3000 });
    } catch {
      // If navigation doesn't happen, form validation probably failed
      // This is expected behavior for invalid forms
      await this.page.waitForTimeout(500);
    }
  }

  async clickCancel(): Promise<void> {
    await this.cancelButton.click();
  }

  async getErrorMessage(): Promise<string | null> {
    try {
      if (await this.errorMessage.isVisible({ timeout: 2000 })) {
        return await this.errorMessage.textContent();
      }
      return null;
    } catch {
      return null;
    }
  }
}

export class CheckoutOverviewPage {
  readonly page: Page;
  readonly finishButton: Locator;
  readonly cancelButton: Locator;
  readonly summaryInfo: Locator;
  readonly summarySubtotal: Locator;
  readonly summaryTax: Locator;
  readonly summaryTotal: Locator;

  constructor(page: Page) {
    this.page = page;
    this.finishButton = page.locator('#finish');
    this.cancelButton = page.locator('#cancel');
    this.summaryInfo = page.locator('.summary_info');
    this.summarySubtotal = page.locator('.summary_subtotal_label');
    this.summaryTax = page.locator('.summary_tax_label');
    this.summaryTotal = page.locator('.summary_total_label');
  }

  async waitForPageLoad(): Promise<void> {
    await expect(this.finishButton).toBeVisible({ timeout: 10000 });
  }

  async isLoaded(): Promise<boolean> {
    try {
      await expect(this.finishButton).toBeVisible({ timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async getSubtotal(): Promise<number> {
    const subtotalText = await this.summarySubtotal.textContent();
    if (subtotalText) {
      const match = subtotalText.match(/\$([\d.]+)/);
      return match ? parseFloat(match[1]) : 0;
    }
    return 0;
  }

  async getTax(): Promise<number> {
    const taxText = await this.summaryTax.textContent();
    if (taxText) {
      const match = taxText.match(/\$([\d.]+)/);
      return match ? parseFloat(match[1]) : 0;
    }
    return 0;
  }

  async getTotal(): Promise<number> {
    const totalText = await this.summaryTotal.textContent();
    if (totalText) {
      const match = totalText.match(/\$([\d.]+)/);
      return match ? parseFloat(match[1]) : 0;
    }
    return 0;
  }

  async calculateExpectedTotal(): Promise<number> {
    const subtotal = await this.getSubtotal();
    const tax = await this.getTax();
    return subtotal + tax;
  }

  async clickFinish(): Promise<void> {
    await this.finishButton.click();
    await this.page.waitForURL(/.*checkout-complete.*/, { timeout: 10000 });
  }

  async clickCancel(): Promise<void> {
    await this.cancelButton.click();
  }
}

export class CheckoutCompletePage {
  readonly page: Page;
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.completeHeader = page.locator('.complete-header');
    this.completeText = page.locator('.complete-text');
    this.backHomeButton = page.locator('#back-to-products');
  }

  async waitForPageLoad(): Promise<void> {
    await expect(this.completeHeader).toBeVisible({ timeout: 10000 });
  }

  async isLoaded(): Promise<boolean> {
    try {
      await expect(this.completeHeader).toBeVisible({ timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async getSuccessMessage(): Promise<string> {
    const header = await this.completeHeader.textContent();
    return header ? header.trim() : '';
  }

  async clickBackHome(): Promise<void> {
    await this.backHomeButton.click();
    await this.page.waitForURL(/.*inventory.*/, { timeout: 10000 });
  }
}

