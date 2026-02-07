import { Page } from '@playwright/test';

/**
 * Page Object Pattern - API UI Sync Page
 * Pentru verificarea sincronizării între API și UI
 * Folosește un site care afișează date din API
 */
export class APIUISyncPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navighează la o URL
   */
  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /**
   * Așteaptă ca pagina să se încarce
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(1000);
  }

  /**
   * Verifică dacă pagina este încărcată
   */
  async isLoaded(): Promise<boolean> {
    try {
      const body = this.page.locator('body');
      return await body.isVisible();
    } catch {
      return false;
    }
  }

  /**
   * Verifică dacă un item cu ID-ul specificat este prezent în UI
   */
  async verifyItemPresent(itemId: number | string): Promise<boolean> {
    const pageContent = await this.page.content();
    return pageContent.includes(String(itemId));
  }

  /**
   * Verifică dacă datele unui item din UI corespund cu datele așteptate
   */
  async verifyItemData(itemId: number | string, expectedData: Record<string, any>): Promise<boolean> {
    const pageContent = await this.page.content();

    for (const [key, value] of Object.entries(expectedData)) {
      // Verifică că valoarea este prezentă în page
      if (!pageContent.includes(String(value))) {
        return false;
      }
    }

    return true;
  }

  /**
   * Returnează numărul de item-uri afișate în UI
   */
  async getAllItemsCount(): Promise<number> {
    try {
      // Pentru JSONPlaceholder, putem căuta pattern-uri simple
      const pageContent = await this.page.content();
      
      // Caută pattern-uri de ID-uri în JSON
      const idMatches = pageContent.match(/"id"\s*:\s*\d+/g);
      return idMatches ? idMatches.length : 0;
    } catch {
      return 0;
    }
  }
}

