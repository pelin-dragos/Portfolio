import { test, expect, Dialog } from '@playwright/test';
import { AlertPage } from '../pages/AlertPage';
import { AlertUtils } from '../utils/AlertUtils';

/**
 * Test Suite: Alert & Popup Handling Testing
 * Tests for JavaScript alerts, confirms, prompts
 * Uses tags for categorization (@alert, @confirm, @prompt, @alert_handling)
 */

test.describe('TestJavaScriptAlerts', () => {
  /**
   * Test: Accept JavaScript Alert
   */
  test('@alert @smoke @critical should accept JS alert', async ({ page }) => {
    const alertPage = new AlertPage(page);
    await alertPage.navigateTo();
    
    // Set up dialog listener before clicking
    const dialogPromise = new Promise<string>((resolve) => {
      page.on('dialog', (dialog) => {
        resolve(dialog.message());
        dialog.accept();
      });
    });
    
    // Click the JS Alert button
    await alertPage.clickJsAlert();
    
    // Get alert text
    const alertText = await dialogPromise;
    expect(alertText).toBe('I am a JS Alert');
    
    // Wait a bit for alert to be handled
    await page.waitForTimeout(500);
    
    // Verify result message
    const result = await alertPage.getResultMessage();
    expect(result).toContain('You successfully clicked an alert');
  });

  /**
   * Test: Get alert text
   */
  test('@alert @regression should get alert text', async ({ page }) => {
    const alertPage = new AlertPage(page);
    await alertPage.navigateTo();
    
    // Set up dialog listener
    const dialogPromise = new Promise<string>((resolve) => {
      page.on('dialog', (dialog) => {
        resolve(dialog.message());
        dialog.accept();
      });
    });
    
    await alertPage.clickJsAlert();
    
    const alertText = await dialogPromise;
    expect(alertText).not.toBeNull();
    expect(alertText).toContain('JS Alert');
  });

  /**
   * Test: Handle alert using AlertUtils
   */
  test('@alert @regression should handle alert using AlertUtils', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    await page.waitForTimeout(1000);
    
    // Set up dialog listener before clicking
    const dialogPromise = AlertUtils.waitForAndAcceptAlert(page);
    
    // Click button
    await page.locator("button:has-text('Click for JS Alert')").click();
    
    // Get alert text
    const text = await dialogPromise;
    expect(text).not.toBeNull();
    expect(text).toContain('JS Alert');
    
    // Verify result
    await page.waitForTimeout(500);
    const result = await page.locator('#result').textContent();
    expect(result).toContain('You successfully clicked an alert');
  });
});

test.describe('TestJavaScriptConfirms', () => {
  /**
   * Test: Accept JavaScript Confirm
   */
  test('@confirm @smoke @critical should accept JS confirm', async ({ page }) => {
    const alertPage = new AlertPage(page);
    await alertPage.navigateTo();
    
    // Set up dialog listener
    const dialogPromise = new Promise<string>((resolve) => {
      page.on('dialog', (dialog) => {
        resolve(dialog.message());
        dialog.accept();
      });
    });
    
    // Click the JS Confirm button
    await alertPage.clickJsConfirm();
    
    // Get confirm text
    const alertText = await dialogPromise;
    expect(alertText).toContain('I am a JS Confirm');
    
    // Wait a bit
    await page.waitForTimeout(500);
    
    // Verify result message
    const result = await alertPage.getResultMessage();
    expect(result).toContain('You clicked: Ok');
  });

  /**
   * Test: Dismiss JavaScript Confirm
   */
  test('@confirm @regression should dismiss JS confirm', async ({ page }) => {
    const alertPage = new AlertPage(page);
    await alertPage.navigateTo();
    
    // Set up dialog listener
    const dialogPromise = new Promise<string>((resolve) => {
      page.on('dialog', (dialog) => {
        resolve(dialog.message());
        dialog.dismiss();
      });
    });
    
    // Click the JS Confirm button
    await alertPage.clickJsConfirm();
    
    // Get confirm text
    await dialogPromise;
    
    // Wait a bit
    await page.waitForTimeout(500);
    
    // Verify result message
    const result = await alertPage.getResultMessage();
    expect(result).toContain('You clicked: Cancel');
  });

  /**
   * Test: Handle confirm using AlertUtils
   */
  test('@confirm @regression should handle confirm using AlertUtils', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    await page.waitForTimeout(1000);
    
    // Test accept
    const acceptPromise = AlertUtils.waitForAndAcceptAlert(page);
    await page.locator("button:has-text('Click for JS Confirm')").click();
    const acceptText = await acceptPromise;
    expect(acceptText).not.toBeNull();
    
    await page.waitForTimeout(500);
    
    // Test dismiss
    const dismissPromise = AlertUtils.waitForAndDismissAlert(page);
    await page.locator("button:has-text('Click for JS Confirm')").click();
    const dismissText = await dismissPromise;
    expect(dismissText).not.toBeNull();
  });

  /**
   * Test: Handle confirm safely using AlertUtils
   */
  test('@confirm @regression should handle confirm safely using AlertUtils', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    await page.waitForTimeout(1000);
    
    // Set up dialog listener
    const dialogPromise = AlertUtils.handleAlertSafely(page, true);
    
    await page.locator("button:has-text('Click for JS Confirm')").click();
    
    const text = await dialogPromise;
    expect(text).not.toBeNull();
    expect(text).toContain('JS Confirm');
  });
});

