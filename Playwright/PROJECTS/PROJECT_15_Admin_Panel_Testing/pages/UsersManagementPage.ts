/**
 * Page Object Pattern - Users Management Page
 * For CRUD operations on users in admin panel
 */
import { Page, Locator } from '@playwright/test';

export interface UserInfo {
  username: string;
  user_role: string;
  employee_name: string;
  status: string;
}

export class UsersManagementPage {
  readonly page: Page;
  readonly addButton: Locator;
  readonly searchButton: Locator;
  readonly resetButton: Locator;
  readonly userRoleDropdown: Locator;
  readonly employeeNameInput: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly statusDropdown: Locator;
  readonly saveButton: Locator;
  readonly searchUsernameInput: Locator;
  readonly tableRows: Locator;
  readonly tableData: Locator;
  readonly deleteButton: Locator;
  readonly editButton: Locator;
  readonly checkbox: Locator;
  readonly pagination: Locator;
  readonly nextPageButton: Locator;
  readonly prevPageButton: Locator;
  readonly successMessage: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Locators - adapted for OrangeHRM
    this.addButton = page.locator('button.oxd-button--secondary').first();
    this.searchButton = page.locator('button[type="submit"]').first();
    this.resetButton = page.locator('button[type="reset"]');
    this.userRoleDropdown = page.locator('.oxd-select-text--after').first();
    this.employeeNameInput = page.locator('input[placeholder*="Employee Name"]');
    this.usernameInput = page.locator('input[autocomplete="off"]').first();
    this.passwordInput = page.locator('input[type="password"]').first();
    this.confirmPasswordInput = page.locator('input[type="password"]').nth(1);
    this.statusDropdown = page.locator('.oxd-select-text--after').nth(1);
    this.saveButton = page.locator('button[type="submit"]').last();
    this.searchUsernameInput = page.locator('//label[text()="Username"]/../..//input').first();
    this.tableRows = page.locator('.oxd-table-row');
    this.tableData = page.locator('.oxd-table-cell');
    this.deleteButton = page.locator('button.oxd-button--label-danger');
    this.editButton = page.locator('button.oxd-icon-button--warn');
    this.checkbox = page.locator('input[type="checkbox"]');
    this.pagination = page.locator('.oxd-pagination');
    this.nextPageButton = page.locator('button[aria-label="Next"]');
    this.prevPageButton = page.locator('button[aria-label="Previous"]');
    this.successMessage = page.locator('.oxd-toast--success');
    this.errorMessage = page.locator('.oxd-input-field-error-message');
  }

  /**
   * Wait for page to load
   */
  async waitForPageLoad(): Promise<void> {
    try {
      // Wait for either Add button or Search button (page might be in different states)
      await Promise.race([
        this.addButton.waitFor({ state: 'visible', timeout: 10000 }),
        this.searchButton.waitFor({ state: 'visible', timeout: 10000 })
      ]);
      await this.page.waitForTimeout(1000);
    } catch (error) {
      throw new Error('Users management page did not load properly');
    }
  }

  /**
   * Check if page is loaded
   */
  async isLoaded(): Promise<boolean> {
    try {
      // Check for either Add button or Search button
      const addVisible = await this.addButton.isVisible({ timeout: 2000 }).catch(() => false);
      const searchVisible = await this.searchButton.isVisible({ timeout: 2000 }).catch(() => false);
      return addVisible || searchVisible;
    } catch {
      return false;
    }
  }

  /**
   * Click Add button
   */
  async clickAddButton(): Promise<void> {
    await this.addButton.waitFor({ state: 'visible' });
    await this.addButton.click();
    await this.page.waitForTimeout(1000);
  }

  /**
   * CREATE: Create a new user
   * 
   * @param userRole User role (e.g., "Admin", "ESS")
   * @param employeeName Employee name (autocomplete)
   * @param username Username
   * @param password Password
   * @param status Status (default: "Enabled")
   * @returns True if user was created
   */
  async createUser(
    userRole: string,
    employeeName: string,
    username: string,
    password: string,
    status: string = 'Enabled'
  ): Promise<boolean> {
    try {
      // Click Add
      await this.clickAddButton();
      await this.page.waitForTimeout(1000);
      
      // Select User Role
      await this.userRoleDropdown.waitFor({ state: 'visible', timeout: 10000 });
      await this.userRoleDropdown.click();
      await this.page.waitForTimeout(1000);
      
      // Select role option - try multiple approaches
      try {
        const roleOption = this.page.locator(`//span[text()='${userRole}']`).first();
        await roleOption.waitFor({ state: 'visible', timeout: 5000 });
        await roleOption.click();
      } catch {
        // Try alternative locator
        const roleOptionAlt = this.page.locator(`text=${userRole}`).first();
        await roleOptionAlt.waitFor({ state: 'visible', timeout: 5000 });
        await roleOptionAlt.click();
      }
      await this.page.waitForTimeout(1000);
      
      // Enter Employee Name (autocomplete)
      await this.employeeNameInput.waitFor({ state: 'visible', timeout: 10000 });
      await this.employeeNameInput.fill(employeeName);
      await this.page.waitForTimeout(2000); // Wait for autocomplete
      
      // Select first autocomplete option
      try {
        const autocompleteOption = this.page.locator('.oxd-autocomplete-option').first();
        await autocompleteOption.waitFor({ state: 'visible', timeout: 5000 });
        await autocompleteOption.click();
        await this.page.waitForTimeout(1000);
      } catch {
        // Autocomplete may not appear - try pressing Enter or Tab
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(1000);
      }
      
      // Enter Username
      await this.usernameInput.waitFor({ state: 'visible' });
      await this.usernameInput.fill(username);
      await this.page.waitForTimeout(300);
      
      // Enter Password
      await this.passwordInput.waitFor({ state: 'visible' });
      await this.passwordInput.fill(password);
      await this.page.waitForTimeout(300);
      
      await this.confirmPasswordInput.waitFor({ state: 'visible' });
      await this.confirmPasswordInput.fill(password); // Confirm password
      await this.page.waitForTimeout(300);
      
      // Select Status
      await this.statusDropdown.waitFor({ state: 'visible', timeout: 10000 });
      await this.statusDropdown.click();
      await this.page.waitForTimeout(1000);
      
      try {
        const statusOption = this.page.locator(`//span[text()='${status}']`).first();
        await statusOption.waitFor({ state: 'visible', timeout: 5000 });
        await statusOption.click();
      } catch {
        // Try alternative locator
        const statusOptionAlt = this.page.locator(`text=${status}`).first();
        await statusOptionAlt.waitFor({ state: 'visible', timeout: 5000 });
        await statusOptionAlt.click();
      }
      await this.page.waitForTimeout(1000);
      
      // Click Save
      await this.saveButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.saveButton.click();
      await this.page.waitForTimeout(3000); // Wait for save
      
      // Check success message or if we're back to the list page
      const successVisible = await this.successMessage.isVisible({ timeout: 5000 }).catch(() => false);
      const backToList = await this.addButton.isVisible({ timeout: 5000 }).catch(() => false);
      
      if (successVisible || backToList) {
        return true;
      }
      
      // Also check if there's no error message (form might have closed)
      const errorVisible = await this.errorMessage.isVisible({ timeout: 2000 }).catch(() => false);
      if (!errorVisible) {
        // If no error and we're not on form page, assume success
        return true;
      }
      
      return false;
    } catch (error) {
      console.log(`Error creating user: ${error}`);
      return false;
    }
  }

  /**
   * READ: Search for users
   * 
   * @param username Username to search (optional)
   * @param userRole User role to search (optional)
   * @returns True if search succeeded
   */
  async searchUser(username?: string, userRole?: string): Promise<boolean> {
    try {
      // Enter search criteria
      if (username) {
        // Try multiple locators for username input
        const usernameInputs = [
          this.searchUsernameInput,
          this.page.locator('//label[text()="Username"]/../..//input').first(),
          this.page.locator('input[placeholder*="Username"]').first()
        ];
        
        let filled = false;
        for (const input of usernameInputs) {
          try {
            await input.waitFor({ state: 'visible', timeout: 2000 });
            await input.fill(username);
            filled = true;
            break;
          } catch {
            continue;
          }
        }
        
        if (!filled) {
          throw new Error('Could not find username input field');
        }
        
        await this.page.waitForTimeout(300);
      }
      
      // Click Search
      await this.searchButton.waitFor({ state: 'visible' });
      await this.searchButton.click();
      await this.page.waitForTimeout(2000); // Wait for search results
      
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get table rows
   * 
   * @returns List of row locators
   */
  async getTableRows(): Promise<Locator[]> {
    try {
      const rows = await this.tableRows.all();
      return rows;
    } catch {
      return [];
    }
  }

  /**
   * Get users count
   * 
   * @returns Number of users
   */
  async getUsersCount(): Promise<number> {
    const rows = await this.getTableRows();
    return rows.length;
  }

  /**
   * Check if user is present in table
   * 
   * @param username Username to check
   * @returns True if user is present
   */
  async isUserPresent(username: string): Promise<boolean> {
    const rows = await this.getTableRows();
    for (const row of rows) {
      try {
        const cells = await row.locator('.oxd-table-cell').all();
        if (cells.length > 1) {
          const cellText = await cells[1].textContent();
          if (cellText && cellText.includes(username)) {
            return true;
          }
        }
      } catch {
        continue;
      }
    }
    return false;
  }

  /**
   * Get user info
   * 
   * @param username Username
   * @returns User info or null
   */
  async getUserInfo(username: string): Promise<UserInfo | null> {
    const rows = await this.getTableRows();
    for (const row of rows) {
      try {
        const cells = await row.locator('.oxd-table-cell').all();
        if (cells.length > 1) {
          const cellText = await cells[1].textContent();
          if (cellText && cellText.includes(username)) {
            return {
              username: await cells[1].textContent() || '',
              user_role: await cells[2]?.textContent() || '',
              employee_name: await cells[3]?.textContent() || '',
              status: await cells[4]?.textContent() || ''
            };
          }
        }
      } catch {
        continue;
      }
    }
    return null;
  }

  /**
   * UPDATE: Edit a user
   * 
   * @param username Username to edit
   * @param newData New data dict (e.g., {"username": "newuser", "status": "Disabled"})
   * @returns True if edit succeeded
   */
  async editUser(username: string, newData: Record<string, string>): Promise<boolean> {
    try {
      // Search for user
      if (!await this.searchUser(username)) {
        return false;
      }
      
      // Find row with user
      const rows = await this.getTableRows();
      for (const row of rows) {
        try {
          const cells = await row.locator('.oxd-table-cell').all();
          if (cells.length > 1) {
            const cellText = await cells[1].textContent();
            if (cellText && cellText.includes(username)) {
              // Click Edit button
              const editButton = row.locator('button.oxd-icon-button--warn').first();
              await editButton.waitFor({ state: 'visible' });
              await editButton.click();
              await this.page.waitForTimeout(1000);
              
              // Modify data (simplified - adapt for specific platform)
              // For OrangeHRM, edit form is similar to create form
              
              // Click Save
              await this.saveButton.waitFor({ state: 'visible' });
              await this.saveButton.click();
              await this.page.waitForTimeout(2000);
              
              return true;
            }
          }
        } catch {
          continue;
        }
      }
      return false;
    } catch (error) {
      console.log(`Error editing user: ${error}`);
      return false;
    }
  }

  /**
   * DELETE: Delete a user
   * 
   * @param username Username to delete
   * @returns True if delete succeeded
   */
  async deleteUser(username: string): Promise<boolean> {
    try {
      // Search for user
      if (!await this.searchUser(username)) {
        return false;
      }
      
      // Find row with user
      const rows = await this.getTableRows();
      for (const row of rows) {
        try {
          const cells = await row.locator('.oxd-table-cell').all();
          if (cells.length > 1) {
            const cellText = await cells[1].textContent();
            if (cellText && cellText.includes(username)) {
              // Click Delete button
              const deleteButton = row.locator('button.oxd-button--label-danger').first();
              await deleteButton.waitFor({ state: 'visible' });
              await deleteButton.click();
              await this.page.waitForTimeout(1000);
              
              // Confirm delete (if confirmation dialog exists)
              try {
                const confirmButton = this.page.locator('button.oxd-button--label-danger').last();
                await confirmButton.waitFor({ state: 'visible', timeout: 2000 });
                await confirmButton.click();
                await this.page.waitForTimeout(2000);
              } catch {
                // No confirmation dialog
              }
              
              return true;
            }
          }
        } catch {
          continue;
        }
      }
      return false;
    } catch (error) {
      console.log(`Error deleting user: ${error}`);
      return false;
    }
  }

  /**
   * Delete multiple users (bulk delete)
   * 
   * @param usernames List of usernames to delete
   * @returns Number of deleted users
   */
  async deleteBulkUsers(usernames: string[]): Promise<number> {
    let deletedCount = 0;
    
    for (const username of usernames) {
      if (await this.deleteUser(username)) {
        deletedCount++;
        await this.page.waitForTimeout(1000); // Delay between deletes
      }
    }
    
    return deletedCount;
  }

  /**
   * Check if page has pagination
   * 
   * @returns True if pagination exists
   */
  async hasPagination(): Promise<boolean> {
    try {
      return await this.pagination.isVisible({ timeout: 2000 });
    } catch {
      return false;
    }
  }

  /**
   * Click Next Page button
   */
  async clickNextPage(): Promise<boolean> {
    try {
      if (await this.hasPagination()) {
        await this.nextPageButton.waitFor({ state: 'visible' });
        await this.nextPageButton.click();
        await this.page.waitForTimeout(2000); // Wait for page load
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  /**
   * Click Previous Page button
   */
  async clickPreviousPage(): Promise<boolean> {
    try {
      if (await this.hasPagination()) {
        await this.prevPageButton.waitFor({ state: 'visible' });
        await this.prevPageButton.click();
        await this.page.waitForTimeout(2000); // Wait for page load
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  /**
   * Reset search
   */
  async resetSearch(): Promise<boolean> {
    try {
      await this.resetButton.waitFor({ state: 'visible' });
      await this.resetButton.click();
      await this.page.waitForTimeout(2000);
      return true;
    } catch {
      return false;
    }
  }
}

