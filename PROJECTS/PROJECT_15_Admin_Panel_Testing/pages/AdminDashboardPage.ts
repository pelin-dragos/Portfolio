/**
 * Page Object Pattern - Admin Dashboard Page
 * Dashboard for navigation in admin panel
 */
import { Page, Locator } from '@playwright/test';

export class AdminDashboardPage {
  readonly page: Page;
  readonly dashboardTitle: Locator;
  readonly menuItems: Locator;
  readonly adminMenu: Locator;
  readonly pimMenu: Locator;
  readonly userManagementMenu: Locator;
  readonly usersSubmenu: Locator;
  readonly logoutMenu: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Locators - adapted for OrangeHRM
    this.dashboardTitle = page.locator('h6.oxd-text--h6');
    this.menuItems = page.locator('.oxd-main-menu-item');
    this.adminMenu = page.locator('//span[text()="Admin"]').first();
    this.pimMenu = page.locator('//span[text()="PIM"]').first();
    this.userManagementMenu = page.locator('//span[text()="User Management"]');
    this.usersSubmenu = page.locator('//a[contains(text(),"Users")]');
    this.logoutMenu = page.locator('.oxd-userdropdown-name');
    this.logoutButton = page.getByRole('link', { name: 'Logout' });
  }

  /**
   * Wait for dashboard to load
   */
  async waitForPageLoad(): Promise<void> {
    try {
      await this.dashboardTitle.waitFor({ state: 'visible', timeout: 10000 });
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
      return await this.dashboardTitle.isVisible({ timeout: 5000 });
    } catch {
      return false;
    }
  }

  /**
   * Click on a menu item
   * 
   * @param menuText Menu item text (e.g., "Admin", "PIM")
   * @returns True if click succeeded
   */
  async clickMenuItem(menuText: string): Promise<boolean> {
    try {
      // Try multiple locators for menu item
      const menuItem = this.page.locator(`//span[text()='${menuText}']`).first();
      await menuItem.waitFor({ state: 'visible', timeout: 10000 });
      await menuItem.click();
      await this.page.waitForTimeout(1000);
      return true;
    } catch (error) {
      console.log(`Error clicking menu item ${menuText}: ${error}`);
      return false;
    }
  }

  /**
   * Click Admin menu
   */
  async clickAdminMenu(): Promise<boolean> {
    return await this.clickMenuItem('Admin');
  }

  /**
   * Click PIM menu
   */
  async clickPimMenu(): Promise<boolean> {
    return await this.clickMenuItem('PIM');
  }

  /**
   * Click User Management submenu
   */
  async clickUserManagement(): Promise<boolean> {
    try {
      await this.clickAdminMenu();
      await this.page.waitForTimeout(500);
      await this.userManagementMenu.waitFor({ state: 'visible' });
      await this.userManagementMenu.click();
      await this.page.waitForTimeout(1000);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Click Users submenu
   */
  async clickUsersSubmenu(): Promise<boolean> {
    try {
      // Navigate directly to Users page
      await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers');
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(2000);
      return true;
    } catch (error) {
      console.log(`Error navigating to users submenu: ${error}`);
      // Fallback: try clicking menu items
      try {
        await this.clickAdminMenu();
        await this.page.waitForTimeout(1000);
        
        // Try to find and click Users link
        const usersLink = this.page.locator('//a[contains(text(),"Users")]').first();
        await usersLink.waitFor({ state: 'visible', timeout: 5000 });
        await usersLink.click();
        await this.page.waitForTimeout(2000);
        return true;
      } catch (fallbackError) {
        console.log(`Fallback navigation also failed: ${fallbackError}`);
        return false;
      }
    }
  }

  /**
   * Logout from application
   */
  async logout(): Promise<boolean> {
    try {
      await this.logoutMenu.waitFor({ state: 'visible' });
      await this.logoutMenu.click();
      await this.page.waitForTimeout(500);
      
      await this.logoutButton.waitFor({ state: 'visible' });
      await this.logoutButton.click();
      await this.page.waitForTimeout(2000);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get dashboard title
   * 
   * @returns Dashboard title
   */
  async getDashboardTitle(): Promise<string> {
    try {
      return await this.dashboardTitle.textContent() || '';
    } catch {
      return '';
    }
  }
}

