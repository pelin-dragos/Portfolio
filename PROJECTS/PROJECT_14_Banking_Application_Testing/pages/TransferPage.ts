/**
 * Page Object Pattern - Transfer Funds Page
 * For transferring funds between accounts
 */
import { Page, Locator } from '@playwright/test';

export class TransferPage {
  readonly page: Page;
  readonly transferAmountInput: Locator;
  readonly fromAccountDropdown: Locator;
  readonly toAccountDropdown: Locator;
  readonly transferButton: Locator;
  readonly successMessage: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Locators - adapted for ParaBank
    this.transferAmountInput = page.locator('#amount');
    this.fromAccountDropdown = page.locator('#fromAccountId');
    this.toAccountDropdown = page.locator('#toAccountId');
    this.transferButton = page.locator('input[value="Transfer"]');
    this.successMessage = page.locator('.title');
    this.errorMessage = page.locator('.error');
  }

  /**
   * Wait for transfer page to load
   */
  async waitForPageLoad(): Promise<void> {
    try {
      await this.transferAmountInput.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error('Transfer page did not load properly');
    }
  }

  /**
   * Check if transfer page is loaded
   */
  async isLoaded(): Promise<boolean> {
    try {
      return await this.transferAmountInput.isVisible({ timeout: 5000 });
    } catch {
      return false;
    }
  }

  /**
   * Enter transfer amount
   * 
   * @param amount Amount (number or string)
   */
  async enterAmount(amount: number | string): Promise<void> {
    await this.transferAmountInput.waitFor({ state: 'visible' });
    await this.transferAmountInput.fill(String(amount));
  }

  /**
   * Select from account
   * 
   * @param accountNumber Account number or index (0 for first)
   */
  async selectFromAccount(accountNumber: number | string): Promise<void> {
    await this.fromAccountDropdown.waitFor({ state: 'visible' });
    
    // Use index if it's a number, otherwise try by value
    if (typeof accountNumber === 'number') {
      await this.fromAccountDropdown.selectOption({ index: accountNumber });
    } else {
      // Try by value first, then by label
      try {
        await this.fromAccountDropdown.selectOption({ value: String(accountNumber) });
      } catch {
        await this.fromAccountDropdown.selectOption({ label: String(accountNumber) });
      }
    }
    
    await this.page.waitForTimeout(300);
  }

  /**
   * Select to account
   * 
   * @param accountNumber Account number or index (0 for first)
   */
  async selectToAccount(accountNumber: number | string): Promise<void> {
    await this.toAccountDropdown.waitFor({ state: 'visible' });
    
    // Use index if it's a number, otherwise try by value
    if (typeof accountNumber === 'number') {
      await this.toAccountDropdown.selectOption({ index: accountNumber });
    } else {
      // Try by value first, then by label
      try {
        await this.toAccountDropdown.selectOption({ value: String(accountNumber) });
      } catch {
        await this.toAccountDropdown.selectOption({ label: String(accountNumber) });
      }
    }
    
    await this.page.waitForTimeout(300);
  }

  /**
   * Click transfer button
   */
  async clickTransferButton(): Promise<void> {
    await this.transferButton.waitFor({ state: 'visible' });
    await this.transferButton.click();
    await this.page.waitForTimeout(2000); // Delay for processing
  }

  /**
   * Transfer funds between accounts
   * 
   * @param amount Amount to transfer
   * @param fromAccount Source account (number or index)
   * @param toAccount Destination account (number or index)
   * @returns True if transfer succeeded
   */
  async transferFunds(amount: number, fromAccount: number | string, toAccount: number | string): Promise<boolean> {
    await this.waitForPageLoad();
    
    // Enter amount
    await this.enterAmount(amount);
    await this.page.waitForTimeout(300);
    
    // Select from account
    await this.selectFromAccount(fromAccount);
    await this.page.waitForTimeout(300);
    
    // Select to account
    await this.selectToAccount(toAccount);
    await this.page.waitForTimeout(300);
    
    // Click transfer
    await this.clickTransferButton();
    
    // Wait a bit for page to process
    await this.page.waitForTimeout(1000);
    
    // Check if transfer failed (non-blocking check)
    try {
      if (await this.errorMessage.isVisible({ timeout: 2000 })) {
        const errorMsg = await this.errorMessage.textContent();
        throw new Error(`Transfer failed: ${errorMsg}`);
      }
    } catch (error) {
      // If it's our error, rethrow it
      if (error instanceof Error && error.message.includes('Transfer failed')) {
        throw error;
      }
      // Otherwise, ignore timeout errors - transfer might have succeeded
    }
    
    return true;
  }

  /**
   * Get success message (if exists)
   * 
   * @returns Success message or null
   */
  async getSuccessMessage(): Promise<string | null> {
    if (await this.successMessage.isVisible({ timeout: 3000 })) {
      return await this.successMessage.textContent();
    }
    return null;
  }

  /**
   * Get error message (if exists)
   * 
   * @returns Error message or null
   */
  async getErrorMessage(): Promise<string | null> {
    if (await this.errorMessage.isVisible({ timeout: 2000 })) {
      return await this.errorMessage.textContent();
    }
    return null;
  }

  /**
   * Get list of available accounts
   * 
   * @returns List of account options
   */
  async getAvailableAccounts(): Promise<string[]> {
    try {
      await this.fromAccountDropdown.waitFor({ state: 'visible' });
      const options = await this.fromAccountDropdown.locator('option').all();
      const accounts: string[] = [];
      
      for (const option of options) {
        const text = await option.textContent();
        if (text && text.trim()) {
          accounts.push(text.trim());
        }
      }
      
      return accounts;
    } catch {
      return [];
    }
  }
}

