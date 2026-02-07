import { Page } from '@playwright/test';

export interface PageLoadMetrics {
  domContentLoaded: number;
  loadComplete: number;
  domInteractive: number;
  domComplete: number;
}

export interface NetworkTiming {
  dns: number;
  tcp: number;
  request: number;
  response: number;
  domProcessing: number;
  totalTime: number;
}

export interface ResourceTiming {
  name: string;
  duration: number;
  size: number;
  type: string;
}

export interface PerformanceMetrics {
  pageLoad: PageLoadMetrics;
  network: NetworkTiming;
  resources: ResourceTiming[];
  actionTime?: number;
}

/**
 * PerformanceMetrics - Collects performance metrics using Playwright and Performance API
 */
export class PerformanceMetrics {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Get page load time metrics
   * @returns Page load metrics
   */
  async getPageLoadTime(): Promise<PageLoadMetrics> {
    const metrics = await this.page.evaluate(() => {
      const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (!perfData) {
        // Fallback if Performance API is not available
        return {
          domContentLoaded: 0,
          loadComplete: 0,
          domInteractive: 0,
          domComplete: 0,
        };
      }
      return {
        domContentLoaded: (perfData.domContentLoadedEventEnd || perfData.domContentLoadedEventStart || 0) - perfData.navigationStart,
        loadComplete: (perfData.loadEventEnd || perfData.loadEventStart || 0) - perfData.navigationStart,
        domInteractive: (perfData.domInteractive || 0) - perfData.navigationStart,
        domComplete: (perfData.domComplete || 0) - perfData.navigationStart,
      };
    });

    return {
      domContentLoaded: Math.max(0, metrics.domContentLoaded / 1000), // Convert to seconds
      loadComplete: Math.max(0, metrics.loadComplete / 1000),
      domInteractive: Math.max(0, metrics.domInteractive / 1000),
      domComplete: Math.max(0, metrics.domComplete / 1000),
    };
  }

  /**
   * Get network timing metrics
   * @returns Network timing metrics
   */
  async getNetworkTiming(): Promise<NetworkTiming> {
    const metrics = await this.page.evaluate(() => {
      const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (!perfData) {
        // Fallback if Performance API is not available
        return {
          dns: 0,
          tcp: 0,
          request: 0,
          response: 0,
          domProcessing: 0,
          totalTime: 0,
        };
      }
      return {
        dns: Math.max(0, (perfData.domainLookupEnd || 0) - (perfData.domainLookupStart || 0)),
        tcp: Math.max(0, (perfData.connectEnd || 0) - (perfData.connectStart || 0)),
        request: Math.max(0, (perfData.responseStart || 0) - (perfData.requestStart || 0)),
        response: Math.max(0, (perfData.responseEnd || 0) - (perfData.responseStart || 0)),
        domProcessing: Math.max(0, (perfData.domComplete || 0) - (perfData.domInteractive || 0)),
        totalTime: Math.max(0, (perfData.loadEventEnd || perfData.loadEventStart || 0) - perfData.navigationStart),
      };
    });

    return {
      dns: metrics.dns / 1000,
      tcp: metrics.tcp / 1000,
      request: metrics.request / 1000,
      response: metrics.response / 1000,
      domProcessing: metrics.domProcessing / 1000,
      totalTime: metrics.totalTime / 1000,
    };
  }

  /**
   * Get resource timing metrics
   * @returns Resource timing metrics
   */
  async getResourceTiming(): Promise<ResourceTiming[]> {
    const resources = await this.page.evaluate(() => {
      const resourceEntries = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      return resourceEntries.map((entry: any) => ({
        name: entry.name,
        duration: entry.duration,
        size: entry.transferSize || 0,
        type: entry.initiatorType || 'unknown',
      }));
    });

    return resources.map(r => ({
      name: r.name,
      duration: r.duration / 1000, // Convert to seconds
      size: r.size,
      type: r.type,
    }));
  }

  /**
   * Get slowest resources
   * @param count - Number of slowest resources to return
   * @returns Slowest resources
   */
  async getSlowestResources(count: number = 5): Promise<ResourceTiming[]> {
    const resources = await this.getResourceTiming();
    return resources
      .sort((a, b) => b.duration - a.duration)
      .slice(0, count);
  }

  /**
   * Measure action time
   * @param action - Async function to measure
   * @returns Action time in seconds
   */
  async measureActionTime(action: () => Promise<void>): Promise<number> {
    const startTime = Date.now();
    await action();
    const endTime = Date.now();
    return (endTime - startTime) / 1000; // Convert to seconds
  }

  /**
   * Get all performance metrics
   * @returns Complete performance metrics
   */
  async getAllMetrics(): Promise<PerformanceMetrics> {
    const [pageLoad, network, resources] = await Promise.all([
      this.getPageLoadTime(),
      this.getNetworkTiming(),
      this.getResourceTiming(),
    ]);

    return {
      pageLoad,
      network,
      resources,
    };
  }
}
