import * as fs from 'fs';
import * as path from 'path';

/**
 * ConfigManager - Singleton Pattern
 * Manages configuration from environment variables and defaults
 */
export class ConfigManager {
  private static instance: ConfigManager;
  private config: Map<string, string> = new Map();

  private constructor() {
    this.loadDefaults();
    this.loadFromEnv();
  }

  /**
   * Get singleton instance
   * @returns ConfigManager instance
   */
  static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  /**
   * Load default configuration
   */
  private loadDefaults(): void {
    this.config.set('browser', 'chrome');
    this.config.set('headless', 'true');
    this.config.set('baseUrl', 'https://www.saucedemo.com');
    this.config.set('timeout', '30000');
    this.config.set('screenshot', 'on-failure');
  }

  /**
   * Load configuration from environment variables
   */
  private loadFromEnv(): void {
    if (process.env.BROWSER) {
      this.config.set('browser', process.env.BROWSER);
    }
    if (process.env.HEADLESS) {
      this.config.set('headless', process.env.HEADLESS);
    }
    if (process.env.BASE_URL) {
      this.config.set('baseUrl', process.env.BASE_URL);
    }
    if (process.env.TIMEOUT) {
      this.config.set('timeout', process.env.TIMEOUT);
    }
  }

  /**
   * Get configuration value
   * @param key - Configuration key
   * @param defaultValue - Default value if key not found
   * @returns Configuration value
   */
  get(key: string, defaultValue: string = ''): string {
    return this.config.get(key) || defaultValue;
  }

  /**
   * Set configuration value
   * @param key - Configuration key
   * @param value - Configuration value
   */
  set(key: string, value: string): void {
    this.config.set(key, value);
  }

  /**
   * Get browser type
   * @returns Browser type
   */
  getBrowser(): string {
    return this.get('browser', 'chrome');
  }

  /**
   * Get headless mode
   * @returns True if headless
   */
  isHeadless(): boolean {
    return this.get('headless', 'true') === 'true';
  }

  /**
   * Get base URL
   * @returns Base URL
   */
  getBaseUrl(): string {
    return this.get('baseUrl', 'https://www.saucedemo.com');
  }

  /**
   * Get timeout
   * @returns Timeout in milliseconds
   */
  getTimeout(): number {
    return parseInt(this.get('timeout', '30000'), 10);
  }
}
