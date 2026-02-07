import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const baseUrl = 'https://www.saucedemo.com';

test.describe('@login Parallel Login Tests', () => {
  test('@critical should login successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page, baseUrl);
    await loginPage.navigateTo();
    await loginPage.login('standard_user', 'secret_sauce');
    expect(await loginPage.isLoggedIn()).toBeTruthy();
  });

  test('should fail login with invalid username', async ({ page }) => {
    const loginPage = new LoginPage(page, baseUrl);
    await loginPage.navigateTo();
    await loginPage.enterUsername('invalid_user');
    await loginPage.enterPassword('secret_sauce');
    await loginPage.clickLoginButton();
    expect(await loginPage.isErrorVisible()).toBeTruthy();
    expect(await loginPage.isLoggedIn()).toBeFalsy();
  });

  test('should fail login with invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page, baseUrl);
    await loginPage.navigateTo();
    await loginPage.enterUsername('standard_user');
    await loginPage.enterPassword('invalid_password');
    await loginPage.clickLoginButton();
    expect(await loginPage.isErrorVisible()).toBeTruthy();
    expect(await loginPage.isLoggedIn()).toBeFalsy();
  });

  test('should fail login with empty username', async ({ page }) => {
    const loginPage = new LoginPage(page, baseUrl);
    await loginPage.navigateTo();
    await loginPage.enterPassword('secret_sauce');
    await loginPage.clickLoginButton();
    expect(await loginPage.isErrorVisible()).toBeTruthy();
    expect(await loginPage.isLoggedIn()).toBeFalsy();
  });

  test('should fail login with empty password', async ({ page }) => {
    const loginPage = new LoginPage(page, baseUrl);
    await loginPage.navigateTo();
    await loginPage.enterUsername('standard_user');
    await loginPage.clickLoginButton();
    expect(await loginPage.isErrorVisible()).toBeTruthy();
    expect(await loginPage.isLoggedIn()).toBeFalsy();
  });

  test('should fail login with empty credentials', async ({ page }) => {
    const loginPage = new LoginPage(page, baseUrl);
    await loginPage.navigateTo();
    await loginPage.clickLoginButton();
    expect(await loginPage.isErrorVisible()).toBeTruthy();
    expect(await loginPage.isLoggedIn()).toBeFalsy();
  });

  test('should login with problem_user', async ({ page }) => {
    const loginPage = new LoginPage(page, baseUrl);
    await loginPage.navigateTo();
    await loginPage.login('problem_user', 'secret_sauce');
    expect(await loginPage.isLoggedIn()).toBeTruthy();
  });

  test('should fail login with locked_out_user', async ({ page }) => {
    const loginPage = new LoginPage(page, baseUrl);
    await loginPage.navigateTo();
    await loginPage.enterUsername('locked_out_user');
    await loginPage.enterPassword('secret_sauce');
    await loginPage.clickLoginButton();
    expect(await loginPage.isErrorVisible()).toBeTruthy();
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('locked');
  });

  test('should login with performance_glitch_user', async ({ page }) => {
    test.setTimeout(60000); // Increase timeout for performance glitch user
    const loginPage = new LoginPage(page, baseUrl);
    await loginPage.navigateTo();
    await loginPage.login('performance_glitch_user', 'secret_sauce');
    expect(await loginPage.isLoggedIn()).toBeTruthy();
  });

  test('should verify error message content', async ({ page }) => {
    const loginPage = new LoginPage(page, baseUrl);
    await loginPage.navigateTo();
    await loginPage.enterUsername('invalid');
    await loginPage.enterPassword('invalid');
    await loginPage.clickLoginButton();
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.length).toBeGreaterThan(0);
  });

  test('should handle multiple login attempts', async ({ page }) => {
    const loginPage = new LoginPage(page, baseUrl);
    await loginPage.navigateTo();
    
    // First attempt - invalid
    await loginPage.enterUsername('invalid');
    await loginPage.enterPassword('invalid');
    await loginPage.clickLoginButton();
    expect(await loginPage.isErrorVisible()).toBeTruthy();
    
    // Second attempt - valid
    await loginPage.enterUsername('standard_user');
    await loginPage.enterPassword('secret_sauce');
    await loginPage.clickLoginButton();
    expect(await loginPage.isLoggedIn()).toBeTruthy();
  });
});

