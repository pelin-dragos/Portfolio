import { Page, Locator, expect, FrameLocator } from '@playwright/test';

/**
 * Page Object Pattern - Frames Page
 * Represents pages with nested frames for testing
 */
export class FramesPage {
  readonly page: Page;
  
  private readonly baseUrlNestedFrames: string = 'https://the-internet.herokuapp.com/nested_frames';

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToNestedFrames(): Promise<void> {
    await this.page.goto(this.baseUrlNestedFrames);
    await this.page.waitForTimeout(1000);
  }

  /**
   * Switches to top frame
   */
  async switchToTopFrame(): Promise<boolean> {
    try {
      const topFrame = this.page.frameLocator('frame[name="frame-top"]');
      await topFrame.locator('body').waitFor({ state: 'visible', timeout: 10000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Switches to bottom frame
   */
  async switchToBottomFrame(): Promise<boolean> {
    try {
      const bottomFrame = this.page.frameLocator('frame[name="frame-bottom"]');
      await bottomFrame.locator('body').waitFor({ state: 'visible', timeout: 10000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Switches to left frame (nested in top)
   */
  async switchToLeftFrame(): Promise<boolean> {
    try {
      const topFrame = this.page.frameLocator('frame[name="frame-top"]');
      const leftFrame = topFrame.frameLocator('frame[name="frame-left"]');
      await leftFrame.locator('body').waitFor({ state: 'visible', timeout: 10000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Switches to middle frame (nested in top)
   */
  async switchToMiddleFrame(): Promise<boolean> {
    try {
      const topFrame = this.page.frameLocator('frame[name="frame-top"]');
      const middleFrame = topFrame.frameLocator('frame[name="frame-middle"]');
      await middleFrame.locator('body').waitFor({ state: 'visible', timeout: 10000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Switches to right frame (nested in top)
   */
  async switchToRightFrame(): Promise<boolean> {
    try {
      const topFrame = this.page.frameLocator('frame[name="frame-top"]');
      const rightFrame = topFrame.frameLocator('frame[name="frame-right"]');
      await rightFrame.locator('body').waitFor({ state: 'visible', timeout: 10000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Gets text from a specific frame
   */
  async getTextFromFrame(frameName: string): Promise<string | null> {
    try {
      let frame: FrameLocator;
      
      if (frameName === 'bottom') {
        frame = this.page.frameLocator('frame[name="frame-bottom"]');
      } else if (frameName === 'left') {
        const topFrame = this.page.frameLocator('frame[name="frame-top"]');
        frame = topFrame.frameLocator('frame[name="frame-left"]');
      } else if (frameName === 'middle') {
        const topFrame = this.page.frameLocator('frame[name="frame-top"]');
        frame = topFrame.frameLocator('frame[name="frame-middle"]');
      } else if (frameName === 'right') {
        const topFrame = this.page.frameLocator('frame[name="frame-top"]');
        frame = topFrame.frameLocator('frame[name="frame-right"]');
      } else {
        return null;
      }
      
      const body = frame.locator('body');
      await body.waitFor({ state: 'visible', timeout: 10000 });
      return await body.textContent();
    } catch {
      return null;
    }
  }

  /**
   * Switches back to default content
   */
  async switchToDefaultContent(): Promise<boolean> {
    // In Playwright, we're always in default content unless we use frameLocator
    return true;
  }
}