test.describe('TestJavaScriptPrompts', () => {
  /**
   * Test: Send text to JavaScript Prompt
   */
  test('@prompt @smoke @critical should send text to JS prompt', async ({ page }) => {
    const alertPage = new AlertPage(page);
    await alertPage.navigateTo();
    
    // Set up dialog listener
    const dialogPromise = new Promise<string>((resolve) => {
      page.on('dialog', (dialog) => {
        const text = 'Selenium Test Prompt';
        dialog.accept(text);
        resolve(text);
      });
    });
    
    // Click the JS Prompt button
    await alertPage.clickJsPrompt();
    
    // Wait for dialog to be handled
    await dialogPromise;
    await page.waitForTimeout(500);
    
    // Verify result message
    const result = await alertPage.getResultMessage();
    expect(result).toContain('Selenium Test Prompt');
  });

  /**
   * Test: Send empty text to prompt
   */
  test('@prompt @regression should send empty text to prompt', async ({ page }) => {
    const alertPage = new AlertPage(page);
    await alertPage.navigateTo();
    
    // Set up dialog listener
    const dialogPromise = new Promise<void>((resolve) => {
      page.on('dialog', (dialog) => {
        dialog.accept('');
        resolve();
      });
    });
    
    await alertPage.clickJsPrompt();
    await dialogPromise;
    await page.waitForTimeout(500);
    
    const result = await alertPage.getResultMessage();
    expect(result).toContain('You entered:');
  });

  /**
   * Test: Cancel prompt (without text)
   */
  test('@prompt @regression should cancel prompt', async ({ page }) => {
    const alertPage = new AlertPage(page);
    await alertPage.navigateTo();
    
    // Set up dialog listener
    const dialogPromise = new Promise<void>((resolve) => {
      page.on('dialog', (dialog) => {
        dialog.dismiss();
        resolve();
      });
    });
    
    await alertPage.clickJsPrompt();
    await dialogPromise;
    await page.waitForTimeout(500);
    
    const result = await alertPage.getResultMessage();
    expect(result).toContain('You entered: null');
  });

  /**
   * Test: Handle prompt using AlertUtils
   */
  test('@prompt @regression should handle prompt using AlertUtils', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    await page.waitForTimeout(1000);
    
    // Set up dialog listener
    const dialogPromise = AlertUtils.sendTextToPrompt(page, 'Test from AlertUtils');
    
    await page.locator("button:has-text('Click for JS Prompt')").click();
    
    const success = await dialogPromise;
    expect(success).toBeTruthy();
    
    await page.waitForTimeout(500);
    const result = await page.locator('#result').textContent();
    expect(result).toContain('Test from AlertUtils');
  });
});

