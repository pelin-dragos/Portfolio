import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Pattern - Google Search Page
 * Represents Google Search page for search automation
 */
export interface SearchResult {
  title: string;
  link: string;
  snippet: string;
}

export class GoogleSearchPage {
  readonly page: Page;
  
  // Locators
  readonly searchBox: Locator;
  readonly searchButton: Locator;
  readonly luckyButton: Locator;
  readonly searchResults: Locator;
  readonly autocompleteSuggestions: Locator;
  
  private readonly baseUrl: string = 'https://www.google.com';

  constructor(page: Page) {
    this.page = page;

    // Main locators - multiple selectors for robustness
    this.searchBox = page.locator('textarea[name="q"], input[name="q"]').first();
    this.searchButton = page.locator('input[name="btnK"]');
    this.luckyButton = page.locator('input[name="btnI"]');
    
    // Results locators
    this.searchResults = page.locator('div.g, div[data-ved]').filter({ has: page.locator('h3') });
    
    // Autocomplete locators
    this.autocompleteSuggestions = page.locator('ul[role="listbox"] li[role="presentation"], ul[role="listbox"] li');
  }

  /**
   * Navigate to Google Search
   */
  async navigateTo(): Promise<void> {
    await this.page.goto(this.baseUrl);
    await this.page.waitForTimeout(1000);
  }

  /**
   * Accept cookies if popup appears
   * 
   * @returns true if popup was found and accepted, false otherwise
   */
  async acceptCookies(): Promise<boolean> {
    try {
      await this.page.waitForTimeout(2000);
      
      // Try multiple selectors for accept button (different languages)
      const acceptSelectors = [
        'button:has-text("Accept all")',
        'button:has-text("Accept All")',
        'button:has-text("Acceptă tot")',
        'div[role="dialog"] button:has-text("Accept")',
        'button:has-text("Accept"):not(:has-text("More"))',
      ];
      
      for (const selector of acceptSelectors) {
        try {
          const acceptButton = this.page.locator(selector).first();
          if (await acceptButton.isVisible({ timeout: 2000 })) {
            await acceptButton.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(300);
            await acceptButton.click();
            await this.page.waitForTimeout(1000);
            return true;
          }
        } catch {
          continue;
        }
      }
      
      return false;
    } catch {
      return false;
    }
  }

  /**
   * Reject cookies if popup appears
   * 
   * @returns true if popup was found and rejected, false otherwise
   */
  async rejectCookies(): Promise<boolean> {
    try {
      await this.page.waitForTimeout(2000);
      
      // Try multiple selectors for reject button (different languages)
      const rejectSelectors = [
        'button:has-text("Reject all")',
        'button:has-text("Reject All")',
        'button:has-text("Respinge tot")',
        'div[role="dialog"] button:has-text("Reject")',
        'button:has-text("Reject")',
      ];
      
      for (const selector of rejectSelectors) {
        try {
          const rejectButton = this.page.locator(selector).first();
          if (await rejectButton.isVisible({ timeout: 2000 })) {
            await rejectButton.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(300);
            await rejectButton.click();
            await this.page.waitForTimeout(1000);
            return true;
          }
        } catch {
          continue;
        }
      }
      
      return false;
    } catch {
      return false;
    }
  }

  /**
   * Enter search query
   */
  async enterSearchQuery(query: string): Promise<void> {
    try {
      // Wait for search box to be visible
      await this.searchBox.waitFor({ state: 'visible', timeout: 15000 });
    } catch {
      // Try alternative selector if main one fails
      const altSearchBox = this.page.locator('textarea, input[type="text"]').first();
      await altSearchBox.waitFor({ state: 'visible', timeout: 15000 });
      await altSearchBox.clear();
      await altSearchBox.fill(query);
      await this.page.waitForTimeout(500);
      return;
    }
    await this.searchBox.clear();
    await this.searchBox.fill(query);
    await this.page.waitForTimeout(500); // Wait for autocomplete
  }

  /**
   * Submit search (Enter key)
   */
  async submitSearch(): Promise<void> {
    await this.searchBox.press('Enter');
    // Wait for navigation to search results page
    await this.page.waitForURL(/.*google.com\/search.*/, { timeout: 15000 }).catch(() => {
      // If URL doesn't change, wait a bit more
    });
    await this.page.waitForTimeout(3000); // Wait for results to load
  }

  /**
   * Perform complete search
   */
  async search(query: string, acceptCookies: boolean = true): Promise<void> {
    await this.navigateTo();
    
    // Handle cookies
    if (acceptCookies) {
      await this.acceptCookies();
    }
    
    // Perform search
    await this.enterSearchQuery(query);
    await this.submitSearch();
  }

  /**
   * Get autocomplete suggestions for a query
   */
  async getAutocompleteSuggestions(query: string, maxSuggestions: number = 5): Promise<string[]> {
    await this.enterSearchQuery(query);
    await this.page.waitForTimeout(1000);
    
    try {
      const suggestions = this.autocompleteSuggestions;
      const count = await suggestions.count();
      
      const suggestionTexts: string[] = [];
      const limit = Math.min(count, maxSuggestions);
      
      for (let i = 0; i < limit; i++) {
        try {
          const text = await suggestions.nth(i).textContent();
          if (text && text.trim()) {
            suggestionTexts.push(text.trim());
          }
        } catch {
          continue;
        }
      }
      
      return suggestionTexts;
    } catch {
      return [];
    }
  }

