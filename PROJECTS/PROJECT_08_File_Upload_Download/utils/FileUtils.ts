import * as fs from 'fs';
import * as path from 'path';

/**
 * File Utilities for test file management
 * Functions for creating, verifying, and deleting test files
 */
export class FileUtils {
  /**
   * Create a test file
   * 
   * @param directory - Directory where to create the file
   * @param filename - Name of the file
   * @param content - Content of the file (default: "Test content")
   * @returns Full path to the created file
   */
  static createTestFile(directory: string, filename: string, content: string = 'Test content'): string {
    // Create directory if it doesn't exist
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
    
    const filePath = path.join(directory, filename);
    
    // Write content to file
    fs.writeFileSync(filePath, content, 'utf-8');
    
    return filePath;
  }

  /**
   * Create a test file with specific size
   * 
   * @param directory - Directory where to create the file
   * @param filename - Name of the file
   * @param sizeKb - Size in KB (default: 1 KB)
   * @returns Full path to the created file
   */
  static createTestFileWithSize(directory: string, filename: string, sizeKb: number = 1): string {
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
    
    const filePath = path.join(directory, filename);
    
    // Create content of specific size
    const content = 'A'.repeat(sizeKb * 1024);
    
    fs.writeFileSync(filePath, content, 'utf-8');
    
    return filePath;
  }

  /**
   * Wait for a file to be downloaded completely
   * 
   * @param filePath - Path to the expected file
   * @param timeout - Timeout in milliseconds (default: 30000)
   * @param checkInterval - Check interval in milliseconds (default: 500)
   * @returns True if file is downloaded, false if timeout
   */
  static async waitForFileDownload(
    filePath: string,
    timeout: number = 30000,
    checkInterval: number = 500
  ): Promise<boolean> {
    const startTime = Date.now();
    
    while (Date.now() - startTime < timeout) {
      if (fs.existsSync(filePath)) {
        // Check that file is not being downloaded (no .crdownload extension for Chrome)
        if (!filePath.endsWith('.crdownload')) {
          // Check that file is not empty
          const stats = fs.statSync(filePath);
          if (stats.size > 0) {
            // Wait a bit to ensure download is complete
            await new Promise(resolve => setTimeout(resolve, 500));
            return true;
          }
        }
      }
      
      await new Promise(resolve => setTimeout(resolve, checkInterval));
    }
    
    return false;
  }

  /**
   * Get file size in bytes
   * 
   * @param filePath - Path to the file
   * @returns File size in bytes, or 0 if file doesn't exist
   */
  static getFileSize(filePath: string): number {
    try {
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        return stats.size;
      }
      return 0;
    } catch {
      return 0;
    }
  }

  /**
   * Read file content
   * 
   * @param filePath - Path to the file
   * @returns File content as string, or null if file doesn't exist
   */
  static readFileContent(filePath: string): string | null {
    try {
      if (fs.existsSync(filePath)) {
        return fs.readFileSync(filePath, 'utf-8');
      }
      return null;
    } catch {
      return null;
    }
  }

  /**
   * Delete a file
   * 
   * @param filePath - Path to the file to delete
   * @returns True if file was deleted, false otherwise
   */
  static deleteFile(filePath: string): boolean {
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  /**
   * Cleanup a directory (remove all files)
   * 
   * @param directory - Directory to cleanup
   * @returns True if cleanup was successful
   */
  static cleanupDirectory(directory: string): boolean {
    try {
      if (fs.existsSync(directory)) {
        const files = fs.readdirSync(directory);
        for (const file of files) {
          const filePath = path.join(directory, file);
          const stats = fs.statSync(filePath);
          if (stats.isFile()) {
            fs.unlinkSync(filePath);
          } else if (stats.isDirectory()) {
            this.cleanupDirectory(filePath);
            fs.rmdirSync(filePath);
          }
        }
        return true;
      }
      return true; // Directory doesn't exist, consider it cleaned
    } catch {
      return false;
    }
  }

  /**
   * Verify if two files match
   * 
   * @param filePath1 - Path to first file
   * @param filePath2 - Path to second file
   * @returns True if files match, false otherwise
   */
  static verifyFilesMatch(filePath1: string, filePath2: string): boolean {
    try {
      const content1 = this.readFileContent(filePath1);
      const content2 = this.readFileContent(filePath2);
      
      if (content1 === null || content2 === null) {
        return false;
      }
      
      return content1 === content2;
    } catch {
      return false;
    }
  }

  /**
   * Get list of downloaded files in a directory
   * 
   * @param directory - Directory to check
   * @returns Array of file names
   */
  static getDownloadedFiles(directory: string): string[] {
    try {
      if (fs.existsSync(directory)) {
        return fs.readdirSync(directory).filter(file => {
          const filePath = path.join(directory, file);
          const stats = fs.statSync(filePath);
          return stats.isFile();
        });
      }
      return [];
    } catch {
      return [];
    }
  }
}

