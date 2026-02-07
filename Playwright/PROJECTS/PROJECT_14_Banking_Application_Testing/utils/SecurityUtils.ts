/**
 * Utilities for secure credential management and sensitive data handling
 */
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export interface BankingCredentials {
  username: string | undefined;
  password: string | undefined;
  url: string;
}

export class SecurityUtils {
  /**
   * Returns banking username from environment variables
   * 
   * @returns Username or undefined if not set
   * 
   * ⚠️ SECURITY: DO NOT hardcode credentials! Use .env file!
   */
  static getBankingUsername(): string | undefined {
    const username = process.env.BANKING_USERNAME;
    
    if (!username) {
      console.warn('BANKING_USERNAME not found in environment variables!');
      console.warn('Create a .env file with BANKING_USERNAME');
      return undefined;
    }
    
    return username;
  }

  /**
   * Returns banking password from environment variables
   * 
   * @returns Password or undefined if not set
   * 
   * ⚠️ SECURITY: DO NOT hardcode credentials! Use .env file!
   */
  static getBankingPassword(): string | undefined {
    const password = process.env.BANKING_PASSWORD;
    
    if (!password) {
      console.warn('BANKING_PASSWORD not found in environment variables!');
      console.warn('Create a .env file with BANKING_PASSWORD');
      return undefined;
    }
    
    return password;
  }

  /**
   * Returns banking application URL from environment variables
   * 
   * @returns URL or default ParaBank URL
   */
  static getBankingUrl(): string {
    return process.env.BANKING_URL || 'https://parabank.parasoft.com/parabank/index.htm';
  }

  /**
   * Returns a dict with banking credentials
   * 
   * @returns Object with username, password, and url
   */
  static getCredentials(): BankingCredentials {
    return {
      username: SecurityUtils.getBankingUsername(),
      password: SecurityUtils.getBankingPassword(),
      url: SecurityUtils.getBankingUrl()
    };
  }

  /**
   * Validates that credentials are set
   * 
   * @returns True if credentials are valid
   */
  static validateCredentials(): boolean {
    const username = SecurityUtils.getBankingUsername();
    const password = SecurityUtils.getBankingPassword();
    
    if (!username || !password) {
      console.error('Banking credentials are not set!');
      console.error('Please create a .env file with BANKING_USERNAME and BANKING_PASSWORD');
      return false;
    }
    
    return true;
  }

  /**
   * Masks sensitive data (e.g., password, card number)
   * 
   * @param text Text to mask
   * @param visibleChars Number of visible characters at the start (default: 4)
   * @returns Masked text
   */
  static maskSensitiveData(text: string | undefined, visibleChars: number = 4): string {
    if (!text || text.length <= visibleChars) {
      return text ? '*'.repeat(text.length) : '';
    }
    
    return text.substring(0, visibleChars) + '*'.repeat(text.length - visibleChars);
  }

  /**
   * Logs credentials in a secure way (masks password)
   * 
   * @param credentials Credentials object
   * @returns Masked string for logging
   */
  static safeLogCredentials(credentials: BankingCredentials): string {
    const username = credentials.username || 'N/A';
    const password = credentials.password || 'N/A';
    const url = credentials.url || 'N/A';
    
    const maskedPassword = SecurityUtils.maskSensitiveData(password);
    
    return `Username: ${username}, Password: ${maskedPassword}, URL: ${url}`;
  }
}

