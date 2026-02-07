import { Page, Locator, expect, FrameLocator } from '@playwright/test';

/**
 * Page Object Pattern - Iframe Page
 * Represents pages with iframes for testing
 */
export class IframePage {
  readonly page: Page;
  readonly iframe: Locator;
  readonly iframeLocator: FrameLocator;
  
  private readonly baseUrl: string = 'https://the-internet.herokuapp.com/iframe';

  constructor(page: Page) {
    this.page = page;
    this.iframe = page.locator('#mce_0_ifr');
    this.iframeLocator = page.frameLocator('#mce_0_ifr');
  }

  async navigateTo(): Promise<void> {
    await this.page.goto(this.baseUrl);
    await expect(this.iframe).toBeVisible();
    await this.page.waitForTimeout(1000);
  }

  /**
   * Switches context to the iframe
   */
  async switchToIframe(): Promise<boolean> {
    try {
      await this.iframe.waitFor({ state: 'attached', timeout: 10000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Switches back to default content
   */
  async switchToDefaultContent(): Promise<boolean> {
    try {
      // In Playwright, we don't need to explicitly switch back
      // But we can verify we're out of iframe by checking page context
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Gets text from the editor in iframe
   */
  async getTextFromIframe(): Promise<string | null> {
    try {
      const editor = this.iframeLocator.locator('#tinymce');
      await editor.waitFor({ state: 'visible', timeout: 10000 });
      return await editor.textContent();
    } catch {
      return null;
    }
  }

  /**
   * Sets text in the editor in iframe
   */
  async setTextInIframe(text: string): Promise<boolean> {
    try {
      const editor = this.iframeLocator.locator('#tinymce');
      await editor.waitFor({ state: 'visible', timeout: 10000 });
      // For TinyMCE editor, use evaluate to set innerHTML directly
      await editor.evaluate((element, newText) => {
        (element as HTMLElement).innerHTML = newText;
      }, text);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Checks if we're in an iframe
   * In Playwright, we check by trying to access iframe content
   */
  async isInIframe(): Promise<boolean> {
    try {
      const editor = this.iframeLocator.locator('#tinymce');
      await editor.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Gets the editor element from iframe
   */
  getEditor(): Locator {
    return this.iframeLocator.locator('#tinymce');
  }
}

