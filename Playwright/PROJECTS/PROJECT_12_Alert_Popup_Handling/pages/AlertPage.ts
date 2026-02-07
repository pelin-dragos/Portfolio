import { Page, Locator, expect, Dialog } from '@playwright/test';

/**
 * Page Object Pattern - Alert Page
 * Represents pages with alerts and popups for testing
 */
export class AlertPage {
  readonly page: Page;
  readonly jsAlertButton: Locator;
  readonly jsConfirmButton: Locator;
  readonly jsPromptButton: Locator;
  readonly resultMessage: Locator;
  
  private readonly baseUrl: string = 'https://the-internet.herokuapp.com/javascript_alerts';

  constructor(page: Page) {
    this.page = page;
    this.jsAlertButton = page.locator("button:has-text('Click for JS Alert')");
    this.jsConfirmButton = page.locator("button:has-text('Click for JS Confirm')");
    this.jsPromptButton = page.locator("button:has-text('Click for JS Prompt')");
    this.resultMessage = page.locator('#result');
  }

  async navigateTo(): Promise<void> {
    await this.page.goto(this.baseUrl);
    await expect(this.jsAlertButton).toBeVisible();
    await this.page.waitForTimeout(500);
  }

  /**
   * Clicks the button that triggers JS Alert
   */
  async clickJsAlert(): Promise<boolean> {
    try {
      await this.jsAlertButton.click();
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Clicks the button that triggers JS Confirm
   */
  async clickJsConfirm(): Promise<boolean> {
    try {
      await this.jsConfirmButton.click();
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Clicks the button that triggers JS Prompt
   */
  async clickJsPrompt(): Promise<boolean> {
    try {
      await this.jsPromptButton.click();
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Gets the result message after handling alert
   */
  async getResultMessage(): Promise<string | null> {
    try {
      await expect(this.resultMessage).toBeVisible({ timeout: 10000 });
      return await this.resultMessage.textContent();
    } catch {
      return null;
    }
  }

  /**
   * Checks if result message is displayed
   */
  async isResultDisplayed(): Promise<boolean> {
    try {
      return await this.resultMessage.isVisible();
    } catch {
      return false;
    }
  }

  /**
   * Waits for alert and gets its text
   * In Playwright, we use dialog listener
   */
  async waitForAlertAndGetText(): Promise<string | null> {
    return new Promise((resolve) => {
      const listener = (dialog: Dialog) => {
        const text = dialog.message();
        this.page.off('dialog', listener);
        resolve(text);
      };
      this.page.on('dialog', listener);
      
      // Set timeout
      setTimeout(() => {
        this.page.off('dialog', listener);
        resolve(null);
      }, 10000);
    });
  }

  /**
   * Accepts the alert
   */
  async acceptAlert(): Promise<boolean> {
    return new Promise((resolve) => {
      const listener = (dialog: Dialog) => {
        dialog.accept();
        this.page.off('dialog', listener);
        resolve(true);
      };
      this.page.on('dialog', listener);
      
      // Set timeout
      setTimeout(() => {
        this.page.off('dialog', listener);
        resolve(false);
      }, 10000);
    });
  }

  /**
   * Dismisses the alert
   */
  async dismissAlert(): Promise<boolean> {
    return new Promise((resolve) => {
      const listener = (dialog: Dialog) => {
        dialog.dismiss();
        this.page.off('dialog', listener);
        resolve(true);
      };
      this.page.on('dialog', listener);
      
      // Set timeout
      setTimeout(() => {
        this.page.off('dialog', listener);
        resolve(false);
      }, 10000);
    });
  }

  /**
   * Sends text to a prompt dialog
   */
  async sendTextToPrompt(text: string): Promise<boolean> {
    return new Promise((resolve) => {
      const listener = (dialog: Dialog) => {
        dialog.accept(text);
        this.page.off('dialog', listener);
        resolve(true);
      };
      this.page.on('dialog', listener);
      
      // Set timeout
      setTimeout(() => {
        this.page.off('dialog', listener);
        resolve(false);
      }, 10000);
    });
  }
}

