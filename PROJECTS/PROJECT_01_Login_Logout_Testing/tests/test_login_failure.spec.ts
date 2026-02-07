import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

/**
 * Test Suite: Login Failure Scenarios
 * Teste pentru login cu credențiale invalide și cazuri negative
 */
test.describe('Login Failure Tests', () => {
  
  test('should show error message with invalid username', async ({ page }) => {
    /**
     * Test: Login cu username invalid și parolă validă
     * 
     * Expected: Mesaj de eroare afișat
     */
    const loginPage = new LoginPage(page);
    
    // Step 1: Navighează către pagina de login
    await loginPage.navigateTo();
    expect(await loginPage.isLoaded()).toBeTruthy();
    
    // Step 2: Încearcă login cu username invalid
    await loginPage.login('invalid_user', 'secret_sauce');
    
    // Step 3: Verifică că apare mesajul de eroare
    const errorMessage = await loginPage.getErrorMessage();
    
    expect(errorMessage).not.toBeNull();
    expect(errorMessage?.length).toBeGreaterThan(0);
  });

  test('should show error message with invalid password', async ({ page }) => {
    /**
     * Test: Login cu username valid și parolă invalidă
     * 
     * Expected: Mesaj de eroare afișat
     */
    const loginPage = new LoginPage(page);
    
    // Step 1: Navighează și încearcă login cu parolă greșită
    await loginPage.navigateTo();
    await loginPage.login('standard_user', 'wrong_password');
    
    // Step 2: Verifică mesajul de eroare
    const errorMessage = await loginPage.getErrorMessage();
    
    expect(errorMessage).not.toBeNull();
    expect(
      errorMessage?.toLowerCase().includes('password') ||
      errorMessage?.toLowerCase().includes('credentials') ||
      errorMessage?.toLowerCase().includes('match')
    ).toBeTruthy();
  });

  test('should show validation with empty credentials', async ({ page }) => {
    /**
     * Test: Login fără a introduce credențiale
     * 
     * Expected: Mesaj de eroare sau validare de formular
     */
    const loginPage = new LoginPage(page);
    
    // Step 1: Navighează și încearcă login fără credențiale
    await loginPage.navigateTo();
    
    // Nu introduce nimic, doar click pe login
    await loginPage.clickLogin();
    
    // Step 2: Verifică comportamentul
    // Poate fi mesaj de eroare sau validare HTML5
    const errorMessage = await loginPage.getErrorMessage();
    const usernameRequired = await loginPage.usernameField.getAttribute('required');
    const passwordRequired = await loginPage.passwordField.getAttribute('required');
    
    // Verifică validarea HTML5 sau mesajul de eroare
    expect(usernameRequired !== null || errorMessage !== null).toBeTruthy();
    expect(passwordRequired !== null || errorMessage !== null).toBeTruthy();
  });

  const invalidCredentials = [
    { username: 'wrong_user', password: 'wrong_pass', description: 'both wrong' },
    { username: '', password: 'secret_sauce', description: 'empty username' },
    { username: 'standard_user', password: '', description: 'empty password' },
    { username: 'test@test.com', password: 'password123', description: 'email as username' }
  ];

  for (const cred of invalidCredentials) {
    test(`should fail login with ${cred.description}`, async ({ page }) => {
      /**
       * Test parametrizat: Login cu diferite combinații de credențiale invalide
       */
      const loginPage = new LoginPage(page);
      
      // Step 1: Testează login cu credențiale invalide
      await loginPage.navigateTo();
      
      if (cred.username) {
        await loginPage.enterUsername(cred.username);
      }
      if (cred.password) {
        await loginPage.enterPassword(cred.password);
      }
      
      await loginPage.clickLogin();
      
      // Step 2: Verifică rezultatul
      // Login ar trebui să eșueze
      const currentUrl = page.url();
      const productsPageLoaded = currentUrl.includes('inventory');
      
      expect(productsPageLoaded).toBeFalsy();
      
      const errorMessage = await loginPage.getErrorMessage();
      // Dacă există un mesaj de eroare, verifică-l
      if (errorMessage) {
        expect(errorMessage.length).toBeGreaterThan(0);
      }
    });
  }
});

