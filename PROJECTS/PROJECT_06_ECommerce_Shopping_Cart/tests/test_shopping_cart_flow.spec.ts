import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage, CheckoutOverviewPage, CheckoutCompletePage } from '../pages/CheckoutPage';

/**
 * Test Suite: E-Commerce Shopping Cart Flow
 * Complete flow: Login → Browse → Add to Cart → Checkout → Complete
 */

// Helper function to login and return products page
async function loginAndGetProductsPage(page: any): Promise<ProductsPage> {
  const loginPage = new LoginPage(page);
  await loginPage.navigateTo();
  await loginPage.login('standard_user', 'secret_sauce');
  
  // Wait for page to fully load after login
  await page.waitForLoadState('networkidle');
  
  const productsPage = new ProductsPage(page);
  await productsPage.waitForPageLoad();
  return productsPage;
}

test.describe('Complete Purchase Flow', () => {
  
  test('@flow @critical @smoke should complete full purchase flow', async ({ page }) => {
    /**
     * Test: Complete purchase flow end-to-end
     * Steps: Login → Browse → Add to Cart → Checkout → Complete
     */
    // Step 1: Login
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo();
    await loginPage.login('standard_user', 'secret_sauce');
    
    const productsPage = new ProductsPage(page);
    await productsPage.waitForPageLoad();
    
    expect(await productsPage.isLoaded()).toBeTruthy();
    
    // Step 2: Browse products
    const productsCount = await productsPage.getProductsCount();
    expect(productsCount).toBeGreaterThan(0);
    
    // Step 3: Add products to cart
    const product1 = await productsPage.addProductToCart(0);
    const product2 = await productsPage.addProductToCart(1);
    
    const cartCount = await productsPage.getCartItemsCount();
    expect(cartCount).toBe(2);
    
    // Step 4: Access cart
    await productsPage.clickCart();
    
    const cartPage = new CartPage(page);
    await cartPage.waitForPageLoad();
    
    expect(await cartPage.isLoaded()).toBeTruthy();
    
    const cartItems = await cartPage.getAllCartItemsNames();
    expect(cartItems).toContain(product1);
    expect(cartItems).toContain(product2);
    
    // Step 5: Verify total price
    const totalPrice = await cartPage.calculateTotalPrice();
    expect(totalPrice).toBeGreaterThan(0);
    
    // Step 6: Checkout - Form
    await cartPage.clickCheckout();
    
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.waitForPageLoad();
    
    expect(await checkoutPage.isLoaded()).toBeTruthy();
    
    await checkoutPage.fillCheckoutForm('John', 'Doe', '12345');
    await checkoutPage.clickContinue();
    
    // Step 7: Checkout Overview
    const overviewPage = new CheckoutOverviewPage(page);
    await overviewPage.waitForPageLoad();
    
    expect(await overviewPage.isLoaded()).toBeTruthy();
    
    const subtotal = await overviewPage.getSubtotal();
    const tax = await overviewPage.getTax();
    const total = await overviewPage.getTotal();
    const expectedTotal = await overviewPage.calculateExpectedTotal();
    
    expect(Math.abs(total - expectedTotal)).toBeLessThan(0.01);
    
    // Step 8: Complete order
    await overviewPage.clickFinish();
    
    const completePage = new CheckoutCompletePage(page);
    await completePage.waitForPageLoad();
    
    expect(await completePage.isLoaded()).toBeTruthy();
    
    const successMessage = await completePage.getSuccessMessage();
    expect(successMessage).toContain('Thank you for your order');
  });
});

