import { Page, Locator, expect } from '@playwright/test';
import { LoginPage } from './LoginPage';

/**
 * Page Object Pattern - Products Page (pagina după login)
 * Reprezintă pagina care apare după login de succes
 */
export class ProductsPage {
  readonly page: Page;
  readonly inventoryContainer: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;
  readonly shoppingCart: Locator;
  readonly pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;

    // Locatori
    this.inventoryContainer = page.locator('#inventory_container');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
    this.shoppingCart = page.locator('.shopping_cart_link');
    this.pageTitle = page.locator('.title');
  }

  /**
   * Verifică dacă pagina de produse este încărcată
   * 
   * @returns true dacă pagina este încărcată
   */
  async isLoaded(): Promise<boolean> {
    try {
      // Așteaptă ca URL-ul să conțină 'inventory' (pagina de produse)
      await this.page.waitForURL(/.*inventory.*/, { timeout: 15000 });
      
      // Așteaptă ca elementul container să fie prezent și vizibil
      await expect(this.inventoryContainer).toBeVisible({ timeout: 10000 });
      
      return true;
    } catch (error) {
      // Dacă prima verificare eșuează, verifică alternativ
      try {
        const currentUrl = this.getCurrentUrl();
        if (currentUrl.includes('inventory')) {
          // Dacă URL-ul este corect, așteaptă meniul care este sigur prezent
          await expect(this.menuButton).toBeVisible({ timeout: 5000 });
          return true;
        }
      } catch {
        return false;
      }
      return false;
    }
  }

  /**
   * Returnează titlul paginii
   */
  async getPageTitle(): Promise<string | null> {
    try {
      return await this.pageTitle.textContent();
    } catch {
      return null;
    }
  }

  /**
   * Returnează URL-ul curent
   */
  getCurrentUrl(): string {
    return this.page.url();
  }

  /**
   * Deschide meniul hamburger
   */
  async openMenu(): Promise<void> {
    await this.menuButton.click();
    // Așteaptă ca meniul să fie deschis
    await expect(this.logoutLink).toBeVisible();
  }

  /**
   * Face logout din aplicație
   * 
   * @returns instanță a paginii de login
   */
  async logout(): Promise<LoginPage> {
    await this.openMenu();
    await this.logoutLink.click();
    
    // Așteaptă redirect la pagina de login
    await this.page.waitForURL(/.*saucedemo\.com.*/, { timeout: 5000 });
    
    return new LoginPage(this.page);
  }

  /**
   * Verifică dacă utilizatorul este logat
   * 
   * @returns true dacă utilizatorul este logat (pagina de produse este vizibilă)
   */
  async isLoggedIn(): Promise<boolean> {
    const isLoaded = await this.isLoaded();
    const currentUrl = this.getCurrentUrl();
    return isLoaded && currentUrl.includes('inventory');
  }
}

