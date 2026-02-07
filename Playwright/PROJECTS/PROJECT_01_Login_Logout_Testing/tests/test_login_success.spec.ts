import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

/**
 * Test Suite: Login Success Scenarios
 * Teste pentru login cu credențiale valide
 */
test.describe('Login Success Tests', () => {
  
  test('should login with valid credentials - standard_user', async ({ page }) => {
    /**
     * Test: Login cu standard_user (credențiale valide)
     * 
     * Steps:
     * 1. Navighează către pagina de login
     * 2. Introdu credențiale valide (standard_user/secret_sauce)
     * 3. Click pe butonul de login
     * 4. Verifică că login-ul a reușit (pagina de produse este încărcată)
     * 5. Verifică că URL-ul conține 'inventory'
     */
    const loginPage = new LoginPage(page);
    
    // Step 1: Navighează către pagina de login
    await loginPage.navigateTo();
    expect(await loginPage.isLoaded()).toBeTruthy();
    
    // Step 2: Introdu credențiale valide
    await loginPage.login('standard_user', 'secret_sauce');
    
    // Step 3: Verifică că login-ul a reușit (isLoaded() așteaptă automat)
    const productsPage = new ProductsPage(page);
    
    expect(await productsPage.isLoaded()).toBeTruthy();
    expect(productsPage.getCurrentUrl()).toContain('inventory');
    
    const pageTitle = await productsPage.getPageTitle();
    expect(pageTitle).toBe('Products');
  });

  const validUsers = [
    { username: 'problem_user', password: 'secret_sauce' },
    { username: 'performance_glitch_user', password: 'secret_sauce' }
  ];

  for (const user of validUsers) {
    test(`should login with valid credentials - ${user.username}`, async ({ page }) => {
      /**
       * Test: Login cu diferite tipuri de utilizatori valizi
       */
      const loginPage = new LoginPage(page);
      
      // Step 1: Navighează și face login
      await loginPage.navigateTo();
      await loginPage.login(user.username, user.password);
      
      // Step 2: Verifică că login-ul a reușit (isLoaded() așteaptă automat)
      const productsPage = new ProductsPage(page);
      
      expect(await productsPage.isLoaded()).toBeTruthy();
      expect(productsPage.getCurrentUrl()).toContain('inventory');
    });
  }

  test('should verify elements after successful login', async ({ page }) => {
    /**
     * Test: Verifică că toate elementele importante sunt prezente după login
     */
    const loginPage = new LoginPage(page);
    
    // Step 1: Face login
    await loginPage.navigateTo();
    await loginPage.login('standard_user', 'secret_sauce');
    
    // Step 2: Verifică prezența elementelor importante (isLoaded() așteaptă automat)
    const productsPage = new ProductsPage(page);
    expect(await productsPage.isLoaded()).toBeTruthy();
    
    // Verifică că meniul este prezent
    await expect(productsPage.menuButton).toBeVisible();
    
    // Verifică că shopping cart este prezent
    await expect(productsPage.shoppingCart).toBeVisible();
  });
});

