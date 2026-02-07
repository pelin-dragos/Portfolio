import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Pattern - Radio Button Page
 * Represents pages with radio buttons for testing
 */
export class RadioPage {
  readonly page: Page;
  readonly yesRadio: Locator;
  readonly impressiveRadio: Locator;
  readonly noRadio: Locator;
  readonly yesLabel: Locator;
  readonly impressiveLabel: Locator;
  readonly successMessage: Locator;
  
  private readonly baseUrl: string = 'https://demoqa.com/radio-button';

  constructor(page: Page) {
    this.page = page;
    this.yesRadio = page.locator('#yesRadio');
    this.impressiveRadio = page.locator('#impressiveRadio');
    this.noRadio = page.locator('#noRadio');
    this.yesLabel = page.locator("label[for='yesRadio']");
    this.impressiveLabel = page.locator("label[for='impressiveRadio']");
    this.successMessage = page.locator('.text-success');
  }

  async navigateTo(): Promise<void> {
    await this.page.goto(this.baseUrl);
    // Radio buttons are hidden by CSS, but can be clicked via label
    await this.page.waitForTimeout(1000);
  }

  /**
   * Clicks the 'Yes' radio button
   */
  async clickYesRadio(): Promise<boolean> {
    try {
      // Use label for click (radio button is hidden)
      await this.yesLabel.click();
      await this.page.waitForTimeout(500);
      return true;
    } catch {
      // Fallback: try to click directly on input using JavaScript
      try {
        await this.page.evaluate((element) => {
          (element as HTMLElement).click();
        }, await this.yesRadio.elementHandle());
        await this.page.waitForTimeout(500);
        return true;
      } catch {
        return false;
      }
    }
  }

  /**
   * Clicks the 'Impressive' radio button
   */
  async clickImpressiveRadio(): Promise<boolean> {
    try {
      // Use label for click
      await this.impressiveLabel.click();
      await this.page.waitForTimeout(500);
      return true;
    } catch {
      // Fallback: JavaScript click
      try {
        await this.page.evaluate((element) => {
          (element as HTMLElement).click();
        }, await this.impressiveRadio.elementHandle());
        await this.page.waitForTimeout(500);
        return true;
      } catch {
        return false;
      }
    }
  }

  /**
   * Clicks the 'No' radio button (disabled)
   */
  async clickNoRadio(): Promise<boolean> {
    try {
      const isDisabled = await this.noRadio.isDisabled();
      if (isDisabled) {
        return false; // Radio button is disabled
      }
      const noLabel = this.page.locator("label[for='noRadio']");
      await noLabel.click();
      await this.page.waitForTimeout(500);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Checks if 'Yes' radio button is selected
   */
  async isYesSelected(): Promise<boolean> {
    try {
      return await this.yesRadio.isChecked();
    } catch {
      return false;
    }
  }

  /**
   * Checks if 'Impressive' radio button is selected
   */
  async isImpressiveSelected(): Promise<boolean> {
    try {
      return await this.impressiveRadio.isChecked();
    } catch {
      return false;
    }
  }

  /**
   * Checks if 'No' radio button is selected
   */
  async isNoSelected(): Promise<boolean> {
    try {
      return await this.noRadio.isChecked();
    } catch {
      return false;
    }
  }

  /**
   * Gets the selected radio button text (from success message)
   */
  async getSelectedRadioText(): Promise<string | null> {
    try {
      await expect(this.successMessage).toBeVisible({ timeout: 5000 });
      return await this.successMessage.textContent();
    } catch {
      return null;
    }
  }

  /**
   * Gets all radio buttons on the page
   */
  async getAllRadioButtons(): Promise<Locator[]> {
    try {
      return [this.yesRadio, this.impressiveRadio, this.noRadio];
    } catch {
      return [];
    }
  }

  /**
   * Gets the selected radio button
   */
  async getSelectedRadio(): Promise<Locator | null> {
    const radios = await this.getAllRadioButtons();
    
    for (const radio of radios) {
      if (await radio.isChecked()) {
        return radio;
      }
    }
    
    return null;
  }

  /**
   * Checks if 'No' radio button is disabled
   */
  async isNoDisabled(): Promise<boolean> {
    try {
      return await this.noRadio.isDisabled();
    } catch {
      return false;
    }
  }
}

