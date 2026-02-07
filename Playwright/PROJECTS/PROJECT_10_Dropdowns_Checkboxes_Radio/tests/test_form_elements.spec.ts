import { test, expect } from '@playwright/test';
import { DropdownPage } from '../pages/DropdownPage';
import { CheckboxPage } from '../pages/CheckboxPage';
import { RadioPage } from '../pages/RadioPage';
import { FormElementsUtils } from '../utils/FormElementsUtils';

/**
 * Test Suite: Form Elements Testing
 * Tests for dropdowns, checkboxes, radio buttons
 * Uses tags for categorization (@dropdown, @checkbox, @radio, @form_elements)
 */

test.describe('TestDropdowns', () => {
  /**
   * Test: Select option from dropdown by value
   */
  test('@dropdown @smoke @critical should select dropdown option by value', async ({ page }) => {
    const dropdownPage = new DropdownPage(page);
    await dropdownPage.navigateTo();
    
    // Select option by value
    const success = await dropdownPage.selectOptionByValue('1');
    expect(success).toBeTruthy();
    
    // Verify selected option
    const selected = await dropdownPage.getSelectedOption();
    expect(selected).toBe('Option 1');
    
    const selectedValue = await dropdownPage.getSelectedValue();
    expect(selectedValue).toBe('1');
  });

  /**
   * Test: Select option from dropdown by visible text
   */
  test('@dropdown @regression should select dropdown option by text', async ({ page }) => {
    const dropdownPage = new DropdownPage(page);
    await dropdownPage.navigateTo();
    
    const success = await dropdownPage.selectOptionByText('Option 2');
    expect(success).toBeTruthy();
    
    const selected = await dropdownPage.getSelectedOption();
    expect(selected).toBe('Option 2');
  });

  /**
   * Test: Select option from dropdown by index
   */
  test('@dropdown @regression should select dropdown option by index', async ({ page }) => {
    const dropdownPage = new DropdownPage(page);
    await dropdownPage.navigateTo();
    
    const success = await dropdownPage.selectOptionByIndex(1);
    expect(success).toBeTruthy();
    
    const selected = await dropdownPage.getSelectedOption();
    expect(selected).not.toBeNull();
  });

  /**
   * Test: Get all options from dropdown
   */
  test('@dropdown @regression should get all dropdown options', async ({ page }) => {
    const dropdownPage = new DropdownPage(page);
    await dropdownPage.navigateTo();
    
    const allOptions = await dropdownPage.getAllOptions();
    expect(allOptions.length).toBeGreaterThan(0);
    expect(allOptions).toContain('Option 1');
    expect(allOptions).toContain('Option 2');
  });

  /**
   * Test: Select dropdown using FormElementsUtils
   */
  test('@dropdown @regression should select dropdown using FormElementsUtils', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dropdown');
    await page.waitForTimeout(1000);
    
    const dropdownLocator = page.locator('#dropdown');
    const success = await FormElementsUtils.selectDropdownOption(
      page,
      dropdownLocator,
      '1',
      true
    );
    expect(success).toBeTruthy();
    
    const selected = await FormElementsUtils.getSelectedDropdownOption(page, dropdownLocator);
    expect(selected).toContain('Option 1');
  });

  /**
   * Test: Get all dropdown options using FormElementsUtils
   */
  test('@dropdown @regression should get all dropdown options using FormElementsUtils', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dropdown');
    await page.waitForTimeout(1000);
    
    const dropdownLocator = page.locator('#dropdown');
    const allOptions = await FormElementsUtils.getAllDropdownOptions(page, dropdownLocator);
    
    expect(allOptions.length).toBeGreaterThan(0);
    expect(allOptions).toContain('Option 1');
  });
});

