import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Pattern - File Upload Page (The Internet)
 * Page for file upload
 */
export class FileUploadPage {
  readonly page: Page;
  readonly fileUploadLink: Locator;
  readonly fileInput: Locator;
  readonly uploadButton: Locator;
  readonly uploadedFileName: Locator;
  readonly successMessage: Locator;
  
  private readonly baseUrl: string = 'https://the-internet.herokuapp.com/';

  constructor(page: Page) {
    this.page = page;
    this.fileUploadLink = page.locator('text=File Upload');
    this.fileInput = page.locator('#file-upload');
    this.uploadButton = page.locator('#file-submit');
    this.uploadedFileName = page.locator('#uploaded-files');
    this.successMessage = page.locator('h3');
  }

  /**
   * Navigate to file upload page
   */
  async navigateTo(): Promise<void> {
    await this.page.goto(this.baseUrl);
    await this.fileUploadLink.click();
    await this.waitForPageLoad();
  }

  /**
   * Wait for page to load completely
   */
  async waitForPageLoad(): Promise<void> {
    await expect(this.fileInput).toBeVisible({ timeout: 10000 });
  }

  /**
   * Check if page is loaded
   */
  async isLoaded(): Promise<boolean> {
    try {
      await expect(this.fileInput).toBeVisible({ timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Upload a file
   * 
   * @param filePath - Full path to the file to upload
   * @returns Name of the uploaded file or null if failed
   */
  async uploadFile(filePath: string): Promise<string | null> {
    try {
      // Set file path to input
      await this.fileInput.setInputFiles(filePath);
      
      // Click upload button
      await this.uploadButton.click();
      
      // Wait for upload to complete
      await this.waitForUploadComplete();
      
      // Return uploaded file name
      return await this.getUploadedFileName();
    } catch (error) {
      return null;
    }
  }

  /**
   * Wait for upload to complete
   */
  async waitForUploadComplete(timeout: number = 10000): Promise<void> {
    await expect(this.uploadedFileName).toBeVisible({ timeout });
  }

  /**
   * Get uploaded file name
   */
  async getUploadedFileName(): Promise<string | null> {
    try {
      await expect(this.uploadedFileName).toBeVisible({ timeout: 5000 });
      return await this.uploadedFileName.textContent();
    } catch {
      return null;
    }
  }

  /**
   * Get success message
   */
  async getSuccessMessage(): Promise<string | null> {
    try {
      if (await this.successMessage.isVisible({ timeout: 5000 })) {
        return await this.successMessage.textContent();
      }
      return null;
    } catch {
      return null;
    }
  }

  /**
   * Get current URL
   */
  getCurrentUrl(): string {
    return this.page.url();
  }
}

