import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Pattern - Checkbox Page
 * Represents pages with checkboxes for testing
 */
export class CheckboxPage {
  readonly page: Page;
  readonly checkbox1: Locator;
  readonly checkbox2: Locator;
  readonly allCheckboxes: Locator;
  
  private readonly baseUrl: string = 'https://the-internet.herokuapp.com/checkboxes';

  constructor(page: Page) {
    this.page = page;
    this.checkbox1 = page.locator("form#checkboxes input[type='checkbox']").first();
    this.checkbox2 = page.locator("form#checkboxes input[type='checkbox']").last();
    this.allCheckboxes = page.locator("input[type='checkbox']");
  }

  async navigateTo(): Promise<void> {
    await this.page.goto(this.baseUrl);
    await expect(this.checkbox1).toBeVisible();
    await this.page.waitForTimeout(500);
  }

  /**
   * Clicks checkbox 1
   */
  async clickCheckbox1(): Promise<boolean> {
    try {
      await this.checkbox1.click();
      await this.page.waitForTimeout(500);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Clicks checkbox 2
   */
  async clickCheckbox2(): Promise<boolean> {
    try {
      await this.checkbox2.click();
      await this.page.waitForTimeout(500);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Checks if checkbox 1 is checked
   */
  async isCheckbox1Checked(): Promise<boolean> {
    try {
      return await this.checkbox1.isChecked();
    } catch {
      return false;
    }
  }

  /**
   * Checks if checkbox 2 is checked
   */
  async isCheckbox2Checked(): Promise<boolean> {
    try {
      return await this.checkbox2.isChecked();
    } catch {
      return false;
    }
  }

  /**
   * Checks checkbox 1 if not already checked
   */
  async checkCheckbox1(): Promise<boolean> {
    if (!(await this.isCheckbox1Checked())) {
      return await this.clickCheckbox1();
    }
    return true;
  }

  /**
   * Unchecks checkbox 1 if checked
   */
  async uncheckCheckbox1(): Promise<boolean> {
    if (await this.isCheckbox1Checked()) {
      return await this.clickCheckbox1();
    }
    return true;
  }

  /**
   * Checks checkbox 2 if not already checked
   */
  async checkCheckbox2(): Promise<boolean> {
    if (!(await this.isCheckbox2Checked())) {
      return await this.clickCheckbox2();
    }
    return true;
  }

  /**
   * Unchecks checkbox 2 if checked
   */
  async uncheckCheckbox2(): Promise<boolean> {
    if (await this.isCheckbox2Checked()) {
      return await this.clickCheckbox2();
    }
    return true;
  }

  /**
   * Gets all checkboxes on the page
   */
  async getAllCheckboxes(): Promise<Locator[]> {
    try {
      const count = await this.allCheckboxes.count();
      const checkboxes: Locator[] = [];
      
      for (let i = 0; i < count; i++) {
        checkboxes.push(this.allCheckboxes.nth(i));
      }
      
      return checkboxes;
    } catch {
      return [];
    }
  }

  /**
   * Checks all checkboxes
   */
  async checkAllCheckboxes(): Promise<number> {
    const checkboxes = await this.getAllCheckboxes();
    let checkedCount = 0;
    
    for (const checkbox of checkboxes) {
      if (!(await checkbox.isChecked())) {
        await checkbox.click();
        checkedCount++;
        await this.page.waitForTimeout(300);
      }
    }
    
    return checkedCount;
  }

  /**
   * Unchecks all checkboxes
   */
  async uncheckAllCheckboxes(): Promise<number> {
    const checkboxes = await this.getAllCheckboxes();
    let uncheckedCount = 0;
    
    for (const checkbox of checkboxes) {
      if (await checkbox.isChecked()) {
        await checkbox.click();
        uncheckedCount++;
        await this.page.waitForTimeout(300);
      }
    }
    
    return uncheckedCount;
  }

  /**
   * Gets the count of checked checkboxes
   */
  async getCheckedCount(): Promise<number> {
    const checkboxes = await this.getAllCheckboxes();
    let count = 0;
    
    for (const checkbox of checkboxes) {
      if (await checkbox.isChecked()) {
        count++;
      }
    }
    
    return count;
  }
}