test.describe('TestCheckboxes', () => {
  /**
   * Test: Check and uncheck checkboxes
   */
  test('@checkbox @smoke @critical should check and uncheck checkboxes', async ({ page }) => {
    const checkboxPage = new CheckboxPage(page);
    await checkboxPage.navigateTo();
    
    // Check checkbox 1
    await checkboxPage.checkCheckbox1();
    expect(await checkboxPage.isCheckbox1Checked()).toBeTruthy();
    
    // Uncheck checkbox 1
    await checkboxPage.uncheckCheckbox1();
    expect(await checkboxPage.isCheckbox1Checked()).toBeFalsy();
    
    // Check checkbox 2
    await checkboxPage.checkCheckbox2();
    expect(await checkboxPage.isCheckbox2Checked()).toBeTruthy();
  });

  /**
   * Test: Check all checkboxes
   */
  test('@checkbox @regression should check all checkboxes', async ({ page }) => {
    const checkboxPage = new CheckboxPage(page);
    await checkboxPage.navigateTo();
    
    const checkedCount = await checkboxPage.checkAllCheckboxes();
    expect(checkedCount).toBeGreaterThan(0);
    
    const totalChecked = await checkboxPage.getCheckedCount();
    expect(totalChecked).toBeGreaterThan(0);
  });

  /**
   * Test: Uncheck all checkboxes
   */
  test('@checkbox @regression should uncheck all checkboxes', async ({ page }) => {
    const checkboxPage = new CheckboxPage(page);
    await checkboxPage.navigateTo();
    
    // Check all first
    await checkboxPage.checkAllCheckboxes();
    
    // Then uncheck all
    const uncheckedCount = await checkboxPage.uncheckAllCheckboxes();
    expect(uncheckedCount).toBeGreaterThan(0);
    
    const totalChecked = await checkboxPage.getCheckedCount();
    expect(totalChecked).toBe(0);
  });

  /**
   * Test: Verify checkbox state
   */
  test('@checkbox @regression should verify checkbox state', async ({ page }) => {
    const checkboxPage = new CheckboxPage(page);
    await checkboxPage.navigateTo();
    
    // Check initial state
    const checkbox1Initial = await checkboxPage.isCheckbox1Checked();
    
    // Toggle checkbox 1
    if (checkbox1Initial) {
      await checkboxPage.uncheckCheckbox1();
      expect(await checkboxPage.isCheckbox1Checked()).toBeFalsy();
    } else {
      await checkboxPage.checkCheckbox1();
      expect(await checkboxPage.isCheckbox1Checked()).toBeTruthy();
    }
  });

  /**
   * Test: Interact with checkbox using FormElementsUtils
   */
  test('@checkbox @regression should interact with checkbox using FormElementsUtils', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/checkboxes');
    await page.waitForTimeout(1000);
    
    const checkboxLocator = page.locator("form#checkboxes input[type='checkbox']").first();
    
    // Check checkbox
    const success1 = await FormElementsUtils.clickCheckbox(
      page,
      checkboxLocator,
      true
    );
    expect(success1).toBeTruthy();
    
    // Verify it's checked
    const isChecked = await FormElementsUtils.isCheckboxChecked(page, checkboxLocator);
    expect(isChecked).toBeTruthy();
    
    // Uncheck checkbox
    const success2 = await FormElementsUtils.clickCheckbox(
      page,
      checkboxLocator,
      false
    );
    expect(success2).toBeTruthy();
    
    // Verify it's unchecked
    const isUnchecked = await FormElementsUtils.isCheckboxChecked(page, checkboxLocator);
    expect(isUnchecked).toBeFalsy();
  });
});

