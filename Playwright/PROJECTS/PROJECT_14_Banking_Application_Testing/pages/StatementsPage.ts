/**
 * Page Object Pattern - Account Statements/Activity Page
 * For checking transactions and statements
 */
import { Page, Locator } from '@playwright/test';

export interface TransactionDetails {
  date: string;
  description: string;
  amount: string;
  balance: string;
}

export class StatementsPage {
  readonly page: Page;
  readonly statementsContainer: Locator;
  readonly accountTitle: Locator;
  readonly transactionsTable: Locator;
  readonly transactionRows: Locator;
  readonly noTransactionsMessage: Locator;
  readonly accountBalance: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Locators - adapted for ParaBank
    this.statementsContainer = page.locator('#rightPanel');
    this.accountTitle = page.locator('h1.title');
    this.transactionsTable = page.locator('table#transactionTable');
    this.transactionRows = page.locator('table#transactionTable tr');
    this.noTransactionsMessage = page.locator('.ng-scope p');
    this.accountBalance = page.locator('td.ng-binding');
  }

  /**
   * Wait for statements page to load
   */
  async waitForPageLoad(): Promise<void> {
    try {
      await this.statementsContainer.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(1000);
    } catch (error) {
      throw new Error('Statements page did not load properly');
    }
  }

  /**
   * Check if statements page is loaded
   */
  async isLoaded(): Promise<boolean> {
    try {
      return await this.statementsContainer.isVisible({ timeout: 5000 });
    } catch {
      return false;
    }
  }

  /**
   * Get account title (Account #...)
   * 
   * @returns Account title
   */
  async getAccountTitle(): Promise<string> {
    try {
      return await this.accountTitle.textContent() || '';
    } catch {
      return '';
    }
  }

  /**
   * Get number of transactions
   * 
   * @returns Number of transactions
   */
  async getTransactionsCount(): Promise<number> {
    try {
      const rows = await this.transactionRows.all();
      // First row is header, rest are transactions
      return Math.max(0, rows.length - 1);
    } catch {
      // Check if "No transactions" message exists
      if (await this.noTransactionsMessage.isVisible({ timeout: 2000 }).catch(() => false)) {
        return 0;
      }
      return 0;
    }
  }

  /**
   * Get account balance
   * 
   * @returns Balance or null if not found
   */
  async getAccountBalance(): Promise<number | null> {
    try {
      // For ParaBank, balance can be in different places
      const balanceElements = await this.accountBalance.all();
      for (const element of balanceElements) {
        const text = await element.textContent();
        if (text && text.includes('$')) {
          const balanceText = text.replace('$', '').replace(',', '').trim();
          try {
            return parseFloat(balanceText);
          } catch {
            continue;
          }
        }
      }
      return null;
    } catch {
      return null;
    }
  }

  /**
   * Check if transactions exist
   * 
   * @returns True if transactions exist
   */
  async hasTransactions(): Promise<boolean> {
    return await this.getTransactionsCount() > 0;
  }

  /**
   * Get transaction details
   * 
   * @param index Transaction index (default: 0 - first transaction)
   * @returns Transaction details or null
   */
  async getTransactionDetails(index: number = 0): Promise<TransactionDetails | null> {
    try {
      const rows = await this.transactionRows.all();
      // First row is header
      if (index + 1 < rows.length) {
        const row = rows[index + 1];
        const cells = await row.locator('td').all();
        
        if (cells.length >= 4) {
          return {
            date: await cells[0].textContent() || '',
            description: await cells[1].textContent() || '',
            amount: await cells[2].textContent() || '',
            balance: await cells[3].textContent() || ''
          };
        }
      }
      return null;
    } catch {
      return null;
    }
  }

  /**
   * Check if account number is displayed
   * 
   * @param accountNumber Account number to check
   * @returns True if account number is displayed
   */
  async isAccountNumberDisplayed(accountNumber: string): Promise<boolean> {
    const accountTitle = await this.getAccountTitle();
    const pageContent = await this.page.content();
    return accountTitle.includes(accountNumber) || pageContent.includes(accountNumber);
  }
}

