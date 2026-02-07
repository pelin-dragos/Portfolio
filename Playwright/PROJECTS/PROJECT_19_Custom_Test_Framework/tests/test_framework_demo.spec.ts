import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { ConfigManager } from '../framework/config/ConfigManager';
import { Logger } from '../framework/core/Logger';
import { CommonHelpers } from '../framework/helpers/CommonHelpers';
import { ReportManager } from '../framework/reporting/ReportManager';
import { BaseDriver } from '../framework/core/BaseDriver';

const baseUrl = 'https://www.saucedemo.com';

test.describe('Custom Framework Demo Tests', () => {
  let logger: Logger;
  let reportManager: ReportManager;
  let configManager: ConfigManager;

  test.beforeAll(() => {
    // Initialize framework components
    logger = Logger.getInstance();
    reportManager = new ReportManager();
    configManager = ConfigManager.getInstance();
    
    logger.info('Starting Custom Framework Demo Tests');
    logger.info(`Browser: ${configManager.getBrowser()}`);
    logger.info(`Base URL: ${configManager.getBaseUrl()}`);
  });

  test('should demonstrate framework components', async ({ page }) => {
    const startTime = Date.now();
    
    // Use ConfigManager
    const baseUrl = configManager.getBaseUrl();
    logger.info(`Navigating to: ${baseUrl}`);
    
    // Use LoginPage (extends BasePage)
    const loginPage = new LoginPage(page, baseUrl);
    await loginPage.navigateTo();
    await loginPage.waitForPageLoad();
    
    // Use CommonHelpers
    const randomString = CommonHelpers.generateRandomString(8);
    logger.debug(`Generated random string: ${randomString}`);
    
    // Login
    await loginPage.login('standard_user', 'secret_sauce');
    expect(await loginPage.isLoggedIn()).toBeTruthy();
    
    // Use ProductsPage
    const productsPage = new ProductsPage(page, baseUrl);
    await productsPage.waitForPageLoad();
    const productCount = await productsPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
    
    // Calculate duration
    const duration = (Date.now() - startTime) / 1000;
    const formattedDuration = CommonHelpers.formatDuration(duration);
    logger.info(`Test completed in: ${formattedDuration}`);
    
    // Save result to ReportManager
    reportManager.saveTestResult('framework_demo', 'passed', duration);
  });

  test('should demonstrate BaseDriver factory pattern', async () => {
    // Demonstrate BaseDriver factory pattern
    const availableBrowsers = BaseDriver.getAvailableBrowsers();
    logger.info(`Available browsers: ${availableBrowsers.join(', ')}`);
    expect(availableBrowsers.length).toBeGreaterThan(0);
  });

  test('should demonstrate ConfigManager singleton', async ({ page }) => {
    // Get ConfigManager instance
    const config1 = ConfigManager.getInstance();
    const config2 = ConfigManager.getInstance();
    
    // Should be the same instance (Singleton)
    expect(config1).toBe(config2);
    
    // Test configuration values
    const browser = config1.getBrowser();
    expect(browser).toBeTruthy();
    
    const baseUrl = config1.getBaseUrl();
    expect(baseUrl).toBeTruthy();
    
    logger.info(`ConfigManager test - Browser: ${browser}, URL: ${baseUrl}`);
  });

  test('should demonstrate Logger singleton', async () => {
    // Get Logger instances
    const logger1 = Logger.getInstance();
    const logger2 = Logger.getInstance();
    
    // Should be the same instance (Singleton)
    expect(logger1).toBe(logger2);
    
    // Test logging
    logger1.info('Info message from Logger');
    logger1.debug('Debug message from Logger');
    logger1.warn('Warning message from Logger');
    logger1.error('Error message from Logger');
  });

  test('should demonstrate CommonHelpers utilities', async () => {
    // Test random string generation
    const randomStr = CommonHelpers.generateRandomString(10);
    expect(randomStr.length).toBe(10);
    logger.debug(`Random string: ${randomStr}`);
    
    // Test random email generation
    const randomEmail = CommonHelpers.generateRandomEmail();
    expect(randomEmail).toContain('@');
    logger.debug(`Random email: ${randomEmail}`);
    
    // Test duration formatting
    const formatted = CommonHelpers.formatDuration(125.5);
    expect(formatted).toContain('m');
    logger.debug(`Formatted duration: ${formatted}`);
    
    // Test timestamp
    const timestamp = CommonHelpers.getTimestamp();
    expect(timestamp).toBeTruthy();
    logger.debug(`Timestamp: ${timestamp}`);
  });

  test('should demonstrate ReportManager', async ({ page }) => {
    const startTime = Date.now();
    
    const loginPage = new LoginPage(page, baseUrl);
    await loginPage.navigateTo();
    await loginPage.login('standard_user', 'secret_sauce');
    
    const duration = (Date.now() - startTime) / 1000;
    
    // Save test result
    reportManager.saveTestResult('report_manager_demo', 'passed', duration);
    
    // Generate summary
    const summary = reportManager.generateSummary();
    expect(summary.total).toBeGreaterThan(0);
    expect(summary.passed).toBeGreaterThan(0);
    
    logger.info(`Report Summary: ${JSON.stringify(summary)}`);
    
    // Generate JSON report
    reportManager.generateJSONReport('demo-report.json');
  });

  test('should demonstrate BasePage template method', async ({ page }) => {
    const loginPage = new LoginPage(page, baseUrl);
    
    // Test BasePage methods
    await loginPage.navigateTo();
    await loginPage.waitForPageLoad();
    
    // Test element visibility
    const isVisible = await loginPage.isElementVisible('#user-name');
    expect(isVisible).toBeTruthy();
    
    // Test get current URL
    const url = loginPage.getCurrentUrl();
    expect(url).toContain('saucedemo.com');
    
    logger.info(`BasePage template method test - URL: ${url}`);
  });

  test('should demonstrate full framework integration', async ({ page }) => {
    const startTime = Date.now();
    
    // Use all framework components
    const config = ConfigManager.getInstance();
    const logger = Logger.getInstance();
    const helpers = CommonHelpers;
    const report = new ReportManager();
    
    logger.info('Starting full framework integration test');
    
    // Navigate and login
    const loginPage = new LoginPage(page, config.getBaseUrl());
    await loginPage.navigateTo();
    
    // Use helpers
    const testData = helpers.generateRandomString(5);
    logger.debug(`Test data: ${testData}`);
    
    // Login
    await loginPage.login('standard_user', 'secret_sauce');
    expect(await loginPage.isLoggedIn()).toBeTruthy();
    
    // Use ProductsPage
    const productsPage = new ProductsPage(page);
    await productsPage.waitForPageLoad();
    await productsPage.addProductToCart(0);
    
    const badgeCount = await productsPage.getCartBadgeCount();
    expect(badgeCount).toBe(1);
    
    // Calculate and report
    const duration = (Date.now() - startTime) / 1000;
    report.saveTestResult('full_integration', 'passed', duration);
    
    const summary = report.generateSummary();
    logger.info(`Test completed. Summary: ${JSON.stringify(summary)}`);
  });
});
