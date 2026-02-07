/**
 * Utilities for human-like behavior in automation
 * Helps avoid bot detection
 */
import { Page } from '@playwright/test';

export class HumanBehavior {
  /**
   * Human delay with random time between min and max seconds
   * 
   * @param minSeconds Minimum time in seconds (default: 1.0)
   * @param maxSeconds Maximum time in seconds (default: 3.0)
   * @returns The actual delay time
   */
  static async randomDelay(minSeconds: number = 1.0, maxSeconds: number = 3.0): Promise<number> {
    const delayTime = Math.random() * (maxSeconds - minSeconds) + minSeconds;
    await new Promise(resolve => setTimeout(resolve, delayTime * 1000));
    return delayTime;
  }

  /**
   * Type text into an element character by character, like a human
   * 
   * @param page Playwright Page instance
   * @param locator Locator for the element
   * @param text Text to type
   * @param typingSpeedMin Minimum typing speed (seconds between characters)
   * @param typingSpeedMax Maximum typing speed (seconds between characters)
   */
  static async humanType(
    page: Page,
    locator: string,
    text: string,
    typingSpeedMin: number = 0.05,
    typingSpeedMax: number = 0.2
  ): Promise<void> {
    await page.locator(locator).click();
    await this.randomDelay(0.3, 0.7);
    
    for (const char of text) {
      await page.locator(locator).type(char, { delay: Math.random() * (typingSpeedMax - typingSpeedMin) + typingSpeedMin });
    }
    
    await this.randomDelay(0.2, 0.5);
  }

  /**
   * Human click on an element with mouse movement
   * 
   * @param page Playwright Page instance
   * @param locator Locator for the element
   */
  static async humanClick(page: Page, locator: string): Promise<void> {
    const element = page.locator(locator);
    await element.hover();
    await this.randomDelay(0.3, 0.8);
    await element.click();
    await this.randomDelay(0.5, 1.2);
  }

  /**
   * Human scroll in page
   * 
   * @param page Playwright Page instance
   * @param pixels Number of pixels to scroll (if null, random scroll)
   * @param direction Scroll direction ("up" or "down")
   */
  static async humanScroll(page: Page, pixels: number | null = null, direction: string = "down"): Promise<void> {
    if (pixels === null) {
      pixels = Math.floor(Math.random() * 500) + 300; // 300-800 pixels
    }
    
    const scrollValue = direction === "down" ? pixels : -pixels;
    await page.evaluate((value) => {
      window.scrollBy(0, value);
    }, scrollValue);
    
    await this.randomDelay(0.8, 1.5);
  }

  /**
   * Random mouse movement to simulate human activity
   * 
   * @param page Playwright Page instance
   */
  static async randomMouseMovement(page: Page): Promise<void> {
    const xOffset = Math.floor(Math.random() * 200) - 100; // -100 to 100
    const yOffset = Math.floor(Math.random() * 200) - 100; // -100 to 100
    
    await page.mouse.move(xOffset, yOffset);
    await this.randomDelay(0.3, 0.7);
    
    await page.mouse.move(-xOffset, -yOffset);
  }

  /**
   * Wait for an element with human delay after it appears
   * 
   * @param page Playwright Page instance
   * @param locator Locator for the element
   * @param timeout Timeout in milliseconds
   * @param minDelay Minimum delay after element appears
   * @param maxDelay Maximum delay after element appears
   */
  static async waitForElementHuman(
    page: Page,
    locator: string,
    timeout: number = 10000,
    minDelay: number = 0.5,
    maxDelay: number = 1.5
  ): Promise<void> {
    await page.locator(locator).waitFor({ state: 'visible', timeout });
    await this.randomDelay(minDelay, maxDelay);
  }

  /**
   * Scroll to an element in a human way (not direct)
   * 
   * @param page Playwright Page instance
   * @param locator Locator for the element
   */
  static async scrollToElementHuman(page: Page, locator: string): Promise<void> {
    await page.locator(locator).scrollIntoViewIfNeeded();
    await this.randomDelay(1.0, 2.0);
  }

  /**
   * Calculate simulated reading time for a text
   * 
   * @param textLength Length of text in characters
   * @returns Simulated reading time in seconds
   */
  static readTimeSimulation(textLength: number): number {
    // Average reading speed: ~200-300 words/minute
    // ~5 characters/word => ~1000-1500 characters/minute
    // ~16.67-25 characters/second
    
    const readingSpeed = Math.random() * 10 + 15; // 15-25 characters/second
    let readingTime = textLength / readingSpeed;
    
    // Add randomness
    readingTime *= Math.random() * 0.7 + 0.8; // 0.8-1.5
    
    return readingTime;
  }

  /**
   * Delay for simulating human thinking time
   */
  static async thinkDelay(): Promise<void> {
    await this.randomDelay(0.5, 2.0);
  }
}

