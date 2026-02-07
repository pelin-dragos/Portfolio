import { Page, Locator, FrameLocator } from '@playwright/test';

/**
 * Utility functions for managing iframes
 * Helper functions for switching between frames, nested frames, etc.
 */
export class IframeUtils {
  /**
   * Switches context to a frame by locator
   */
  static getFrameLocator(page: Page, frameSelector: string): FrameLocator {
    return page.frameLocator(frameSelector);
  }

  /**
   * Switches context to a frame by ID
   */
  static getFrameLocatorById(page: Page, frameId: string): FrameLocator {
    return page.frameLocator(`#${frameId}`);
  }

  /**
   * Switches context to a frame by name
   */
  static getFrameLocatorByName(page: Page, frameName: string): FrameLocator {
    return page.frameLocator(`frame[name="${frameName}"], iframe[name="${frameName}"]`);
  }

  /**
   * Gets all iframes on the page
   */
  static async getAllFrames(page: Page): Promise<Locator[]> {
    try {
      const iframes = page.locator('iframe, frame');
      const count = await iframes.count();
      const frames: Locator[] = [];
      
      for (let i = 0; i < count; i++) {
        frames.push(iframes.nth(i));
      }
      
      return frames;
    } catch {
      return [];
    }
  }

  /**
   * Gets the count of iframes on the page
   */
  static async getFrameCount(page: Page): Promise<number> {
    const frames = await this.getAllFrames(page);
    return frames.length;
  }

  /**
   * Finds an element in a specific frame
   */
  static findElementInFrame(
    page: Page,
    frameSelector: string,
    elementSelector: string
  ): Locator {
    const frame = page.frameLocator(frameSelector);
    return frame.locator(elementSelector);
  }

  /**
   * Clicks an element in a specific frame
   */
  static async clickElementInFrame(
    page: Page,
    frameSelector: string,
    elementSelector: string
  ): Promise<boolean> {
    try {
      const frame = page.frameLocator(frameSelector);
      const element = frame.locator(elementSelector);
      // Wait for element to be visible and attached
      await element.waitFor({ state: 'attached', timeout: 10000 });
      // Try to click, but if it fails, use JavaScript click
      try {
        await element.click({ timeout: 5000 });
      } catch {
        // Fallback to JavaScript click
        await element.evaluate((el) => (el as HTMLElement).click());
      }
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Gets text from an element in a specific frame
   */
  static async getTextFromFrame(
    page: Page,
    frameSelector: string,
    elementSelector: string
  ): Promise<string | null> {
    try {
      const element = this.findElementInFrame(page, frameSelector, elementSelector);
      await element.waitFor({ state: 'visible', timeout: 10000 });
      return await element.textContent();
    } catch {
      return null;
    }
  }

  /**
   * Switches to a nested frame (frame in frame)
   */
  static getNestedFrameLocator(
    page: Page,
    parentFrameSelector: string,
    childFrameSelector: string
  ): FrameLocator {
    const parentFrame = page.frameLocator(parentFrameSelector);
    return parentFrame.frameLocator(childFrameSelector);
  }

  /**
   * Checks if we can access a frame (verifies frame exists and is accessible)
   */
  static async isFrameAccessible(
    page: Page,
    frameSelector: string
  ): Promise<boolean> {
    try {
      // First check if frame element exists
      const frameElement = page.locator(frameSelector).first();
      await frameElement.waitFor({ state: 'attached', timeout: 5000 });
      
      // Then check if we can access frame content
      const frame = page.frameLocator(frameSelector);
      const body = frame.locator('body');
      await body.waitFor({ state: 'attached', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Executes JavaScript in a specific frame
   */
  static async executeScriptInFrame(
    page: Page,
    frameSelector: string,
    script: string
  ): Promise<any> {
    try {
      const frame = page.frameLocator(frameSelector);
      const body = frame.locator('body');
      await body.waitFor({ state: 'attached', timeout: 10000 });
      
      // Get the frame element and execute script
      const frameElement = page.locator(frameSelector).first();
      return await frameElement.evaluate((frame, script) => {
        const iframe = frame as HTMLIFrameElement;
        if (iframe.contentWindow) {
          return iframe.contentWindow.eval(script);
        }
        return null;
      }, script);
    } catch {
      // Fallback: try to execute in page context
      try {
        return await page.evaluate(script);
      } catch {
        return null;
      }
    }
  }

  /**
   * Switches to frame by index (gets nth iframe)
   */
  static getFrameLocatorByIndex(page: Page, index: number): FrameLocator {
    // In Playwright, we need to get the iframe element first
    const iframe = page.locator('iframe, frame').nth(index);
    // Then create frame locator from it
    // Note: This is a workaround as Playwright doesn't directly support index-based frame locators
    return page.frameLocator(`iframe:nth-of-type(${index + 1}), frame:nth-of-type(${index + 1})`);
  }

  /**
   * Alternative method: Get frame by index using a different approach
   */
  static async getFrameByIndex(page: Page, index: number): Promise<FrameLocator | null> {
    try {
      const frames = await this.getAllFrames(page);
      if (index >= 0 && index < frames.length) {
        const frameId = await frames[index].getAttribute('id');
        const frameName = await frames[index].getAttribute('name');
        
        if (frameId) {
          return page.frameLocator(`#${frameId}`);
        } else if (frameName) {
          return page.frameLocator(`frame[name="${frameName}"], iframe[name="${frameName}"]`);
        } else {
          // Use nth-of-type as fallback
          return page.frameLocator(`iframe:nth-of-type(${index + 1}), frame:nth-of-type(${index + 1})`);
        }
      }
      return null;
    } catch {
      return null;
    }
  }
}

