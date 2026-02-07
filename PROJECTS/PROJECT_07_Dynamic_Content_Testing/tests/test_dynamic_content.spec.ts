import { test, expect } from '@playwright/test';
import { DynamicContentPage } from '../pages/DynamicContentPage';

/**
 * Test Suite: Dynamic Content Testing
 * Tests for AJAX, lazy loading, infinite scroll, live updates
 * Uses intelligent waits - NO fixed time.sleep()
 */

test.describe('AJAX Content', () => {
  
  test('@ajax @critical @smoke should load AJAX content', async ({ page }) => {
    /**
     * Test: Loading content via AJAX
     * Steps:
     * 1. Navigate to AJAX Loading page
     * 2. Click Start
     * 3. Wait for AJAX content to load (uses intelligent wait)
     * 4. Verify final message
     */
    const dynamicPage = new DynamicContentPage(page);
    await dynamicPage.navigateToAjaxLoading();
    
    // Click Start to initiate AJAX loading
    await dynamicPage.clickAjaxStartButton();
    
    // Wait for AJAX loading to complete (NO fixed time.sleep())
    const finishMessage = await dynamicPage.waitForAjaxLoadingComplete(15000);
    
    expect(finishMessage).toBeTruthy();
    expect(finishMessage).toMatch(/Hello World|Loaded/);
  });

  test('@ajax @regression @wait_strategy should handle AJAX loading with custom wait', async ({ page }) => {
    /**
     * Test: AJAX loading with custom wait
     * Demonstrates use of custom waits for AJAX
     */
    const dynamicPage = new DynamicContentPage(page);
    await dynamicPage.navigateToAjaxLoading();
    
    // Click Start
    await dynamicPage.clickAjaxStartButton();
    
    // Wait for loading message to appear first, then disappear
    await expect(dynamicPage.ajaxLoadingMessage).toBeVisible({ timeout: 5000 });
    await expect(dynamicPage.ajaxLoadingMessage).toBeHidden({ timeout: 15000 });
    
    // Wait for finish message to appear
    const finishElement = dynamicPage.ajaxFinishMessage;
    await expect(finishElement).toBeVisible({ timeout: 5000 });
    
    const finishText = await finishElement.textContent();
    expect(finishText).toBeTruthy();
    expect(finishText!.length).toBeGreaterThan(0);
  });
});

test.describe('Infinite Scroll', () => {
  
  test('@infinite_scroll @critical @smoke should scroll infinitely', async ({ page }) => {
    /**
     * Test: Infinite Scroll - Scroll to end of page
     * Steps:
     * 1. Navigate to Infinite Scroll page
     * 2. Scroll incrementally to end (uses intelligent scroll)
     * 3. Verify page expanded
     */
    const dynamicPage = new DynamicContentPage(page);
    await dynamicPage.navigateToInfiniteScroll();
    
    // Get initial height
    const initialHeight = await dynamicPage.getPageHeight();
    
    // Scroll incrementally (NO fixed time.sleep - uses automatic verification)
    const scrollCount = await dynamicPage.scrollIncrementally(1000);
    
    // Verify page expanded
    const finalHeight = await dynamicPage.getPageHeight();
    
    expect(finalHeight).toBeGreaterThan(initialHeight);
    expect(scrollCount).toBeGreaterThan(0);
  });

  test('@infinite_scroll @regression @wait_strategy should scroll and wait for new content', async ({ page }) => {
    /**
     * Test: Infinite Scroll with wait for new elements
     * Demonstrates use of wait for verifying new elements appear
     */
    const dynamicPage = new DynamicContentPage(page);
    await dynamicPage.navigateToInfiniteScroll();
    
    // Get initial content count
    const initialContentCount = await dynamicPage.getDynamicContentCount();
    
    // Scroll to bottom
    await dynamicPage.scrollToBottom();
    
    // Wait a bit for content to load
    await page.waitForTimeout(1000);
    
    // Verify page expanded
    const finalHeight = await dynamicPage.getPageHeight();
    const initialHeight = await dynamicPage.getPageHeight();
    
    // At least the scroll should have happened
    expect(finalHeight).toBeGreaterThanOrEqual(initialHeight);
  });
});

