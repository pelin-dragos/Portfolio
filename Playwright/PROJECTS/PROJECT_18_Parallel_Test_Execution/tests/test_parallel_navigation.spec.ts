import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

const baseUrl = 'https://www.saucedemo.com';

test.describe('@navigation Parallel Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page, baseUrl);
    await loginPage.navigateTo();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('@critical should navigate to products page after login', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.waitForPageLoad();
    expect(await productsPage.isLoaded()).toBeTruthy();
    expect(page.url()).toContain('inventory.html');
  });

  test('should navigate to cart page', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.waitForPageLoad();
    await productsPage.clickCartIcon();
    const cartPage = new CartPage(page);
    await cartPage.waitForPageLoad();
    expect(await cartPage.isLoaded()).toBeTruthy();
    expect(page.url()).toContain('cart.html');
  });

  test('should navigate back from cart to products', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.waitForPageLoad();
    await productsPage.clickCartIcon();
    const cartPage = new CartPage(page);
    await cartPage.waitForPageLoad();
    await cartPage.clickContinueShopping();
    await productsPage.waitForPageLoad();
    expect(await productsPage.isLoaded()).toBeTruthy();
    expect(page.url()).toContain('inventory.html');
  });

  test('should verify products page elements', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.waitForPageLoad();
    const productCount = await productsPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
  });

  test('should verify cart badge appears after adding product', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.waitForPageLoad();
    await productsPage.addProductToCart(0);
    const badgeCount = await productsPage.getCartBadgeCount();
    expect(badgeCount).toBe(1);
  });

  test('should navigate through menu', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.waitForPageLoad();
    await productsPage.clickMenuButton();
    await page.waitForSelector('.bm-menu', { state: 'visible' });
    const menuVisible = await page.locator('.bm-menu').isVisible();
    expect(menuVisible).toBeTruthy();
  });

  test('should navigate to cart and verify empty state', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.waitForPageLoad();
    await productsPage.clickCartIcon();
    const cartPage = new CartPage(page);
    await cartPage.waitForPageLoad();
    const isCartEmpty = await cartPage.isCartEmpty();
    expect(isCartEmpty).toBeTruthy();
  });

  test('should navigate to cart with items', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.waitForPageLoad();
    await productsPage.addProductToCart(0);
    await productsPage.addProductToCart(1);
    await productsPage.clickCartIcon();
    const cartPage = new CartPage(page);
    await cartPage.waitForPageLoad();
    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(2);
  });

  test('should verify URL changes on navigation', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.waitForPageLoad();
    expect(page.url()).toContain('inventory.html');
    
    await productsPage.clickCartIcon();
    await page.waitForURL('**/cart.html');
    expect(page.url()).toContain('cart.html');
    
    const cartPage = new CartPage(page);
    await cartPage.clickContinueShopping();
    await page.waitForURL('**/inventory.html');
    expect(page.url()).toContain('inventory.html');
  });
});

