import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

const baseUrl = 'https://www.saucedemo.com';

test.describe('@cart Parallel Cart Tests', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page, baseUrl);
    await loginPage.navigateTo();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('@critical should add product to cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.waitForPageLoad();
    await productsPage.addProductToCart(0);
    const badgeCount = await productsPage.getCartBadgeCount();
    expect(badgeCount).toBe(1);
  });

  test('should add multiple products to cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.waitForPageLoad();
    await productsPage.addProductToCart(0);
    await productsPage.addProductToCart(1);
    await productsPage.addProductToCart(2);
    const badgeCount = await productsPage.getCartBadgeCount();
    expect(badgeCount).toBe(3);
  });

  test('should remove product from cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.waitForPageLoad();
    await productsPage.addProductToCart(0);
    await productsPage.addProductToCart(1);
    await productsPage.clickCartIcon();
    const cartPage = new CartPage(page);
    await cartPage.waitForPageLoad();
    await cartPage.removeItem(0);
    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(1);
  });

  test('should verify cart items match added products', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.waitForPageLoad();
    const firstProductName = await productsPage.getFirstProductName();
    await productsPage.addProductToCart(0);
    await productsPage.clickCartIcon();
    const cartPage = new CartPage(page);
    await cartPage.waitForPageLoad();
    const itemNames = await cartPage.getItemNames();
    expect(itemNames).toContain(firstProductName);
  });

  test('should verify empty cart state', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.waitForPageLoad();
    await productsPage.clickCartIcon();
    const cartPage = new CartPage(page);
    await cartPage.waitForPageLoad();
    const isCartEmpty = await cartPage.isCartEmpty();
    expect(isCartEmpty).toBeTruthy();
  });

  test('should add and remove product from cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.waitForPageLoad();
    await productsPage.addProductToCart(0);
    let badgeCount = await productsPage.getCartBadgeCount();
    expect(badgeCount).toBe(1);
    
    await productsPage.removeProductFromCart(0);
    badgeCount = await productsPage.getCartBadgeCount();
    expect(badgeCount).toBe(0);
  });

  test('should verify cart badge updates correctly', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.waitForPageLoad();
    
    // Add first product
    await productsPage.addProductToCart(0);
    let badgeCount = await productsPage.getCartBadgeCount();
    expect(badgeCount).toBe(1);
    
    // Add second product
    await productsPage.addProductToCart(1);
    badgeCount = await productsPage.getCartBadgeCount();
    expect(badgeCount).toBe(2);
    
    // Remove first product
    await productsPage.removeProductFromCart(0);
    badgeCount = await productsPage.getCartBadgeCount();
    expect(badgeCount).toBe(1);
  });

  test('should navigate to checkout from cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.waitForPageLoad();
    await productsPage.addProductToCart(0);
    await productsPage.clickCartIcon();
    const cartPage = new CartPage(page);
    await cartPage.waitForPageLoad();
    await cartPage.clickCheckout();
    expect(page.url()).toContain('checkout-step-one.html');
  });
});

