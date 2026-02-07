import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Pattern - Login Page
 * Reprezintă pagina de login pentru site-uri demo (SauceDemo, DemoQA, etc.)
 */
export class LoginPage {
  readonly page: Page;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly loginContainer: Locator;
  private baseUrl: string;

  constructor(page: Page, baseUrl: string = 'https://www.saucedemo.com/') {
    this.page = page;
    this.baseUrl = baseUrl;

    // Locatori pentru elementele de pe pagină
    this.usernameField = page.locator('#user-name');
    this.passwordField = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('h3[data-test="error"]');
    this.loginContainer = page.locator('.login-container');
  }

  /**
   * Navighează către pagina de login
   */
  async navigateTo(): Promise<void> {
    await this.page.goto(this.baseUrl);
    await expect(this.loginButton).toBeVisible();
  }

  /**
   * Introduce numele de utilizator
   * 
   * @param username - numele de utilizator de introdus
   */
  async enterUsername(username: string): Promise<void> {
    await this.usernameField.clear();
    await this.usernameField.fill(username);
  }

  /**
   * Introduce parola
   * 
   * @param password - parola de introdus
   */
  async enterPassword(password: string): Promise<void> {
    await this.passwordField.clear();
    await this.passwordField.fill(password);
  }

  /**
   * Click pe butonul de login
   */
  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  /**
   * Metodă care face login complet
   * 
   * @param username - numele de utilizator
   * @param password - parola
   */
  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
    // Așteaptă navigarea către pagina de produse după login
    await this.page.waitForURL(/.*inventory.*/, { timeout: 15000 }).catch(() => {
      // Dacă nu ajunge la inventory, probabil login-ul a eșuat
      // Nu aruncăm eroare aici, lasă testele să verifice
    });
  }

  /**
   * Returnează mesajul de eroare dacă există
   * 
   * @returns mesajul de eroare sau null
   */
  async getErrorMessage(): Promise<string | null> {
    try {
      const errorElement = this.errorMessage;
      if (await errorElement.isVisible()) {
        return await errorElement.textContent();
      }
      return null;
    } catch {
      return null;
    }
  }

  /**
   * Verifică dacă pagina de login este încărcată corect
   * 
   * @returns true dacă pagina este încărcată, false altfel
   */
  async isLoaded(): Promise<boolean> {
    try {
      await expect(this.loginButton).toBeVisible({ timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Returnează titlul paginii
   */
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Verifică dacă este afișat un mesaj de eroare
   * 
   * @returns true dacă există mesaj de eroare, false altfel
   */
  async isErrorMessageDisplayed(): Promise<boolean> {
    const errorMessage = await this.getErrorMessage();
    return errorMessage !== null && errorMessage.length > 0;
  }
}

