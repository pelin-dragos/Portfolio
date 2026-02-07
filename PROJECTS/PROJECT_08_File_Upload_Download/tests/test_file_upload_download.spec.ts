import { test, expect } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';
import { FileUploadPage } from '../pages/FileUploadPage';
import { FileDownloadPage } from '../pages/FileDownloadPage';
import { FileUtils } from '../utils/FileUtils';

/**
 * Test Suite: File Upload/Download Testing
 * Tests for file upload and download with automatic verification
 */

// Helper to get test files directory
const getTestFilesDir = () => {
  const testDir = path.join(process.cwd(), 'test_files');
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true });
  }
  return testDir;
};

// Helper to get downloads directory
const getDownloadsDir = () => {
  const downloadsDir = path.join(process.cwd(), 'downloads');
  if (!fs.existsSync(downloadsDir)) {
    fs.mkdirSync(downloadsDir, { recursive: true });
  }
  return downloadsDir;
};

test.describe('File Upload', () => {
  
  test('@upload @critical @smoke should upload text file', async ({ page }) => {
    /**
     * Test: Upload text file (.txt)
     * Steps:
     * 1. Create test file
     * 2. Upload file
     * 3. Verify upload succeeded
     */
    const testFilesDir = getTestFilesDir();
    
    // Create test file
    const testFilePath = FileUtils.createTestFile(
      testFilesDir,
      'test_upload.txt',
      'This is a test file for upload testing.'
    );
    
    // Upload
    const uploadPage = new FileUploadPage(page);
    await uploadPage.navigateTo();
    
    const uploadedFileName = await uploadPage.uploadFile(testFilePath);
    
    // Verifications
    expect(uploadedFileName).toBeTruthy();
    expect(uploadedFileName).toMatch(/test_upload\.txt/);
    
    const successMessage = await uploadPage.getSuccessMessage();
    expect(successMessage).toBeTruthy();
    expect(successMessage).toMatch(/File Uploaded/i);
    
    // Cleanup
    FileUtils.deleteFile(testFilePath);
  });

  test('@upload @regression should upload large file', async ({ page }) => {
    /**
     * Test: Upload large file
     * Verifies that large files can be uploaded
     */
    const testFilesDir = getTestFilesDir();
    
    // Create large file (10 KB)
    const testFilePath = FileUtils.createTestFileWithSize(
      testFilesDir,
      'large_file.txt',
      10
    );
    
    // Upload
    const uploadPage = new FileUploadPage(page);
    await uploadPage.navigateTo();
    
    const uploadedFileName = await uploadPage.uploadFile(testFilePath);
    
    expect(uploadedFileName).toBeTruthy();
    
    // Verify size
    const originalSize = FileUtils.getFileSize(testFilePath);
    expect(originalSize).toBeGreaterThan(0);
    
    // Cleanup
    FileUtils.deleteFile(testFilePath);
  });

  test('@upload @regression @file_management should upload multiple files sequential', async ({ page }) => {
    /**
     * Test: Upload multiple files sequentially
     * Verifies that multiple files can be uploaded one after another
     */
    const testFilesDir = getTestFilesDir();
    const uploadPage = new FileUploadPage(page);
    await uploadPage.navigateTo();
    
    // Create and upload multiple files
    const filesToUpload: string[] = [];
    for (let i = 0; i < 3; i++) {
      const filePath = FileUtils.createTestFile(
        testFilesDir,
        `test_file_${i}.txt`,
        `Content for test file ${i}`
      );
      filesToUpload.push(filePath);
      
      // Upload file
      const uploadedFileName = await uploadPage.uploadFile(filePath);
      expect(uploadedFileName).toBeTruthy();
      
      // Navigate back for next upload
      await uploadPage.navigateTo();
    }
    
    // Cleanup
    for (const filePath of filesToUpload) {
      FileUtils.deleteFile(filePath);
    }
  });

  test('@upload @regression should validate file name after upload', async ({ page }) => {
    /**
     * Test: Validate file name after upload
     * Verifies that file name is correct after upload
     */
    const testFilesDir = getTestFilesDir();
    
    const testFilePath = FileUtils.createTestFile(
      testFilesDir,
      'validation_test.txt',
      'Content for validation'
    );
    
    const uploadPage = new FileUploadPage(page);
    await uploadPage.navigateTo();
    
    const uploadedFileName = await uploadPage.uploadFile(testFilePath);
    
    // Verify file name is correct
    expect(uploadedFileName).toBeTruthy();
    expect(uploadedFileName).toMatch(/validation_test\.txt/);
    
    // Cleanup
    FileUtils.deleteFile(testFilePath);
  });

  test('@upload @regression should validate success message', async ({ page }) => {
    /**
     * Test: Validate success message
     * Verifies that success message is displayed correctly
     */
    const testFilesDir = getTestFilesDir();
    
    const testFilePath = FileUtils.createTestFile(
      testFilesDir,
      'success_test.txt',
      'Content for success test'
    );
    
    const uploadPage = new FileUploadPage(page);
    await uploadPage.navigateTo();
    
    await uploadPage.uploadFile(testFilePath);
    
    // Verify success message
    const successMessage = await uploadPage.getSuccessMessage();
    expect(successMessage).toBeTruthy();
    expect(successMessage).toMatch(/File Uploaded/i);
    
    // Cleanup
    FileUtils.deleteFile(testFilePath);
  });
});