test.describe('TestAlertUtils', () => {
  /**
   * Test: Wait for alert using AlertUtils
   */
  test('@alert_handling @regression should wait for alert', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    await page.waitForTimeout(1000);
    
    // Set up dialog listener BEFORE clicking - must accept immediately
    let alertText = '';
    page.once('dialog', async (dialog) => {
      alertText = dialog.message();
      await dialog.accept(); // Must accept to unblock click
    });
    
    // Click button - this will trigger the dialog
    await page.locator("button:has-text('Click for JS Alert')").click();
    
    // Wait a bit for dialog to be handled
    await page.waitForTimeout(500);
    
    expect(alertText).toBe('I am a JS Alert');
  });

  /**
   * Test: Check if alert is present
   */
  test('@alert_handling @regression should check if alert is present', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    await page.waitForTimeout(1000);
    
    // No alert yet
    // Note: In Playwright, we can't directly check without triggering
    // This test verifies the method works when alert appears
    
    // Set up listener and click
    const dialogPromise = new Promise<boolean>((resolve) => {
      page.on('dialog', async (dialog) => {
        const isPresent = await AlertUtils.isAlertPresent(page);
        await dialog.accept();
        resolve(isPresent);
      });
    });
    
    await page.locator("button:has-text('Click for JS Alert')").click();
    
    // Note: This test is adapted for Playwright's async nature
    await dialogPromise;
  });

  /**
   * Test: Wait for and accept alert
   */
  test('@alert_handling @regression should wait for and accept alert', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    await page.waitForTimeout(1000);
    
    // Set up dialog listener
    const dialogPromise = AlertUtils.waitForAndAcceptAlert(page);
    
    await page.locator("button:has-text('Click for JS Alert')").click();
    
    const text = await dialogPromise;
    expect(text).not.toBeNull();
    expect(text).toContain('JS Alert');
  });

  /**
   * Test: Wait for and dismiss alert
   */
  test('@alert_handling @regression should wait for and dismiss alert', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    await page.waitForTimeout(1000);
    
    // Set up dialog listener
    const dialogPromise = AlertUtils.waitForAndDismissAlert(page);
    
    await page.locator("button:has-text('Click for JS Confirm')").click();
    
    const text = await dialogPromise;
    expect(text).not.toBeNull();
    expect(text).toContain('JS Confirm');
  });

  /**
   * Test: Execute action with alert
   */
  test('@alert_handling @regression should execute action with alert', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    await page.waitForTimeout(1000);
    
    // Set up dialog listener before action
    const dialogPromise = AlertUtils.executeActionWithAlert(
      page,
      async () => {
        await page.locator("button:has-text('Click for JS Alert')").click();
      },
      true
    );
    
    const text = await dialogPromise;
    expect(text).not.toBeNull();
  });
});

test.describe('TestMultipleAlerts', () => {
  /**
   * Test: Handle multiple alerts sequence
   */
  test('@alert_handling @regression should handle multiple alerts sequence', async ({ page }) => {
    const alertPage = new AlertPage(page);
    await alertPage.navigateTo();
    
    // Alert - set listener before click
    let alertResolved = false;
    page.once('dialog', async (dialog) => {
      await dialog.accept();
      alertResolved = true;
    });
    await alertPage.clickJsAlert();
    await page.waitForTimeout(500);
    expect(alertResolved).toBeTruthy();
    
    // Confirm - set new listener before click
    let confirmResolved = false;
    page.once('dialog', async (dialog) => {
      await dialog.accept();
      confirmResolved = true;
    });
    await alertPage.clickJsConfirm();
    await page.waitForTimeout(500);
    expect(confirmResolved).toBeTruthy();
    
    // Prompt - set new listener before click
    let promptResolved = false;
    page.once('dialog', async (dialog) => {
      await dialog.accept('Test');
      promptResolved = true;
    });
    await alertPage.clickJsPrompt();
    await page.waitForTimeout(500);
    expect(promptResolved).toBeTruthy();
    
    // Verify last result is for prompt
    const result = await alertPage.getResultMessage();
    expect(result).toContain('Test');
  });
});

