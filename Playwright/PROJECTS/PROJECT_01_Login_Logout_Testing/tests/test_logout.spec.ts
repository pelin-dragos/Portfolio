import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

/**
 * Test Suite: Logout Scenarios
 * Teste pentru funcționalitatea de logout
 */
test.describe('Logout Tests', () => {
  
  test('should logout after successful login', async ({ page }) => {
    /**
     * Test: Flow complet login → logout
     * 
     * Steps:
     * 1. Login cu credențiale valide
     * 2. Verifică că suntem pe pagina de produse
     * 3. Face logout
     * 4. Verifică că suntem returnați la pagina de login
     */
    const loginPage = new LoginPage(page);
    
    // Step 1: Login cu credențiale valide
    await loginPage.navigateTo();
    await loginPage.login('standard_user', 'secret_sauce');
    
    const productsPage = new ProductsPage(page);
    expect(await productsPage.isLoaded()).toBeTruthy();
    expect(await productsPage.isLoggedIn()).toBeTruthy();
    
    // Step 2: Face logout
    const logoutLoginPage = await productsPage.logout();
    
    // Step 3: Verifică că logout-ul a reușit
    // Verifică că suntem pe pagina de login
    expect(await logoutLoginPage.isLoaded()).toBeTruthy();
    
    // Verifică că URL-ul este cel al paginii de login
    const currentUrl = page.url();
    expect(currentUrl).toContain('saucedemo.com');
    expect(currentUrl).not.toContain('inventory');
    
    // Verifică că elementele de login sunt vizibile
    await expect(logoutLoginPage.usernameField).toBeVisible();
    await expect(logoutLoginPage.passwordField).toBeVisible();
    await expect(logoutLoginPage.loginButton).toBeVisible();
  });

  test('should clear session after logout', async ({ page }) => {
    /**
     * Test: Verifică că sesiunea este ștearsă după logout
     * (nu poți accesa direct pagina de produse)
     */
    const loginPage = new LoginPage(page);
    
    // Step 1: Login și apoi logout
    await loginPage.navigateTo();
    await loginPage.login('standard_user', 'secret_sauce');
    
    const productsPage = new ProductsPage(page);
    await productsPage.logout();
    
    // Step 2: Încearcă acces direct la pagina de produse
    await page.goto('https://www.saucedemo.com/inventory.html');
    
    // Step 3: Verifică că suntem redirecționați la login
    await page.waitForTimeout(2000);
    const currentUrl = page.url();
    
    // Verifică că nu suntem pe inventory sau că suntem redirecționați
    const isOnLoginPage = await loginPage.isLoaded();
    expect(
      !currentUrl.includes('inventory.html') || isOnLoginPage
    ).toBeTruthy();
    
    // Verifică că elementele de login sunt prezente
    expect(await loginPage.isLoaded()).toBeTruthy();
  });

  test('should allow relogin after logout', async ({ page }) => {
    /**
     * Test: Verifică că poți face login din nou după logout
     */
    const loginPage = new LoginPage(page);
    
    // Step 1: Login → Logout
    await loginPage.navigateTo();
    await loginPage.login('standard_user', 'secret_sauce');
    
    const productsPage = new ProductsPage(page);
    const logoutLoginPage = await productsPage.logout();
    
    // Step 2: Login din nou cu aceleași credențiale
    await logoutLoginPage.login('standard_user', 'secret_sauce');
    
    // Step 3: Verifică că al doilea login a reușit (isLoaded() așteaptă automat)
    const newProductsPage = new ProductsPage(page);
    expect(await newProductsPage.isLoaded()).toBeTruthy();
    expect(await newProductsPage.isLoggedIn()).toBeTruthy();
  });
});