test.describe('File Download', () => {
  
  test('@download @critical @smoke should download file', async ({ page }) => {
    /**
     * Test: Download file
     * Steps:
     * 1. Navigate to download page
     * 2. Download a file
     * 3. Verify file was downloaded
     */
    const downloadsDir = getDownloadsDir();
    
    const downloadPage = new FileDownloadPage(page);
    await downloadPage.navigateTo();
    
    // Get list of files
    const links = await downloadPage.getDownloadLinks();
    expect(links.length).toBeGreaterThan(0);
    
    // Get file name before download
    const firstLink = links[0];
    const downloadedFileName = await firstLink.textContent();
    expect(downloadedFileName).toBeTruthy();
    
    // Use Playwright's download event
    const downloadPromise = page.waitForEvent('download');
    await firstLink.click();
    const download = await downloadPromise;
    
    // Save file to downloads directory
    const expectedFilePath = path.join(downloadsDir, downloadedFileName!.trim());
    await download.saveAs(expectedFilePath);
    
    // Wait for file to be saved
    const isDownloaded = await FileUtils.waitForFileDownload(expectedFilePath, 30000);
    expect(isDownloaded).toBeTruthy();
    
    // Verify size
    const fileSize = FileUtils.getFileSize(expectedFilePath);
    expect(fileSize).toBeGreaterThan(0);
  });

  test('@download @regression should download multiple files', async ({ page }) => {
    /**
     * Test: Download multiple files
     * Verifies that multiple files can be downloaded
     */
    const downloadsDir = getDownloadsDir();
    
    const downloadPage = new FileDownloadPage(page);
    await downloadPage.navigateTo();
    
    const links = await downloadPage.getDownloadLinks();
    expect(links.length).toBeGreaterThanOrEqual(2);
    
    // Download first 2 files
    const downloadedFiles: string[] = [];
    for (let i = 0; i < Math.min(2, links.length); i++) {
      const link = links[i];
      const fileName = await link.textContent();
      if (fileName) {
        downloadedFiles.push(fileName.trim());
        
        // Use Playwright's download event
        const downloadPromise = page.waitForEvent('download');
        await link.click();
        const download = await downloadPromise;
        
        // Save file
        const expectedFilePath = path.join(downloadsDir, fileName.trim());
        await download.saveAs(expectedFilePath);
        
        await page.waitForTimeout(1000); // Pause between downloads
      }
    }
    
    // Wait for all files to be downloaded
    for (const fileName of downloadedFiles) {
      const expectedFilePath = path.join(downloadsDir, fileName);
      const isDownloaded = await FileUtils.waitForFileDownload(expectedFilePath, 30000);
      expect(isDownloaded).toBeTruthy();
    }
  });

  test('@download @regression @file_management should validate downloaded file', async ({ page }) => {
    /**
     * Test: Validate downloaded file
     * Verifies that downloaded file is correct
     */
    const downloadsDir = getDownloadsDir();
    
    const downloadPage = new FileDownloadPage(page);
    await downloadPage.navigateTo();
    
    // Get first link
    const links = await downloadPage.getDownloadLinks();
    expect(links.length).toBeGreaterThan(0);
    
    const firstLink = links[0];
    const downloadedFileName = await firstLink.textContent();
    expect(downloadedFileName).toBeTruthy();
    
    // Use Playwright's download event
    const downloadPromise = page.waitForEvent('download');
    await firstLink.click();
    const download = await downloadPromise;
    
    // Save file
    const expectedFilePath = path.join(downloadsDir, downloadedFileName!.trim());
    await download.saveAs(expectedFilePath);
    
    const isDownloaded = await FileUtils.waitForFileDownload(expectedFilePath, 30000);
    expect(isDownloaded).toBeTruthy();
    
    // Verify file exists and is not empty
    expect(fs.existsSync(expectedFilePath)).toBeTruthy();
    const fileSize = FileUtils.getFileSize(expectedFilePath);
    expect(fileSize).toBeGreaterThan(0);
  });
});

test.describe('File Management', () => {
  
  test('@file_management @regression should create and delete files', async () => {
    /**
     * Test: FileUtils - create and delete files
     * Verifies FileUtils functionality
     */
    const testFilesDir = getTestFilesDir();
    
    // Create file
    const testFilePath = FileUtils.createTestFile(
      testFilesDir,
      'utils_test.txt',
      'Test content'
    );
    
    expect(fs.existsSync(testFilePath)).toBeTruthy();
    
    // Verify content
    const content = FileUtils.readFileContent(testFilePath);
    expect(content).toBe('Test content');
    
    // Delete file
    const deleted = FileUtils.deleteFile(testFilePath);
    expect(deleted).toBeTruthy();
    expect(fs.existsSync(testFilePath)).toBeFalsy();
  });

  test('@file_management @regression should verify file size', async () => {
    /**
     * Test: FileUtils - verify file size
     * Verifies that file size is calculated correctly
     */
    const testFilesDir = getTestFilesDir();
    
    // Create file with specific size
    const testFilePath = FileUtils.createTestFileWithSize(
      testFilesDir,
      'size_test.txt',
      5
    );
    
    const fileSize = FileUtils.getFileSize(testFilePath);
    const expectedSize = 5 * 1024; // 5 KB in bytes
    
    expect(fileSize).toBe(expectedSize);
    
    // Cleanup
    FileUtils.deleteFile(testFilePath);
  });
});

