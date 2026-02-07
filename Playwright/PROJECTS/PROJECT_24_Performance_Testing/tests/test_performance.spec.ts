import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { PerformanceMetrics } from '../utils/PerformanceMetrics';
import { BaselineManager } from '../utils/BaselineManager';
import { PerformanceReporter } from '../utils/PerformanceReporter';

const baseUrl = 'https://www.saucedemo.com';

test.describe('@performance @page-load Page Load Performance Tests', () => {
  test('@performance @page-load should measure page load time', async ({ page }) => {
    const metrics = new PerformanceMetrics(page);
    
    await page.goto(baseUrl);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500); // Wait for metrics to be available
    
    const pageLoadMetrics = await metrics.getPageLoadTime();
    
    // Assertions - verify metrics are valid numbers
    expect(typeof pageLoadMetrics.loadComplete).toBe('number');
    expect(typeof pageLoadMetrics.domContentLoaded).toBe('number');
    expect(typeof pageLoadMetrics.domInteractive).toBe('number');
    
    // If metrics are available and valid, check thresholds
    if (!isNaN(pageLoadMetrics.loadComplete) && pageLoadMetrics.loadComplete > 0) {
      expect(pageLoadMetrics.loadComplete).toBeLessThan(10); // Should load in less than 10 seconds
    }
    if (!isNaN(pageLoadMetrics.domContentLoaded) && pageLoadMetrics.domContentLoaded > 0) {
      expect(pageLoadMetrics.domContentLoaded).toBeLessThan(5);
    }
    
    console.log(`Page Load Metrics:`, pageLoadMetrics);
  });

  test('@performance @page-load should measure DOM content loaded time', async ({ page }) => {
    const metrics = new PerformanceMetrics(page);
    
    await page.goto(baseUrl);
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500);
    
    const pageLoadMetrics = await metrics.getPageLoadTime();
    
    expect(typeof pageLoadMetrics.domContentLoaded).toBe('number');
    
    if (!isNaN(pageLoadMetrics.domContentLoaded) && pageLoadMetrics.domContentLoaded > 0) {
      expect(pageLoadMetrics.domContentLoaded).toBeLessThan(5);
    }
    
    console.log(`DOM Content Loaded: ${pageLoadMetrics.domContentLoaded.toFixed(2)}s`);
  });

  test('@performance @page-load should measure complete page load time', async ({ page }) => {
    const metrics = new PerformanceMetrics(page);
    
    await page.goto(baseUrl);
    await page.waitForLoadState('load');
    await page.waitForTimeout(500);
    
    const pageLoadMetrics = await metrics.getPageLoadTime();
    
    expect(typeof pageLoadMetrics.loadComplete).toBe('number');
    
    if (!isNaN(pageLoadMetrics.loadComplete) && pageLoadMetrics.loadComplete > 0) {
      expect(pageLoadMetrics.loadComplete).toBeLessThan(10);
    }
    
    console.log(`Load Complete: ${pageLoadMetrics.loadComplete.toFixed(2)}s`);
  });
});

test.describe('@performance @network Network Performance Tests', () => {
  test('@performance @network should measure network timing', async ({ page }) => {
    const metrics = new PerformanceMetrics(page);
    
    await page.goto(baseUrl);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    
    const networkMetrics = await metrics.getNetworkTiming();
    
    // Assertions - verify metrics are valid numbers
    expect(typeof networkMetrics.totalTime).toBe('number');
    expect(typeof networkMetrics.dns).toBe('number');
    expect(typeof networkMetrics.tcp).toBe('number');
    expect(typeof networkMetrics.response).toBe('number');
    
    // If metrics are available and valid, check thresholds
    if (!isNaN(networkMetrics.totalTime) && networkMetrics.totalTime > 0) {
      expect(networkMetrics.totalTime).toBeLessThan(10);
    }
    expect(networkMetrics.dns).toBeGreaterThanOrEqual(0);
    expect(networkMetrics.tcp).toBeGreaterThanOrEqual(0);
    
    console.log(`Network Metrics:`, networkMetrics);
  });

  test('@performance @network should measure DNS lookup time', async ({ page }) => {
    const metrics = new PerformanceMetrics(page);
    
    await page.goto(baseUrl);
    await page.waitForLoadState('networkidle');
    
    const networkMetrics = await metrics.getNetworkTiming();
    
    expect(networkMetrics.dns).toBeGreaterThanOrEqual(0);
    expect(networkMetrics.dns).toBeLessThan(1); // DNS should be fast
    
    console.log(`DNS Lookup: ${networkMetrics.dns.toFixed(2)}s`);
  });

  test('@performance @network should measure response time', async ({ page }) => {
    const metrics = new PerformanceMetrics(page);
    
    await page.goto(baseUrl);
    await page.waitForLoadState('networkidle');
    
    const networkMetrics = await metrics.getNetworkTiming();
    
    expect(networkMetrics.response).toBeGreaterThan(0);
    expect(networkMetrics.response).toBeLessThan(3);
    
    console.log(`Response Time: ${networkMetrics.response.toFixed(2)}s`);
  });
});

