import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Pattern - Dropdown Page
 * Represents pages with dropdowns for testing
 */
export class DropdownPage {
  readonly page: Page;
  readonly dropdown: Locator;
  
  private readonly baseUrl: string = 'https://the-internet.herokuapp.com/dropdown';

  constructor(page: Page) {
    this.page = page;
    this.dropdown = page.locator('#dropdown');
  }

  async navigateTo(): Promise<void> {
    await this.page.goto(this.baseUrl);
    await expect(this.dropdown).toBeVisible();
    await this.page.waitForTimeout(500);
  }

  /**
   * Selects an option from dropdown by value
   */
  async selectOptionByValue(value: string): Promise<boolean> {
    try {
      await this.dropdown.selectOption({ value });
      await this.page.waitForTimeout(500);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Selects an option from dropdown by visible text
   */
  async selectOptionByText(text: string): Promise<boolean> {
    try {
      await this.dropdown.selectOption({ label: text });
      await this.page.waitForTimeout(500);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Selects an option from dropdown by index
   */
  async selectOptionByIndex(index: number): Promise<boolean> {
    try {
      await this.dropdown.selectOption({ index });
      await this.page.waitForTimeout(500);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Gets the selected option text
   */
  async getSelectedOption(): Promise<string | null> {
    try {
      const selectedValue = await this.dropdown.inputValue();
      const option = this.dropdown.locator(`option[value="${selectedValue}"]`);
      return await option.textContent();
    } catch {
      return null;
    }
  }

  /**
   * Gets the selected option value
   */
  async getSelectedValue(): Promise<string | null> {
    try {
      return await this.dropdown.inputValue();
    } catch {
      return null;
    }
  }

  /**
   * Gets all options text
   */
  async getAllOptions(): Promise<string[]> {
    try {
      const options = this.dropdown.locator('option');
      const count = await options.count();
      const texts: string[] = [];
      
      for (let i = 0; i < count; i++) {
        const text = await options.nth(i).textContent();
        if (text) {
          texts.push(text.trim());
        }
      }
      
      return texts;
    } catch {
      return [];
    }
  }

  /**
   * Gets all option values
   */
  async getAllOptionValues(): Promise<string[]> {
    try {
      const options = this.dropdown.locator('option');
      const count = await options.count();
      const values: string[] = [];
      
      for (let i = 0; i < count; i++) {
        const value = await options.nth(i).getAttribute('value');
        if (value) {
          values.push(value);
        }
      }
      
      return values;
    } catch {
      return [];
    }
  }
}

