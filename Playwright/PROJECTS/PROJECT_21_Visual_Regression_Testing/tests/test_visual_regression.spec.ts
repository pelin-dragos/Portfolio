import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

const baseUrl = 'https://www.saucedemo.com';

test.describe('@visual Visual Regression Tests', () => {
  test('@visual should capture login page baseline', async ({ page }) => {
    const loginPage = new LoginPage(page, baseUrl);
    await loginPage.navigateTo();
    await loginPage.waitForVisualStability();
    
    // Playwright automatically creates baseline on first run
    // Use toHaveScreenshot for visual comparison
    await expect(page).toHaveScreenshot('login_page.png', {
      fullPage: true,
      threshold: 0.2,
      maxDiffPixels: 100,
    });
  });

  test('@visual should capture login page with error message', async ({ page }) => {
    const loginPage = new LoginPage(page, baseUrl);
    await loginPage.navigateTo();
    
    // Trigger error by clicking login without credentials
    await loginPage.clickLoginButton();
    await page.waitForSelector('[data-test="error"]', { state: 'visible' });
    await loginPage.waitForVisualStability();
    
    await expect(page).toHaveScreenshot('login_page_error.png', {
      fullPage: true,
      threshold: 0.2,
      maxDiffPixels: 100,
    });
  });

  test('@visual should capture products page baseline', async ({ page }) => {
    const loginPage = new LoginPage(page, baseUrl);
    await loginPage.navigateTo();
    await loginPage.login('standard_user', 'secret_sauce');
    
    const productsPage = new ProductsPage(page, baseUrl);
    await productsPage.waitForPageLoad();
    await productsPage.waitForVisualStability();
    
    await expect(page).toHaveScreenshot('products_page.png', {
      fullPage: true,
      threshold: 0.2,
      maxDiffPixels: 100,
    });
  });

  test('@visual should capture products page with item in cart', async ({ page }) => {
    const loginPage = new LoginPage(page, baseUrl);
    await loginPage.navigateTo();
    await loginPage.login('standard_user', 'secret_sauce');
    
    const productsPage = new ProductsPage(page, baseUrl);
    await productsPage.waitForPageLoad();
    await productsPage.addProductToCart(0);
    await productsPage.waitForVisualStability();
    
    await expect(page).toHaveScreenshot('products_page_with_cart.png', {
      fullPage: true,
      threshold: 0.2,
      maxDiffPixels: 100,
    });
  });

  test('@visual should capture cart page baseline', async ({ page }) => {
    const loginPage = new LoginPage(page, baseUrl);
    await loginPage.navigateTo();
    await loginPage.login('standard_user', 'secret_sauce');
    
    const productsPage = new ProductsPage(page, baseUrl);
    await productsPage.waitForPageLoad();
    await productsPage.addProductToCart(0);
    await page.click('.shopping_cart_link');
    await page.waitForURL('**/cart.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    await expect(page).toHaveScreenshot('cart_page.png', {
      fullPage: true,
      threshold: 0.2,
      maxDiffPixels: 100,
    });
  });

  test('@visual should capture login form element', async ({ page }) => {
    const loginPage = new LoginPage(page, baseUrl);
    await loginPage.navigateTo();
    await loginPage.waitForVisualStability();
    
    // Capture specific element
    const loginForm = page.locator('.login-box');
    await expect(loginForm).toHaveScreenshot('login_form.png', {
      threshold: 0.2,
      maxDiffPixels: 50,
    });
  });

  test('@visual should capture product list element', async ({ page }) => {
    const loginPage = new LoginPage(page, baseUrl);
    await loginPage.navigateTo();
    await loginPage.login('standard_user', 'secret_sauce');
    
    const productsPage = new ProductsPage(page, baseUrl);
    await productsPage.waitForPageLoad();
    await productsPage.waitForVisualStability();
    
    // Capture specific element
    const productList = page.locator('.inventory_list');
    await expect(productList).toHaveScreenshot('product_list.png', {
      threshold: 0.2,
      maxDiffPixels: 100,
    });
  });

  test('@visual should test with custom threshold', async ({ page }) => {
    const loginPage = new LoginPage(page, baseUrl);
    await loginPage.navigateTo();
    await loginPage.waitForVisualStability();
    
    // Test with stricter threshold (lower = more strict)
    await expect(page).toHaveScreenshot('login_page_strict.png', {
      fullPage: true,
      threshold: 0.1, // Stricter threshold
      maxDiffPixels: 50, // Fewer pixels allowed to differ
    });
  });

  test('@visual should test with relaxed threshold', async ({ page }) => {
    const loginPage = new LoginPage(page, baseUrl);
    await loginPage.navigateTo();
    await loginPage.waitForVisualStability();
    
    // Test with relaxed threshold (higher = more tolerant)
    await expect(page).toHaveScreenshot('login_page_relaxed.png', {
      fullPage: true,
      threshold: 0.5, // More tolerant threshold
      maxDiffPixels: 500, // More pixels allowed to differ
    });
  });

  test('@visual should capture mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    const loginPage = new LoginPage(page, baseUrl);
    await loginPage.navigateTo();
    await loginPage.waitForVisualStability();
    
    await expect(page).toHaveScreenshot('login_page_mobile.png', {
      fullPage: true,
      threshold: 0.2,
      maxDiffPixels: 100,
    });
  });

  test('@visual should capture tablet viewport', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    
    const loginPage = new LoginPage(page, baseUrl);
    await loginPage.navigateTo();
    await loginPage.waitForVisualStability();
    
    await expect(page).toHaveScreenshot('login_page_tablet.png', {
      fullPage: true,
      threshold: 0.2,
      maxDiffPixels: 100,
    });
  });
});