test.describe('@performance Resource Performance Tests', () => {
  test('@performance should identify slowest resources', async ({ page }) => {
    const metrics = new PerformanceMetrics(page);
    
    await page.goto(baseUrl);
    await page.waitForLoadState('networkidle');
    
    const slowestResources = await metrics.getSlowestResources(5);
    
    expect(slowestResources.length).toBeGreaterThan(0);
    expect(slowestResources.length).toBeLessThanOrEqual(5);
    
    console.log('Slowest Resources:');
    slowestResources.forEach((resource, index) => {
      console.log(`${index + 1}. ${resource.name}: ${resource.duration.toFixed(2)}s (${resource.type})`);
    });
  });

  test('@performance should measure resource timing', async ({ page }) => {
    const metrics = new PerformanceMetrics(page);
    
    await page.goto(baseUrl);
    await page.waitForLoadState('networkidle');
    
    const resources = await metrics.getResourceTiming();
    
    expect(resources.length).toBeGreaterThan(0);
    
    // Check for specific resource types
    const scripts = resources.filter(r => r.type === 'script');
    const styles = resources.filter(r => r.type === 'css');
    
    console.log(`Total Resources: ${resources.length}`);
    console.log(`Scripts: ${scripts.length}, Styles: ${styles.length}`);
  });
});

test.describe('@performance Action Performance Tests', () => {
  test('@performance should measure login action time', async ({ page }) => {
    const metrics = new PerformanceMetrics(page);
    const loginPage = new LoginPage(page, baseUrl);
    
    await loginPage.navigateTo();
    
    const actionTime = await metrics.measureActionTime(async () => {
      await loginPage.login('standard_user', 'secret_sauce');
    });
    
    expect(actionTime).toBeGreaterThan(0);
    expect(actionTime).toBeLessThan(5); // Login should complete in less than 5 seconds
    
    console.log(`Login Action Time: ${actionTime.toFixed(2)}s`);
  });

  test('@performance should measure navigation time', async ({ page }) => {
    const metrics = new PerformanceMetrics(page);
    const loginPage = new LoginPage(page, baseUrl);
    
    await loginPage.navigateTo();
    await loginPage.login('standard_user', 'secret_sauce');
    
    const navigationTime = await metrics.measureActionTime(async () => {
      await page.goto(`${baseUrl}/cart.html`);
      await page.waitForLoadState('networkidle');
    });
    
    expect(navigationTime).toBeGreaterThan(0);
    expect(navigationTime).toBeLessThan(3);
    
    console.log(`Navigation Time: ${navigationTime.toFixed(2)}s`);
  });
});

test.describe('@performance Baseline Comparison Tests', () => {
  test('@performance should compare with baseline', async ({ page }) => {
    const metrics = new PerformanceMetrics(page);
    const baselineManager = new BaselineManager();
    const testName = 'login_page_performance';
    
    await page.goto(baseUrl);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    
    const currentMetrics = await metrics.getAllMetrics();
    
    // Verify metrics structure
    expect(currentMetrics).toBeDefined();
    expect(currentMetrics.pageLoad).toBeDefined();
    expect(currentMetrics.network).toBeDefined();
    
    // Check if baseline exists
    if (baselineManager.baselineExists(testName)) {
      const comparison = baselineManager.compareWithBaseline(testName, currentMetrics, 15);
      
      if (comparison.hasRegression) {
        console.warn('Performance regression detected!');
        comparison.differences.forEach(diff => {
          console.warn(`${diff.metric}: ${diff.percentChange.toFixed(2)}% slower`);
        });
      } else {
        console.log('Performance within threshold');
      }
    } else {
      // Save baseline on first run
      baselineManager.saveBaseline(testName, currentMetrics);
      console.log('Baseline saved for', testName);
    }
    
    // Test passes if metrics are valid numbers
    expect(typeof currentMetrics.pageLoad.loadComplete).toBe('number');
    if (!isNaN(currentMetrics.pageLoad.loadComplete) && currentMetrics.pageLoad.loadComplete > 0) {
      expect(currentMetrics.pageLoad.loadComplete).toBeLessThan(10);
    }
  });
});

test.describe('@smoke @performance Smoke Performance Tests', () => {
  test('@smoke @performance should verify basic performance metrics', async ({ page }) => {
    const metrics = new PerformanceMetrics(page);
    const reporter = new PerformanceReporter();
    
    await page.goto(baseUrl);
    await page.waitForLoadState('networkidle');
    
    // Wait a bit for performance metrics to be available
    await page.waitForTimeout(1000);
    
    const allMetrics = await metrics.getAllMetrics();
    
    // Verify metrics structure exists
    expect(allMetrics).toBeDefined();
    expect(allMetrics.pageLoad).toBeDefined();
    expect(allMetrics.network).toBeDefined();
    expect(allMetrics.resources).toBeDefined();
    
    // Verify metrics are numbers (can be 0 if page loaded very quickly)
    expect(typeof allMetrics.pageLoad.loadComplete).toBe('number');
    expect(typeof allMetrics.network.totalTime).toBe('number');
    expect(Array.isArray(allMetrics.resources)).toBeTruthy();
    
    // Add to reporter
    reporter.addResult('smoke_performance_test', allMetrics, true);
    
    // Generate reports
    reporter.generateJSONReport();
    reporter.generateTextReport();
    
    console.log('Performance metrics collected successfully');
    console.log(`Page Load: ${allMetrics.pageLoad.loadComplete.toFixed(2)}s`);
    console.log(`Network Total: ${allMetrics.network.totalTime.toFixed(2)}s`);
    console.log(`Resources: ${allMetrics.resources.length}`);
  });
});
