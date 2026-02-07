import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { ViewportConfigs } from '../utils/ViewportConfigs';

const baseUrl = 'https://www.saucedemo.com';

test.describe('@responsive Responsive Design Tests', () => {
  const viewports = ViewportConfigs.getAllViewports();

  for (const viewport of viewports) {
    test(`@${viewport.type} should test login on ${viewport.name} (${viewport.width}x${viewport.height})`, async ({ page }) => {
      // Set viewport size
      await ViewportConfigs.applyViewport(page, viewport);
      
      const loginPage = new LoginPage(page, baseUrl);
      await loginPage.navigateTo();
      
      // Verify viewport detection
      const isMobile = await loginPage.isMobileViewport();
      const isTablet = await loginPage.isTabletViewport();
      const isDesktop = await loginPage.isDesktopViewport();
      
      if (viewport.type === 'mobile') {
        expect(isMobile).toBeTruthy();
      } else if (viewport.type === 'tablet') {
        expect(isTablet).toBeTruthy();
      } else {
        expect(isDesktop).toBeTruthy();
      }
      
      // Test login form fits in viewport
      const formFits = await loginPage.isFormFittingInViewport();
      expect(formFits).toBeTruthy();
      
      // Test login functionality
      await loginPage.login('standard_user', 'secret_sauce');
      expect(await loginPage.isLoggedIn()).toBeTruthy();
      
      // Take screenshot
      await loginPage.takeViewportScreenshot(viewport);
    });
  }
});

test.describe('@mobile Mobile Specific Tests', () => {
  const mobileViewports = ViewportConfigs.getMobileViewports();

  for (const viewport of mobileViewports) {
    test(`should test mobile navigation on ${viewport.name}`, async ({ page }) => {
      await ViewportConfigs.applyViewport(page, viewport);
      
      const loginPage = new LoginPage(page, baseUrl);
      await loginPage.navigateTo();
      await loginPage.login('standard_user', 'secret_sauce');
      
      const productsPage = new ProductsPage(page, baseUrl);
      await productsPage.waitForPageLoad();
      
      // Verify mobile menu button is visible
      const isMenuVisible = await productsPage.isMenuButtonVisible();
      expect(isMenuVisible).toBeTruthy();
      
      // Test hamburger menu
      await productsPage.clickMenuButton();
      const isMenuOpen = await productsPage.isMenuOpen();
      expect(isMenuOpen).toBeTruthy();
      
      // Take screenshot
      await productsPage.takeViewportScreenshot(viewport);
    });

    test(`should verify products visibility on ${viewport.name}`, async ({ page }) => {
      await ViewportConfigs.applyViewport(page, viewport);
      
      const loginPage = new LoginPage(page, baseUrl);
      await loginPage.navigateTo();
      await loginPage.login('standard_user', 'secret_sauce');
      
      const productsPage = new ProductsPage(page, baseUrl);
      await productsPage.waitForPageLoad();
      
      // Verify products are visible
      const areProductsVisible = await productsPage.areProductsVisible();
      expect(areProductsVisible).toBeTruthy();
      
      const productCount = await productsPage.getProductCount();
      expect(productCount).toBeGreaterThan(0);
    });

    test(`should test cart functionality on ${viewport.name}`, async ({ page }) => {
      await ViewportConfigs.applyViewport(page, viewport);
      
      const loginPage = new LoginPage(page, baseUrl);
      await loginPage.navigateTo();
      await loginPage.login('standard_user', 'secret_sauce');
      
      const productsPage = new ProductsPage(page, baseUrl);
      await productsPage.waitForPageLoad();
      
      // Add product to cart
      await productsPage.addProductToCart(0);
      
      // Navigate to cart
      await productsPage.clickCartIcon();
      expect(page.url()).toContain('cart.html');
    });
  }
});

test.describe('@tablet Tablet Specific Tests', () => {
  const tabletViewports = ViewportConfigs.getTabletViewports();

  for (const viewport of tabletViewports) {
    test(`should test tablet layout on ${viewport.name}`, async ({ page }) => {
      await ViewportConfigs.applyViewport(page, viewport);
      
      const loginPage = new LoginPage(page, baseUrl);
      await loginPage.navigateTo();
      
      // Verify tablet viewport
      const isTablet = await loginPage.isTabletViewport();
      expect(isTablet).toBeTruthy();
      
      // Test login
      await loginPage.login('standard_user', 'secret_sauce');
      expect(await loginPage.isLoggedIn()).toBeTruthy();
      
      const productsPage = new ProductsPage(page, baseUrl);
      await productsPage.waitForPageLoad();
      
      // Verify products are visible
      const productCount = await productsPage.getProductCount();
      expect(productCount).toBeGreaterThan(0);
      
      // Take screenshot
      await productsPage.takeViewportScreenshot(viewport);
    });
  }
});

