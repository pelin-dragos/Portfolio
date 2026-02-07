import * as fs from 'fs';
import * as path from 'path';

/**
 * Logger - Singleton Pattern
 * Centralized logging system
 */
export class Logger {
  private static instance: Logger;
  private logDir: string = 'logs';
  private logFile: string = 'test.log';

  private constructor() {
    // Ensure log directory exists
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  /**
   * Get singleton instance
   * @returns Logger instance
   */
  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  /**
   * Log info message
   * @param message - Message to log
   */
  info(message: string): void {
    this.log('INFO', message);
  }

  /**
   * Log debug message
   * @param message - Message to log
   */
  debug(message: string): void {
    this.log('DEBUG', message);
  }

  /**
   * Log warning message
   * @param message - Message to log
   */
  warn(message: string): void {
    this.log('WARN', message);
  }

  /**
   * Log error message
   * @param message - Message to log
   */
  error(message: string): void {
    this.log('ERROR', message);
  }

  /**
   * Internal log method
   * @param level - Log level
   * @param message - Message to log
   */
  private log(level: string, message: string): void {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level}] ${message}`;
    
    // Console output
    console.log(logMessage);
    
    // File output
    const logPath = path.join(this.logDir, this.logFile);
    fs.appendFileSync(logPath, logMessage + '\n');
  }

  /**
   * Clear log file
   */
  clearLogs(): void {
    const logPath = path.join(this.logDir, this.logFile);
    if (fs.existsSync(logPath)) {
      fs.unlinkSync(logPath);
    }
  }
}
