import { Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

/**
 * VisualComparator - Utility for visual regression testing
 * Wrapper around Playwright's built-in screenshot comparison
 */
export class VisualComparator {
  private baselineDir: string = 'baselines';
  private screenshotsDir: string = 'screenshots';
  private diffsDir: string = 'diffs';

  constructor() {
    // Ensure directories exist
    [this.baselineDir, this.screenshotsDir, this.diffsDir].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  /**
   * Get baseline path for a test
   * @param testName - Name of the test
   * @param browserName - Name of the browser
   * @returns Path to baseline image
   */
  getBaselinePath(testName: string, browserName: string = 'chromium'): string {
    const filename = `${testName.replace(/\s+/g, '_')}_${browserName}.png`;
    return path.join(this.baselineDir, filename);
  }

  /**
   * Get screenshot path for a test
   * @param testName - Name of the test
   * @param browserName - Name of the browser
   * @returns Path to screenshot
   */
  getScreenshotPath(testName: string, browserName: string = 'chromium'): string {
    const filename = `${testName.replace(/\s+/g, '_')}_${browserName}.png`;
    return path.join(this.screenshotsDir, filename);
  }

  /**
   * Check if baseline exists
   * @param testName - Name of the test
   * @param browserName - Name of the browser
   * @returns True if baseline exists
   */
  baselineExists(testName: string, browserName: string = 'chromium'): boolean {
    const baselinePath = this.getBaselinePath(testName, browserName);
    return fs.existsSync(baselinePath);
  }

  /**
   * Save baseline screenshot
   * @param page - Playwright page
   * @param testName - Name of the test
   * @param browserName - Name of the browser
   */
  async saveBaseline(page: Page, testName: string, browserName: string = 'chromium'): Promise<void> {
    const baselinePath = this.getBaselinePath(testName, browserName);
    await page.screenshot({ path: baselinePath, fullPage: true });
  }

  /**
   * Note: For actual visual comparison, use Playwright's expect(page).toHaveScreenshot() directly in tests
   * This utility class provides helper methods for baseline management only
   */
}

// Note: In actual tests, we'll use Playwright's expect(page).toHaveScreenshot() directly
// This utility class provides helper methods for baseline management
