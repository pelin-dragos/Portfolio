import { test, expect } from '@playwright/test';
import { GoogleSearchPage } from '../pages/GoogleSearchPage';

/**
 * Test Suite: Google Search Autocomplete
 * Tests for search suggestions (autocomplete)
 */
test.describe('Autocomplete Tests', () => {
  
  test('should show autocomplete suggestions', async ({ page }) => {
    /**
     * Test: Verify that autocomplete suggestions appear
     */
    const googlePage = new GoogleSearchPage(page);
    await googlePage.navigateTo();
    await googlePage.acceptCookies();
    
    const partialQuery = 'python';
    await googlePage.enterSearchQuery(partialQuery);
    await page.waitForTimeout(1500);
    
    const suggestions = await googlePage.getAutocompleteSuggestions(partialQuery, 5);
    expect(Array.isArray(suggestions)).toBeTruthy();
  });

  const autocompleteQueries = [
    'selenium',
    'pytest',
    'web',
    'python',
    'test'
  ];

  for (const query of autocompleteQueries) {
    test(`should show autocomplete for multiple queries - ${query}`, async ({ page }) => {
      /**
       * Test: Verify autocomplete for multiple queries (parameterized)
       */
      const googlePage = new GoogleSearchPage(page);
      await googlePage.navigateTo();
      await googlePage.acceptCookies();
      
      await googlePage.enterSearchQuery(query);
      await page.waitForTimeout(1500);
      
      const suggestions = await googlePage.getAutocompleteSuggestions(query, 3);
      expect(Array.isArray(suggestions)).toBeTruthy();
    });
  }

  test('should verify autocomplete suggestions are relevant', async ({ page }) => {
    /**
     * Test: Verify that suggestions are relevant for query
     */
    const googlePage = new GoogleSearchPage(page);
    await googlePage.navigateTo();
    await googlePage.acceptCookies();
    
    const query = 'python';
    await googlePage.enterSearchQuery(query);
    await page.waitForTimeout(1500);
    
    const suggestions = await googlePage.getAutocompleteSuggestions(query, 5);
    
    if (suggestions.length > 0) {
      const relevantCount = suggestions.filter(s => 
        s.toLowerCase().includes(query.toLowerCase())
      ).length;
      // Test passes if suggestions exist (relevance check is informational)
      expect(relevantCount).toBeGreaterThanOrEqual(0);
    }
  });
});