test.describe('@desktop Desktop Specific Tests', () => {
  const desktopViewports = ViewportConfigs.getDesktopViewports();

  for (const viewport of desktopViewports) {
    test(`should test desktop layout on ${viewport.name}`, async ({ page }) => {
      await ViewportConfigs.applyViewport(page, viewport);
      
      const loginPage = new LoginPage(page, baseUrl);
      await loginPage.navigateTo();
      
      // Verify desktop viewport
      const isDesktop = await loginPage.isDesktopViewport();
      expect(isDesktop).toBeTruthy();
      
      // Test login
      await loginPage.login('standard_user', 'secret_sauce');
      expect(await loginPage.isLoggedIn()).toBeTruthy();
      
      const productsPage = new ProductsPage(page, baseUrl);
      await productsPage.waitForPageLoad();
      
      // Verify products are visible
      const productCount = await productsPage.getProductCount();
      expect(productCount).toBeGreaterThan(0);
      
      // Take screenshot
      await productsPage.takeViewportScreenshot(viewport);
    });
  }
});

test.describe('@responsive Viewport Size Verification', () => {
  test('should verify viewport sizes are correct', async ({ page }) => {
    const viewports = ViewportConfigs.getAllViewports();
    
    for (const viewport of viewports) {
      await ViewportConfigs.applyViewport(page, viewport);
      const size = await page.viewportSize();
      
      expect(size?.width).toBe(viewport.width);
      expect(size?.height).toBe(viewport.height);
    }
  });

  test('should verify viewport type detection', async ({ page }) => {
    const loginPage = new LoginPage(page, baseUrl);
    
    // Test mobile
    await ViewportConfigs.applyViewport(page, ViewportConfigs.MOBILE_MEDIUM);
    expect(await loginPage.isMobileViewport()).toBeTruthy();
    expect(await loginPage.isTabletViewport()).toBeFalsy();
    expect(await loginPage.isDesktopViewport()).toBeFalsy();
    
    // Test tablet
    await ViewportConfigs.applyViewport(page, ViewportConfigs.TABLET_SMALL);
    expect(await loginPage.isMobileViewport()).toBeFalsy();
    expect(await loginPage.isTabletViewport()).toBeTruthy();
    expect(await loginPage.isDesktopViewport()).toBeFalsy();
    
    // Test desktop
    await ViewportConfigs.applyViewport(page, ViewportConfigs.DESKTOP_MEDIUM);
    expect(await loginPage.isMobileViewport()).toBeFalsy();
    expect(await loginPage.isTabletViewport()).toBeFalsy();
    expect(await loginPage.isDesktopViewport()).toBeTruthy();
  });
});

test.describe('@mobile Mobile Navigation Tests', () => {
  test('should test hamburger menu on mobile', async ({ page }) => {
    await ViewportConfigs.applyViewport(page, ViewportConfigs.MOBILE_MEDIUM);
    
    const loginPage = new LoginPage(page, baseUrl);
    await loginPage.navigateTo();
    await loginPage.login('standard_user', 'secret_sauce');
    
    const productsPage = new ProductsPage(page, baseUrl);
    await productsPage.waitForPageLoad();
    
    // Verify menu button exists
    expect(await productsPage.isMenuButtonVisible()).toBeTruthy();
    
    // Open menu
    await productsPage.clickMenuButton();
    await page.waitForTimeout(1500); // Wait for menu animation
    
    // Verify menu is open (check if menu element is visible)
    const isMenuOpen = await productsPage.isMenuOpen();
    expect(isMenuOpen).toBeTruthy();
    
    // Verify menu contains logout option (check if logout link exists in menu)
    const logoutLinkVisible = await page.locator('#logout_sidebar_link').isVisible({ timeout: 3000 }).catch(() => false);
    expect(logoutLinkVisible).toBeTruthy();
  });
});

test.describe('@responsive Element Visibility Tests', () => {
  test('should verify elements are visible on all viewports', async ({ page }) => {
    const viewports = ViewportConfigs.getAllViewports();
    
    for (const viewport of viewports) {
      await ViewportConfigs.applyViewport(page, viewport);
      
      const loginPage = new LoginPage(page, baseUrl);
      await loginPage.navigateTo();
      
      // Verify login form elements are visible
      const usernameVisible = await loginPage.isElementVisible('#user-name');
      const passwordVisible = await loginPage.isElementVisible('#password');
      const loginButtonVisible = await loginPage.isElementVisible('#login-button');
      
      expect(usernameVisible).toBeTruthy();
      expect(passwordVisible).toBeTruthy();
      expect(loginButtonVisible).toBeTruthy();
    }
  });
});