test.describe('Cart Management', () => {
  
  test('@cart @smoke should add single product to cart', async ({ page }) => {
    /**
     * Test: Add single product to cart
     */
    const productsPage = await loginAndGetProductsPage(page);
    
    const productName = await productsPage.addProductToCart(0);
    expect(productName).toBeTruthy();
    
    const cartCount = await productsPage.getCartItemsCount();
    expect(cartCount).toBe(1);
    
    await productsPage.clickCart();
    
    const cartPage = new CartPage(page);
    await cartPage.waitForPageLoad();
    
    const cartItems = await cartPage.getAllCartItemsNames();
    expect(cartItems).toContain(productName);
  });

  test('@cart @regression should add multiple products to cart', async ({ page }) => {
    /**
     * Test: Add multiple products to cart
     */
    const productsPage = await loginAndGetProductsPage(page);
    
    const addedProducts = await productsPage.addMultipleProductsToCart([0, 1, 2]);
    expect(addedProducts.length).toBe(3);
    
    const cartCount = await productsPage.getCartItemsCount();
    expect(cartCount).toBe(3);
    
    await productsPage.clickCart();
    
    const cartPage = new CartPage(page);
    await cartPage.waitForPageLoad();
    
    const cartItems = await cartPage.getAllCartItemsNames();
    expect(cartItems.length).toBe(3);
    
    for (const product of addedProducts) {
      expect(cartItems).toContain(product);
    }
  });

  test('@cart @regression should remove item from cart', async ({ page }) => {
    /**
     * Test: Remove product from cart
     */
    const productsPage = await loginAndGetProductsPage(page);
    
    const product1 = await productsPage.addProductToCart(0);
    const product2 = await productsPage.addProductToCart(1);
    
    await productsPage.clickCart();
    
    const cartPage = new CartPage(page);
    await cartPage.waitForPageLoad();
    
    expect(await cartPage.getCartItemsCount()).toBe(2);
    
    const removedItem = await cartPage.removeItemFromCart(0);
    expect(removedItem).toBe(product1);
    
    await page.waitForTimeout(500);
    
    expect(await cartPage.getCartItemsCount()).toBe(1);
    
    const remainingItems = await cartPage.getAllCartItemsNames();
    expect(remainingItems).toContain(product2);
    expect(remainingItems).not.toContain(product1);
  });

  test('@cart @regression should calculate cart total correctly', async ({ page }) => {
    /**
     * Test: Calculate cart total price
     */
    const productsPage = await loginAndGetProductsPage(page);
    
    const product1Info = await productsPage.getProductInfo(0);
    const product2Info = await productsPage.getProductInfo(1);
    
    expect(product1Info).toBeTruthy();
    expect(product2Info).toBeTruthy();
    
    const expectedTotal = product1Info!.price + product2Info!.price;
    
    await productsPage.addProductToCart(0);
    await productsPage.addProductToCart(1);
    await productsPage.clickCart();
    
    const cartPage = new CartPage(page);
    await cartPage.waitForPageLoad();
    
    const actualTotal = await cartPage.calculateTotalPrice();
    expect(Math.abs(actualTotal - expectedTotal)).toBeLessThan(0.01);
  });
});

