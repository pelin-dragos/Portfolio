import { Page, Locator } from '@playwright/test';

/**
 * Utility functions for managing form elements (dropdowns, checkboxes, radio buttons)
 * Helper functions for interactions with form elements
 */
export class FormElementsUtils {
  /**
   * Selects an option from a dropdown
   */
  static async selectDropdownOption(
    page: Page,
    dropdownLocator: Locator,
    option: string,
    byValue: boolean = true
  ): Promise<boolean> {
    try {
      await dropdownLocator.waitFor({ state: 'visible', timeout: 10000 });
      
      if (byValue) {
        await dropdownLocator.selectOption({ value: option });
      } else {
        await dropdownLocator.selectOption({ label: option });
      }
      
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Gets the selected option from a dropdown
   */
  static async getSelectedDropdownOption(
    page: Page,
    dropdownLocator: Locator
  ): Promise<string | null> {
    try {
      await dropdownLocator.waitFor({ state: 'visible', timeout: 10000 });
      const selectedValue = await dropdownLocator.inputValue();
      const option = dropdownLocator.locator(`option[value="${selectedValue}"]`);
      return await option.textContent();
    } catch {
      return null;
    }
  }

  /**
   * Gets all options from a dropdown
   */
  static async getAllDropdownOptions(
    page: Page,
    dropdownLocator: Locator
  ): Promise<string[]> {
    try {
      await dropdownLocator.waitFor({ state: 'visible', timeout: 10000 });
      const options = dropdownLocator.locator('option');
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
   * Clicks a checkbox
   */
  static async clickCheckbox(
    page: Page,
    checkboxLocator: Locator,
    shouldBeChecked: boolean = true
  ): Promise<boolean> {
    try {
      await checkboxLocator.waitFor({ state: 'visible', timeout: 10000 });
      
      const isChecked = await checkboxLocator.isChecked();
      
      // Click only if current state is not the desired state
      if ((shouldBeChecked && !isChecked) || (!shouldBeChecked && isChecked)) {
        await checkboxLocator.click();
      }
      
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Checks if a checkbox is checked
   */
  static async isCheckboxChecked(
    page: Page,
    checkboxLocator: Locator
  ): Promise<boolean> {
    try {
      await checkboxLocator.waitFor({ state: 'visible', timeout: 10000 });
      return await checkboxLocator.isChecked();
    } catch {
      return false;
    }
  }

  /**
   * Clicks a radio button
   */
  static async clickRadioButton(
    page: Page,
    radioLocator: Locator
  ): Promise<boolean> {
    try {
      await radioLocator.waitFor({ state: 'visible', timeout: 10000 });
      await radioLocator.click();
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Checks if a radio button is selected
   */
  static async isRadioSelected(
    page: Page,
    radioLocator: Locator
  ): Promise<boolean> {
    try {
      await radioLocator.waitFor({ state: 'visible', timeout: 10000 });
      return await radioLocator.isChecked();
    } catch {
      return false;
    }
  }

  /**
   * Gets all radio buttons in a group
   */
  static async getAllRadioButtonsInGroup(
    page: Page,
    radioGroupName: string
  ): Promise<Locator[]> {
    try {
      const radios = page.locator(`input[type="radio"][name="${radioGroupName}"]`);
      const count = await radios.count();
      const radioButtons: Locator[] = [];
      
      for (let i = 0; i < count; i++) {
        radioButtons.push(radios.nth(i));
      }
      
      return radioButtons;
    } catch {
      return [];
    }
  }

  /**
   * Gets the selected radio button in a group
   */
  static async getSelectedRadioInGroup(
    page: Page,
    radioGroupName: string
  ): Promise<Locator | null> {
    const radioButtons = await this.getAllRadioButtonsInGroup(page, radioGroupName);
    
    for (const radio of radioButtons) {
      if (await radio.isChecked()) {
        return radio;
      }
    }
    
    return null;
  }

  /**
   * Selects a radio button by value
   */
  static async selectRadioByValue(
    page: Page,
    radioGroupName: string,
    value: string
  ): Promise<boolean> {
    try {
      const radioButtons = await this.getAllRadioButtonsInGroup(page, radioGroupName);
      
      for (const radio of radioButtons) {
        const radioValue = await radio.getAttribute('value');
        if (radioValue === value) {
          await radio.click();
          return true;
        }
      }
      
      return false;
    } catch {
      return false;
    }
  }

  /**
   * Gets all checkboxes found by a locator
   */
  static async getAllCheckboxes(
    page: Page,
    checkboxLocator: Locator
  ): Promise<Locator[]> {
    try {
      await checkboxLocator.first().waitFor({ state: 'visible', timeout: 10000 });
      const count = await checkboxLocator.count();
      const checkboxes: Locator[] = [];
      
      for (let i = 0; i < count; i++) {
        checkboxes.push(checkboxLocator.nth(i));
      }
      
      return checkboxes;
    } catch {
      return [];
    }
  }

  /**
   * Selects multiple checkboxes
   */
  static async selectMultipleCheckboxes(
    page: Page,
    checkboxLocator: Locator,
    indicesToSelect: number[]
  ): Promise<number> {
    const checkboxes = await this.getAllCheckboxes(page, checkboxLocator);
    let selectedCount = 0;
    
    for (const index of indicesToSelect) {
      if (0 <= index && index < checkboxes.length) {
        if (!(await checkboxes[index].isChecked())) {
          await checkboxes[index].click();
          selectedCount++;
        }
      }
    }
    
    return selectedCount;
  }
}

