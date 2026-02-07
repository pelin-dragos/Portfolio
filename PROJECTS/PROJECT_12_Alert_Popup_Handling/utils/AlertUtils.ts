import { Page, Dialog } from '@playwright/test';

/**
 * Utility functions for managing alerts and popups
 * Helper functions for JavaScript alerts, confirms, prompts
 */
export class AlertUtils {
  /**
   * Waits for an alert to appear
   */
  static async waitForAlert(page: Page, timeout: number = 10000): Promise<Dialog | null> {
    return new Promise((resolve) => {
      const listener = (dialog: Dialog) => {
        page.off('dialog', listener);
        resolve(dialog);
      };
      page.on('dialog', listener);
      
      setTimeout(() => {
        page.off('dialog', listener);
        resolve(null);
      }, timeout);
    });
  }

  /**
   * Accepts an alert (click OK)
   */
  static async acceptAlert(page: Page, timeout: number = 10000): Promise<boolean> {
    return new Promise((resolve) => {
      const listener = (dialog: Dialog) => {
        dialog.accept();
        page.off('dialog', listener);
        resolve(true);
      };
      page.on('dialog', listener);
      
      setTimeout(() => {
        page.off('dialog', listener);
        resolve(false);
      }, timeout);
    });
  }

  /**
   * Dismisses an alert (click Cancel or X)
   */
  static async dismissAlert(page: Page, timeout: number = 10000): Promise<boolean> {
    return new Promise((resolve) => {
      const listener = (dialog: Dialog) => {
        dialog.dismiss();
        page.off('dialog', listener);
        resolve(true);
      };
      page.on('dialog', listener);
      
      setTimeout(() => {
        page.off('dialog', listener);
        resolve(false);
      }, timeout);
    });
  }

  /**
   * Gets the text of an alert
   */
  static async getAlertText(page: Page, timeout: number = 10000): Promise<string | null> {
    return new Promise((resolve) => {
      const listener = (dialog: Dialog) => {
        const text = dialog.message();
        page.off('dialog', listener);
        resolve(text);
      };
      page.on('dialog', listener);
      
      setTimeout(() => {
        page.off('dialog', listener);
        resolve(null);
      }, timeout);
    });
  }

  /**
   * Sends text to a prompt dialog
   */
  static async sendTextToPrompt(page: Page, text: string, timeout: number = 10000): Promise<boolean> {
    return new Promise((resolve) => {
      const listener = (dialog: Dialog) => {
        dialog.accept(text);
        page.off('dialog', listener);
        resolve(true);
      };
      page.on('dialog', listener);
      
      setTimeout(() => {
        page.off('dialog', listener);
        resolve(false);
      }, timeout);
    });
  }

  /**
   * Checks if an alert is present
   * Note: In Playwright, we can't directly check if alert exists without listener
   * This method sets up a listener and waits briefly
   */
  static async isAlertPresent(page: Page): Promise<boolean> {
    return new Promise((resolve) => {
      let alertFound = false;
      const listener = (dialog: Dialog) => {
        alertFound = true;
        dialog.dismiss(); // Dismiss to clean up
        page.off('dialog', listener);
        resolve(true);
      };
      page.on('dialog', listener);
      
      // Check after a short delay
      setTimeout(() => {
        page.off('dialog', listener);
        resolve(alertFound);
      }, 100);
    });
  }

  /**
   * Handles an alert safely (with try-catch)
   */
  static async handleAlertSafely(
    page: Page,
    accept: boolean = true,
    timeout: number = 10000
  ): Promise<string | null> {
    return new Promise((resolve) => {
      const listener = (dialog: Dialog) => {
        const text = dialog.message();
        if (accept) {
          dialog.accept();
        } else {
          dialog.dismiss();
        }
        page.off('dialog', listener);
        resolve(text);
      };
      page.on('dialog', listener);
      
      setTimeout(() => {
        page.off('dialog', listener);
        resolve(null);
      }, timeout);
    });
  }

  /**
   * Waits for alert and accepts it
   */
  static async waitForAndAcceptAlert(page: Page, timeout: number = 10000): Promise<string | null> {
    return this.handleAlertSafely(page, true, timeout);
  }

  /**
   * Waits for alert and dismisses it
   */
  static async waitForAndDismissAlert(page: Page, timeout: number = 10000): Promise<string | null> {
    return this.handleAlertSafely(page, false, timeout);
  }

  /**
   * Executes an action that triggers an alert and handles the alert
   */
  static async executeActionWithAlert(
    page: Page,
    action: () => Promise<void>,
    acceptAlert: boolean = true,
    timeout: number = 10000
  ): Promise<string | null> {
    // Set up dialog listener before action
    return new Promise((resolve) => {
      const listener = (dialog: Dialog) => {
        const text = dialog.message();
        if (acceptAlert) {
          dialog.accept();
        } else {
          dialog.dismiss();
        }
        page.off('dialog', listener);
        resolve(text);
      };
      page.on('dialog', listener);
      
      // Execute action
      action().then(() => {
        // Wait a bit for dialog to appear
        setTimeout(() => {
          page.off('dialog', listener);
          if (!listener) {
            resolve(null);
          }
        }, timeout);
      }).catch(() => {
        page.off('dialog', listener);
        resolve(null);
      });
    });
  }
}

