/**
 * CommonHelpers - Utility functions
 * Reusable helper methods
 */
export class CommonHelpers {
  /**
   * Generate random string
   * @param length - Length of string
   * @returns Random string
   */
  static generateRandomString(length: number = 10): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Generate random email
   * @param domain - Email domain
   * @returns Random email
   */
  static generateRandomEmail(domain: string = 'example.com'): string {
    const randomPart = this.generateRandomString(8);
    return `test_${randomPart}@${domain}`;
  }

  /**
   * Format duration in seconds to readable string
   * @param seconds - Duration in seconds
   * @returns Formatted duration string
   */
  static formatDuration(seconds: number): string {
    if (seconds < 60) {
      return `${seconds.toFixed(2)}s`;
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds.toFixed(2)}s`;
  }

  /**
   * Get current timestamp
   * @returns Timestamp string
   */
  static getTimestamp(): string {
    return new Date().toISOString();
  }

  /**
   * Wait for a specified time
   * @param ms - Milliseconds to wait
   */
  static async wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Retry a function
   * @param fn - Function to retry
   * @param maxRetries - Maximum number of retries
   * @param delay - Delay between retries in ms
   * @returns Function result
   */
  static async retry<T>(
    fn: () => Promise<T>,
    maxRetries: number = 3,
    delay: number = 1000
  ): Promise<T> {
    let lastError: Error;
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error as Error;
        if (i < maxRetries - 1) {
          await this.wait(delay);
        }
      }
    }
    throw lastError!;
  }
}