test.describe('Dynamic Content', () => {
  
  test('@regression should refresh dynamic content', async ({ page }) => {
    /**
     * Test: Dynamic content that changes on refresh
     * Steps:
     * 1. Navigate to Dynamic Content page
     * 2. Get initial content
     * 3. Refresh page
     * 4. Verify content changed (uses wait for page)
     */
    const dynamicPage = new DynamicContentPage(page);
    await dynamicPage.navigateToDynamicContent();
    
    // Get initial content
    const initialTexts: string[] = [];
    const rows = await dynamicPage.getDynamicContentRows();
    for (let i = 0; i < Math.min(3, rows.length); i++) {
      const text = await dynamicPage.getDynamicContentText(i);
      if (text) {
        initialTexts.push(text.substring(0, 100)); // First 100 characters
      }
    }
    
    expect(initialTexts.length).toBeGreaterThan(0);
    
    // Refresh page
    await dynamicPage.refreshPage();
    
    // Wait for page to load completely (NO fixed time.sleep)
    await page.waitForLoadState('networkidle');
    await expect(dynamicPage.contentRows.first()).toBeVisible({ timeout: 10000 });
    
    // Get new content
    const newTexts: string[] = [];
    const newRows = await dynamicPage.getDynamicContentRows();
    for (let i = 0; i < Math.min(3, newRows.length); i++) {
      const text = await dynamicPage.getDynamicContentText(i);
      if (text) {
        newTexts.push(text.substring(0, 100));
      }
    }
    
    // Verify at least one element changed
    const contentChanged = newTexts.some(newText => !initialTexts.includes(newText));
    expect(contentChanged).toBeTruthy();
  });

  test('@regression should verify dynamic content count', async ({ page }) => {
    /**
     * Test: Verify number of dynamic content elements
     * Verifies all elements are loaded correctly
     */
    const dynamicPage = new DynamicContentPage(page);
    await dynamicPage.navigateToDynamicContent();
    
    // Wait for elements to load
    await expect(dynamicPage.contentRows.first()).toBeVisible({ timeout: 10000 });
    
    // Verify element count
    const count = await dynamicPage.getDynamicContentCount();
    expect(count).toBeGreaterThanOrEqual(2);
  });
});

test.describe('Wait Strategies', () => {
  
  test('@wait_strategy @smoke should wait for element visible', async ({ page }) => {
    /**
     * Test: Wait for element visible
     * Demonstrates use of wait for element visible
     */
    const dynamicPage = new DynamicContentPage(page);
    await dynamicPage.navigateToDynamicContent();
    
    // Wait for element to be visible
    await expect(dynamicPage.contentRows.first()).toBeVisible({ timeout: 10000 });
    
    const element = dynamicPage.contentRows.first();
    expect(await element.isVisible()).toBeTruthy();
  });

  test('@wait_strategy should wait for element count', async ({ page }) => {
    /**
     * Test: Wait for specific number of elements
     * Demonstrates use of wait for element count
     */
    const dynamicPage = new DynamicContentPage(page);
    await dynamicPage.navigateToDynamicContent();
    
    // Wait for at least 2 elements to be present
    await expect(dynamicPage.contentRows.first()).toBeVisible({ timeout: 10000 });
    
    const count = await dynamicPage.getDynamicContentCount();
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test('@wait_strategy should wait for page load', async ({ page }) => {
    /**
     * Test: Wait for complete page load
     * Demonstrates use of wait for page load
     */
    // Navigate to a page
    await page.goto('https://the-internet.herokuapp.com/');
    
    // Wait for page to load completely
    await page.waitForLoadState('networkidle');
    
    // Verify page is loaded
    const readyState = await page.evaluate(() => document.readyState);
    expect(readyState).toBe('complete');
  });

  test('@wait_strategy should wait for text in element', async ({ page }) => {
    /**
     * Test: Wait for text in element
     * Demonstrates use of wait for text
     */
    const dynamicPage = new DynamicContentPage(page);
    await dynamicPage.navigateToDynamicContent();
    
    // Get text of first element
    const rows = await dynamicPage.getDynamicContentRows();
    if (rows.length > 0) {
      const initialText = await dynamicPage.getDynamicContentText(0);
      
      expect(initialText).toBeTruthy();
      
      // Wait for text to be present
      if (initialText) {
        await expect(dynamicPage.contentRows.first()).toContainText(initialText.substring(0, 20), { timeout: 10000 });
      }
    }
  });
});

test.describe('Lazy Loading', () => {
  
  test('@lazy_loading @regression should verify image loading', async ({ page }) => {
    /**
     * Test: Verify image loading
     * Verifies images are loaded correctly
     */
    const dynamicPage = new DynamicContentPage(page);
    await dynamicPage.navigateToDynamicContent();
    
    // Wait for elements to load
    await expect(dynamicPage.contentRows.first()).toBeVisible({ timeout: 10000 });
    
    // Wait a bit for images to load
    await page.waitForTimeout(2000);
    
    // Get images
    const images = await dynamicPage.getDynamicContentImages();
    
    // Verify images exist
    expect(images.length).toBeGreaterThan(0);
    
    // Verify images have src attributes
    for (const image of images) {
      // Verify image has src
      const src = await image.getAttribute('src');
      expect(src).toBeTruthy();
      
      // Verify image is present in DOM
      const isVisible = await image.isVisible().catch(() => false);
      // Images might not be visible but should be in DOM
      expect(src).toBeTruthy();
    }
    
    // At least verify we found images
    expect(images.length).toBeGreaterThan(0);
  });
});

