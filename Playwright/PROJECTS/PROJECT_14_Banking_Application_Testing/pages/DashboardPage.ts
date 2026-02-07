/**
 * Page Object Pattern - Banking Dashboard Page
 * Dashboard after login with account information
 */
import { Page, Locator } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly dashboardContainer: Locator;
  readonly welcomeMessage: Locator;
  readonly accountOverviewLink: Locator;
  readonly transferFundsLink: Locator;
  readonly billPayLink: Locator;
  readonly accountNumbers: Locator;
  readonly accountBalances: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Locators - adapted for ParaBank
    this.dashboardContainer = page.locator('#rightPanel');
    this.welcomeMessage = page.locator('h1.title');
    this.accountOverviewLink = page.getByRole('link', { name: 'Accounts Overview' });
    this.transferFundsLink = page.getByRole('link', { name: 'Transfer Funds' });
    this.billPayLink = page.getByRole('link', { name: 'Bill Pay' });
    this.accountNumbers = page.locator('a[href*="activity"]');
    this.accountBalances = page.locator('td[align="right"]');
    this.logoutLink = page.getByRole('link', { name: 'Log Out' });
  }

  /**
   * Wait for dashboard to load
   */
  async waitForPageLoad(): Promise<void> {
    try {
      await this.dashboardContainer.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(1000);
    } catch (error) {
      throw new Error('Dashboard page did not load properly');
    }
  }

  /**
   * Check if dashboard is loaded
   */
  async isLoaded(): Promise<boolean> {
    try {
      return await this.dashboardContainer.isVisible({ timeout: 5000 });
    } catch {
      return false;
    }
  }

  /**
   * Get welcome message
   * 
   * @returns Welcome message
   */
  async getWelcomeMessage(): Promise<string> {
    try {
      return await this.welcomeMessage.textContent() || '';
    } catch {
      return '';
    }
  }

  /**
   * Click Accounts Overview link
   */
  async clickAccountsOverview(): Promise<boolean> {
    try {
      await this.accountOverviewLink.waitFor({ state: 'visible' });
      await this.accountOverviewLink.click();
      await this.page.waitForTimeout(1000);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Click Transfer Funds link
   */
  async clickTransferFunds(): Promise<boolean> {
    try {
      await this.transferFundsLink.waitFor({ state: 'visible' });
      await this.transferFundsLink.click();
      await this.page.waitForTimeout(1000);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Click Bill Pay link
   */
  async clickBillPay(): Promise<boolean> {
    try {
      await this.billPayLink.waitFor({ state: 'visible' });
      await this.billPayLink.click();
      await this.page.waitForTimeout(1000);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get list of account numbers
   * 
   * @returns List of account numbers (as strings)
   */
  async getAccountNumbers(): Promise<string[]> {
    try {
      const accountLinks = await this.accountNumbers.all();
      const accountNumbers: string[] = [];
      
      for (const link of accountLinks) {
        const href = await link.getAttribute('href');
        // Extract account number from URL (for ParaBank)
        if (href && href.includes('activity')) {
          // Format: /parabank/activity.htm?id=12345
          if (href.includes('id=')) {
            const accountId = href.split('id=')[1]?.split('&')[0];
            if (accountId) {
              accountNumbers.push(accountId);
            }
          }
        }
      }
      
      return accountNumbers;
    } catch {
      return [];
    }
  }

  /**
   * Get account balance for a specific account or first account
   * 
   * @param accountNumber Account number (optional, if null returns first)
   * @returns Balance or null if not found
   */
  async getAccountBalance(accountNumber?: string): Promise<number | null> {
    try {
      // For ParaBank, balances are in cells
      const balances = await this.accountBalances.all();
      if (balances.length > 0) {
        const balanceText = await balances[0].textContent();
        if (balanceText) {
          const cleaned = balanceText.replace('$', '').replace(',', '').trim();
          try {
            return parseFloat(cleaned);
          } catch {
            return null;
          }
        }
      }
      return null;
    } catch {
      return null;
    }
  }

  /**
   * Logout from application
   */
  async logout(): Promise<boolean> {
    try {
      await this.logoutLink.waitFor({ state: 'visible' });
      await this.logoutLink.click();
      await this.page.waitForTimeout(2000);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if user is still logged in
   * 
   * @returns True if logged in
   */
  async isLoggedIn(): Promise<boolean> {
    return await this.isLoaded() && await this.logoutLink.isVisible({ timeout: 2000 }).catch(() => false);
  }
}