  /**
   * Check if Google shows reCAPTCHA/sorry page
   */
  async isRecaptchaPage(): Promise<boolean> {
    try {
      const currentUrl = this.page.url();
      if (currentUrl.includes('/sorry') || currentUrl.includes('sorry/index')) {
        return true;
      }
      
      // Check for reCAPTCHA elements
      const recaptchaVisible = await this.page.locator('text=/I\'m not a robot/i, text=/unusual traffic/i').first().isVisible({ timeout: 2000 }).catch(() => false);
      return recaptchaVisible;
    } catch {
      return false;
    }
  }

  /**
   * Get search results
   */
  async getSearchResults(maxResults: number = 10): Promise<SearchResult[]> {
    try {
      // Check if Google blocked us with reCAPTCHA
      if (await this.isRecaptchaPage()) {
        // Google detected automation - return empty array
        return [];
      }
      
      // Verify we're on search results page
      const currentUrl = this.page.url();
      const isSearchPage = currentUrl.includes('/search') || currentUrl.includes('?q=');
      
      if (!isSearchPage) {
        // If not on search page, return empty (search might have failed)
        return [];
      }
      
      // Wait for results to be loaded - try multiple selectors
      try {
        await this.page.waitForSelector('div.g', { timeout: 10000 });
      } catch {
        try {
          // Alternative: wait for any result container
          await this.page.waitForSelector('h3', { timeout: 10000 });
        } catch {
          // Another alternative: wait for search results container
          await this.page.waitForSelector('#search, #rso, div[data-async-context]', { timeout: 10000 });
        }
      }
      await this.page.waitForTimeout(3000); // Wait for results to fully load
      
      const results: SearchResult[] = [];
      
      // Try multiple selectors for results
      let resultElements = this.page.locator('div.g').filter({ has: this.page.locator('h3') });
      let count = await resultElements.count();
      
      // If no results with div.g, try alternative selectors
      if (count === 0) {
        resultElements = this.page.locator('div[data-ved]').filter({ has: this.page.locator('h3') });
        count = await resultElements.count();
      }
      
      if (count === 0) {
        // Try getting h3 elements directly
        const h3Elements = this.page.locator('h3');
        count = await h3Elements.count();
        const limit = Math.min(count, maxResults);
        
        for (let i = 0; i < limit; i++) {
          try {
            const h3 = h3Elements.nth(i);
            const title = await h3.textContent();
            if (title && title.trim()) {
              const resultInfo: SearchResult = {
                title: title.trim(),
                link: '',
                snippet: ''
              };
              
              // Try to find link
              try {
                const parent = h3.locator('..');
                const link = parent.locator('a').first();
                if (await link.isVisible()) {
                  resultInfo.link = (await link.getAttribute('href')) || '';
                }
              } catch {}
              
              results.push(resultInfo);
            }
          } catch {
            continue;
          }
        }
        return results;
      }
      
      const limit = Math.min(count, maxResults);
      
      for (let i = 0; i < limit; i++) {
        try {
          const element = resultElements.nth(i);
          
          const resultInfo: SearchResult = {
            title: '',
            link: '',
            snippet: ''
          };
          
          // Extract title
          try {
            const titleElem = element.locator('h3').first();
            if (await titleElem.isVisible()) {
              resultInfo.title = (await titleElem.textContent()) || '';
            }
          } catch {}
          
          // Extract link
          try {
            const linkElem = element.locator('a').first();
            if (await linkElem.isVisible()) {
              resultInfo.link = (await linkElem.getAttribute('href')) || '';
            }
          } catch {}
          
          // Extract snippet
          try {
            const snippetElem = element.locator('span, div[style*="line-clamp"], div[data-sncf]').first();
            if (await snippetElem.isVisible()) {
              resultInfo.snippet = (await snippetElem.textContent()) || '';
            }
          } catch {}
          
          if (resultInfo.title || resultInfo.link) {
            results.push(resultInfo);
          }
        } catch {
          continue;
        }
      }
      
      return results;
    } catch {
      return [];
    }
  }

  /**
   * Verify if a result contains keywords
   */
  verifyResultContainsKeywords(result: SearchResult, keywords: string[]): boolean {
    const textToSearch = `${result.title} ${result.snippet}`.toLowerCase();
    
    for (const keyword of keywords) {
      if (textToSearch.includes(keyword.toLowerCase())) {
        return true;
      }
    }
    
    return false;
  }

  /**
   * Verify that first maxResults results are relevant for query
   */
  async verifyResultsRelevant(query: string, maxResults: number = 3): Promise<boolean> {
    const results = await this.getSearchResults(maxResults);
    
    if (results.length === 0) {
      return false;
    }
    
    // Extract keywords from query
    const keywords = query.toLowerCase().split();
    
    // Verify each result
    let relevantCount = 0;
    for (const result of results) {
      if (this.verifyResultContainsKeywords(result, keywords)) {
        relevantCount++;
      }
    }
    
    // Consider relevant if at least 70% of results contain keywords
    return (relevantCount / results.length) >= 0.7;
  }

  /**
   * Check if page is loaded correctly
   */
  async isLoaded(): Promise<boolean> {
    try {
      await expect(this.searchBox).toBeVisible({ timeout: 10000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get page title
   */
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Get current URL
   */
  getCurrentUrl(): string {
    return this.page.url();
  }
}

