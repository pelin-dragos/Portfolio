import { test, expect } from '@playwright/test';
import { TheInternetPage } from '../pages/TheInternetPage';

/**
 * Test Suite: Cross-Browser Navigation Testing
 * Tests run automatically on Chromium, Firefox, and WebKit
 * Each test case executes on all configured browsers
 */

test.describe('Cross-Browser Navigation Tests', () => {
  
  test('should navigate to homepage', async ({ page }) => {
    /**
     * Test: Navigate to homepage on all browsers
     */
    const internetPage = new TheInternetPage(page);
    await internetPage.navigateTo('');
    
    // Verify page is loaded
    const isLoaded = await internetPage.isPageLoaded();
    expect(isLoaded).toBeTruthy();
    
    // Verify URL is correct
    const currentUrl = internetPage.getCurrentUrl();
    expect(currentUrl).toContain('the-internet.herokuapp.com');
  });

  test.describe('Navigate to different pages', () => {
    const pages = ['', 'login', 'checkboxes', 'dropdown'];

    for (const path of pages) {
      test(`should navigate to page: ${path || 'homepage'}`, async ({ page }) => {
        /**
         * Test: Navigate to different pages on all browsers (parametrized)
         */
        const internetPage = new TheInternetPage(page);
        await internetPage.navigateTo(path);
        
        // Verify page is loaded
        const isLoaded = await internetPage.isPageLoaded();
        expect(isLoaded).toBeTruthy();
        
        // For non-homepage paths, verify URL contains the path
        if (path) {
          const currentUrl = internetPage.getCurrentUrl();
          expect(currentUrl).toContain(path);
        } else {
          // For homepage, verify base URL
          const currentUrl = internetPage.getCurrentUrl();
          expect(currentUrl).toContain('the-internet.herokuapp.com');
        }
      });
    }
  });

  test('should have visible page elements', async ({ page }) => {
    /**
     * Test: Verify page elements are visible on all browsers
     */
    const internetPage = new TheInternetPage(page);
    await internetPage.navigateTo('');
    
    // Verify page is loaded
    const isLoaded = await internetPage.isPageLoaded();
    expect(isLoaded).toBeTruthy();
    
    // Verify body element is present
    const bodyVisible = await internetPage.isElementVisible('body');
    expect(bodyVisible).toBeTruthy();
    
    // Verify there are links on the page
    const links = await internetPage.getAllLinks();
    expect(links.length).toBeGreaterThan(0);
  });
});

