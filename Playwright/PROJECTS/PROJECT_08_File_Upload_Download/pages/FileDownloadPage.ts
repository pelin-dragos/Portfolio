import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Pattern - File Download Page (The Internet)
 * Page for file download
 */
export class FileDownloadPage {
  readonly page: Page;
  readonly fileDownloadLink: Locator;
  readonly downloadLinks: Locator;
  
  private readonly baseUrl: string = 'https://the-internet.herokuapp.com/';

  constructor(page: Page) {
    this.page = page;
    this.fileDownloadLink = page.getByRole('link', { name: /File Download/i });
    this.downloadLinks = page.locator('#content .example a');
  }

  /**
   * Navigate to file download page
   */
  async navigateTo(): Promise<void> {
    await this.page.goto(this.baseUrl);
    // Try multiple ways to find the link
    try {
      await this.fileDownloadLink.click({ timeout: 5000 });
    } catch {
      // Fallback to direct link
      await this.page.goto('https://the-internet.herokuapp.com/download');
    }
    await this.waitForPageLoad();
  }

  /**
   * Wait for page to load completely
   */
  async waitForPageLoad(): Promise<void> {
    await expect(this.downloadLinks.first()).toBeVisible({ timeout: 10000 });
  }

  /**
   * Check if page is loaded
   */
  async isLoaded(): Promise<boolean> {
    try {
      await expect(this.downloadLinks.first()).toBeVisible({ timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get list of download links
   */
  async getDownloadLinks(): Promise<Locator[]> {
    const count = await this.downloadLinks.count();
    const links: Locator[] = [];
    for (let i = 0; i < count; i++) {
      links.push(this.downloadLinks.nth(i));
    }
    return links;
  }

  /**
   * Download a file by index
   * Note: This method returns the file name. The actual download should be handled
   * using page.waitForEvent('download') in the test.
   * 
   * @param index - Index of the download link (default: 0)
   * @returns Name of the file to download or null if failed
   */
  async downloadFileByIndex(index: number = 0): Promise<string | null> {
    try {
      const links = await this.getDownloadLinks();
      if (index < links.length) {
        const fileName = await links[index].textContent();
        return fileName ? fileName.trim() : null;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Download a file by name
   * 
   * @param fileName - Name of the file to download
   * @returns True if file was found and downloaded
   */
  async downloadFileByName(fileName: string): Promise<boolean> {
    try {
      const links = await this.getDownloadLinks();
      for (const link of links) {
        const linkText = await link.textContent();
        if (linkText && linkText.trim() === fileName) {
          const downloadPromise = this.page.waitForEvent('download');
          await link.click();
          await downloadPromise;
          return true;
        }
      }
      return false;
    } catch {
      return false;
    }
  }

  /**
   * Get current URL
   */
  getCurrentUrl(): string {
    return this.page.url();
  }
}