test.describe('TestRadioButtons', () => {
  /**
   * Test: Select 'Yes' radio button
   */
  test('@radio @smoke @critical should select Yes radio button', async ({ page }) => {
    const radioPage = new RadioPage(page);
    await radioPage.navigateTo();
    
    const success = await radioPage.clickYesRadio();
    expect(success).toBeTruthy();
    
    await page.waitForTimeout(1000);
    expect(await radioPage.isYesSelected()).toBeTruthy();
    
    const successText = await radioPage.getSelectedRadioText();
    expect(successText).not.toBeNull();
    expect(successText).toContain('Yes');
  });

  /**
   * Test: Select 'Impressive' radio button
   */
  test('@radio @regression should select Impressive radio button', async ({ page }) => {
    const radioPage = new RadioPage(page);
    await radioPage.navigateTo();
    
    const success = await radioPage.clickImpressiveRadio();
    expect(success).toBeTruthy();
    
    await page.waitForTimeout(1000);
    expect(await radioPage.isImpressiveSelected()).toBeTruthy();
    
    const successText = await radioPage.getSelectedRadioText();
    expect(successText).toContain('Impressive');
  });

  /**
   * Test: Verify mutual exclusivity of radio buttons
   */
  test('@radio @regression should verify radio buttons mutual exclusivity', async ({ page }) => {
    const radioPage = new RadioPage(page);
    await radioPage.navigateTo();
    
    // Select 'Yes'
    await radioPage.clickYesRadio();
    await page.waitForTimeout(1000);
    expect(await radioPage.isYesSelected()).toBeTruthy();
    expect(await radioPage.isImpressiveSelected()).toBeFalsy();
    
    // Select 'Impressive'
    await radioPage.clickImpressiveRadio();
    await page.waitForTimeout(1000);
    expect(await radioPage.isImpressiveSelected()).toBeTruthy();
    expect(await radioPage.isYesSelected()).toBeFalsy();
  });

  /**
   * Test: Verify 'No' radio button is disabled
   */
  test('@radio @regression should verify No radio button is disabled', async ({ page }) => {
    const radioPage = new RadioPage(page);
    await radioPage.navigateTo();
    
    const isDisabled = await radioPage.isNoDisabled();
    expect(isDisabled).toBeTruthy();
  });

  /**
   * Test: Get selected radio button
   */
  test('@radio @regression should get selected radio button', async ({ page }) => {
    const radioPage = new RadioPage(page);
    await radioPage.navigateTo();
    
    // Select 'Yes'
    await radioPage.clickYesRadio();
    await page.waitForTimeout(1000);
    
    const selectedRadio = await radioPage.getSelectedRadio();
    expect(selectedRadio).not.toBeNull();
    expect(await radioPage.isYesSelected()).toBeTruthy();
  });

  /**
   * Test: Interact with radio button using FormElementsUtils
   */
  test('@radio @regression should interact with radio button using FormElementsUtils', async ({ page }) => {
    await page.goto('https://demoqa.com/radio-button');
    await page.waitForTimeout(2000);
    
    const radioLocator = page.locator("label[for='yesRadio']");
    
    const success = await FormElementsUtils.clickRadioButton(page, radioLocator);
    expect(success).toBeTruthy();
    
    await page.waitForTimeout(1000);
    
    // Verify it's selected (using locator for input)
    const yesRadioLocator = page.locator('#yesRadio');
    const isSelected = await FormElementsUtils.isRadioSelected(page, yesRadioLocator);
    expect(isSelected).toBeTruthy();
  });
});

test.describe('TestCombinedFormElements', () => {
  /**
   * Test: Interact with all form element types in a single test
   */
  test('@form_elements @regression should interact with all form element types', async ({ page }) => {
    // Test dropdown
    const dropdownPage = new DropdownPage(page);
    await dropdownPage.navigateTo();
    await dropdownPage.selectOptionByValue('1');
    expect(await dropdownPage.getSelectedOption()).toBe('Option 1');
    
    // Test checkbox
    const checkboxPage = new CheckboxPage(page);
    await checkboxPage.navigateTo();
    await checkboxPage.checkCheckbox1();
    expect(await checkboxPage.isCheckbox1Checked()).toBeTruthy();
    
    // Test radio
    const radioPage = new RadioPage(page);
    await radioPage.navigateTo();
    await radioPage.clickYesRadio();
    await page.waitForTimeout(1000);
    expect(await radioPage.isYesSelected()).toBeTruthy();
  });
});