test.describe('Checkout Process', () => {
  
  test('@checkout @critical @smoke should validate checkout form', async ({ page }) => {
    /**
     * Test: Validate checkout form - required fields
     */
    const productsPage = await loginAndGetProductsPage(page);
    
    await productsPage.addProductToCart(0);
    await productsPage.clickCart();
    
    const cartPage = new CartPage(page);
    await cartPage.waitForPageLoad();
    await cartPage.clickCheckout();
    
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.waitForPageLoad();
    
    // Try to continue without filling form
    await checkoutPage.clickContinue();
    
    await page.waitForTimeout(1000);
    
    const errorMessage = await checkoutPage.getErrorMessage();
    expect(errorMessage).toBeTruthy();
    expect(errorMessage!.toLowerCase()).toMatch(/first name|required/);
  });

  test('@checkout @regression should complete checkout form', async ({ page }) => {
    /**
     * Test: Complete checkout form with valid data
     */
    const productsPage = await loginAndGetProductsPage(page);
    
    await productsPage.addProductToCart(0);
    await productsPage.clickCart();
    
    const cartPage = new CartPage(page);
    await cartPage.waitForPageLoad();
    await cartPage.clickCheckout();
    
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.waitForPageLoad();
    
    await checkoutPage.fillCheckoutForm('John', 'Doe', '12345');
    await checkoutPage.clickContinue();
    
    const overviewPage = new CheckoutOverviewPage(page);
    await overviewPage.waitForPageLoad();
    
    expect(await overviewPage.isLoaded()).toBeTruthy();
  });

  test('@checkout @regression should calculate checkout overview correctly', async ({ page }) => {
    /**
     * Test: Verify correct calculation in checkout overview
     */
    const productsPage = await loginAndGetProductsPage(page);
    
    const product1Info = await productsPage.getProductInfo(0);
    const product2Info = await productsPage.getProductInfo(1);
    
    expect(product1Info).toBeTruthy();
    expect(product2Info).toBeTruthy();
    
    const expectedSubtotal = product1Info!.price + product2Info!.price;
    
    await productsPage.addProductToCart(0);
    await productsPage.addProductToCart(1);
    await productsPage.clickCart();
    
    const cartPage = new CartPage(page);
    await cartPage.waitForPageLoad();
    await cartPage.clickCheckout();
    
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.waitForPageLoad();
    await checkoutPage.fillCheckoutForm('John', 'Doe', '12345');
    await checkoutPage.clickContinue();
    
    const overviewPage = new CheckoutOverviewPage(page);
    await overviewPage.waitForPageLoad();
    
    const subtotal = await overviewPage.getSubtotal();
    expect(Math.abs(subtotal - expectedSubtotal)).toBeLessThan(0.01);
    
    const tax = await overviewPage.getTax();
    const total = await overviewPage.getTotal();
    const expectedTotal = await overviewPage.calculateExpectedTotal();
    
    expect(Math.abs(total - expectedTotal)).toBeLessThan(0.01);
  });

  test('@checkout @critical @smoke should complete checkout', async ({ page }) => {
    /**
     * Test: Complete full checkout process
     */
    const productsPage = await loginAndGetProductsPage(page);
    
    await productsPage.addProductToCart(0);
    await productsPage.clickCart();
    
    const cartPage = new CartPage(page);
    await cartPage.waitForPageLoad();
    await cartPage.clickCheckout();
    
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.waitForPageLoad();
    await checkoutPage.fillCheckoutForm('John', 'Doe', '12345');
    await checkoutPage.clickContinue();
    
    const overviewPage = new CheckoutOverviewPage(page);
    await overviewPage.waitForPageLoad();
    await overviewPage.clickFinish();
    
    const completePage = new CheckoutCompletePage(page);
    await completePage.waitForPageLoad();
    
    expect(await completePage.isLoaded()).toBeTruthy();
    
    const successMessage = await completePage.getSuccessMessage();
    expect(successMessage).toContain('Thank you for your order');
  });
});

test.describe('Browse and Navigation', () => {
  
  test('@browse @smoke should login and navigate to products', async ({ page }) => {
    /**
     * Test: Login and navigate to products
     */
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo();
    await loginPage.login('standard_user', 'secret_sauce');
    
    // Wait for inventory page
    await page.waitForURL(/.*inventory.*/, { timeout: 15000 });
    await page.waitForLoadState('domcontentloaded');
    
    const productsPage = new ProductsPage(page);
    // Wait for products to be visible
    await expect(productsPage.productItems.first()).toBeVisible({ timeout: 10000 });
    
    expect(await productsPage.isLoaded()).toBeTruthy();
    expect(productsPage.getCurrentUrl()).toContain('inventory');
    
    const productsCount = await productsPage.getProductsCount();
    expect(productsCount).toBeGreaterThan(0);
  });

  test('@browse @regression should view product details', async ({ page }) => {
    /**
     * Test: View product information
     */
    const productsPage = await loginAndGetProductsPage(page);
    
    const productsCount = await productsPage.getProductsCount();
    expect(productsCount).toBeGreaterThan(0);
    
    const productInfo = await productsPage.getProductInfo(0);
    expect(productInfo).toBeTruthy();
    expect(productInfo).toHaveProperty('name');
    expect(productInfo).toHaveProperty('price');
    expect(productInfo!.price).toBeGreaterThan(0);
  });

  test('@browse @regression should continue shopping from cart', async ({ page }) => {
    /**
     * Test: Continue shopping from cart
     */
    const productsPage = await loginAndGetProductsPage(page);
    
    await productsPage.addProductToCart(0);
    await productsPage.clickCart();
    
    const cartPage = new CartPage(page);
    await cartPage.waitForPageLoad();
    await cartPage.clickContinueShopping();
    
    await productsPage.waitForPageLoad();
    expect(await productsPage.isLoaded()).toBeTruthy();
    expect(productsPage.getCurrentUrl()).toContain('inventory');
  });
});

