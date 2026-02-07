import { Page } from '@playwright/test';

/**
 * Page Object Pattern - JSON Viewer Page
 * Pentru vizualizare JSON în browser (pentru verificare API data)
 */
export class JSONViewerPage {
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
   * Obține JSON din pagină
   */
  async getJsonFromPage(): Promise<any> {
    try {
      // Metoda 1: Din <pre> tag
      const preElement = this.page.locator('pre').first();
      if (await preElement.isVisible().catch(() => false)) {
        const jsonText = await preElement.textContent();
        if (jsonText) {
          return JSON.parse(jsonText);
        }
      }

      // Metoda 2: Din body (raw JSON)
      const bodyElement = this.page.locator('body');
      const bodyText = await bodyElement.textContent();
      
      if (bodyText) {
        const trimmedText = bodyText.trim();
        if (trimmedText.startsWith('{') || trimmedText.startsWith('[')) {
          return JSON.parse(trimmedText);
        }
      }

      return null;
    } catch (error) {
      console.error(`Error getting JSON from page: ${error}`);
      return null;
    }
  }

  /**
   * Verifică dacă pagina conține JSON valid
   */
  async isJsonValid(): Promise<boolean> {
    const jsonData = await this.getJsonFromPage();
    return jsonData !== null;
  }

  /**
   * Verifică dacă JSON-ul conține o cheie (și opțional valoarea)
   */
  async verifyJsonContains(key: string, value?: any): Promise<boolean> {
    const jsonData = await this.getJsonFromPage();

    if (jsonData === null) {
      return false;
    }

    // Verifică în dict sau list
    if (Array.isArray(jsonData)) {
      // Caută în toate item-urile din listă
      for (const item of jsonData) {
        if (typeof item === 'object' && item !== null && key in item) {
          if (value === undefined) {
            return true;
          }
          if (item[key] === value) {
            return true;
          }
        }
      }
    } else if (typeof jsonData === 'object' && jsonData !== null) {
      if (key in jsonData) {
        if (value === undefined) {
          return true;
        }
        return jsonData[key] === value;
      }
    }

    return false;
  }

  /**
   * Găsește un item într-o listă JSON după un field
   */
  async findItemByField(fieldName: string, fieldValue: any): Promise<any> {
    const jsonData = await this.getJsonFromPage();

    if (jsonData === null) {
      return null;
    }

    if (Array.isArray(jsonData)) {
      for (const item of jsonData) {
        if (typeof item === 'object' && item !== null && item[fieldName] === fieldValue) {
          return item;
        }
      }
    }

    return null;
  }
}

