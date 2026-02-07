import * as fs from 'fs';
import * as path from 'path';
import { PerformanceMetrics } from './PerformanceMetrics';

interface BaselineData {
  [testName: string]: PerformanceMetrics;
}

/**
 * BaselineManager - Manages performance baselines
 */
export class BaselineManager {
  private baselineDir: string = 'baselines';
  private baselineFile: string = 'performance_baseline.json';

  constructor() {
    // Ensure baseline directory exists
    if (!fs.existsSync(this.baselineDir)) {
      fs.mkdirSync(this.baselineDir, { recursive: true });
    }
  }

  /**
   * Get baseline path
   * @returns Path to baseline file
   */
  private getBaselinePath(): string {
    return path.join(this.baselineDir, this.baselineFile);
  }

  /**
   * Load baseline data
   * @returns Baseline data
   */
  loadBaseline(): BaselineData {
    const baselinePath = this.getBaselinePath();
    if (!fs.existsSync(baselinePath)) {
      return {};
    }

    try {
      const data = fs.readFileSync(baselinePath, 'utf-8');
      return JSON.parse(data);
    } catch {
      return {};
    }
  }

  /**
   * Save baseline for a test
   * @param testName - Name of the test
   * @param metrics - Performance metrics
   */
  saveBaseline(testName: string, metrics: PerformanceMetrics): void {
    const baseline = this.loadBaseline();
    baseline[testName] = metrics;
    
    const baselinePath = this.getBaselinePath();
    fs.writeFileSync(baselinePath, JSON.stringify(baseline, null, 2));
  }

  /**
   * Check if baseline exists for a test
   * @param testName - Name of the test
   * @returns True if baseline exists
   */
  baselineExists(testName: string): boolean {
    const baseline = this.loadBaseline();
    return testName in baseline;
  }

  /**
   * Get baseline for a test
   * @param testName - Name of the test
   * @returns Baseline metrics or null
   */
  getBaseline(testName: string): PerformanceMetrics | null {
    const baseline = this.loadBaseline();
    return baseline[testName] || null;
  }

  /**
   * Compare current metrics with baseline
   * @param testName - Name of the test
   * @param currentMetrics - Current performance metrics
   * @param thresholdPercent - Threshold percentage (default 15%)
   * @returns Comparison result
   */
  compareWithBaseline(
    testName: string,
    currentMetrics: PerformanceMetrics,
    thresholdPercent: number = 15
  ): {
    hasRegression: boolean;
    differences: {
      metric: string;
      baseline: number;
      current: number;
      difference: number;
      percentChange: number;
    }[];
  } {
    const baseline = this.getBaseline(testName);
    if (!baseline) {
      return {
        hasRegression: false,
        differences: [],
      };
    }

    const differences: {
      metric: string;
      baseline: number;
      current: number;
      difference: number;
      percentChange: number;
    }[] = [];

    // Compare page load metrics
    const pageLoadDiff = this.compareMetrics(
      baseline.pageLoad.loadComplete,
      currentMetrics.pageLoad.loadComplete,
      'pageLoad.loadComplete'
    );
    if (pageLoadDiff) differences.push(pageLoadDiff);

    // Compare network timing
    const networkDiff = this.compareMetrics(
      baseline.network.totalTime,
      currentMetrics.network.totalTime,
      'network.totalTime'
    );
    if (networkDiff) differences.push(networkDiff);

    // Check for regressions (performance degradation > threshold)
    const hasRegression = differences.some(
      diff => diff.percentChange > thresholdPercent
    );

    return {
      hasRegression,
      differences,
    };
  }

  /**
   * Compare two metric values
   * @param baseline - Baseline value
   * @param current - Current value
   * @param metricName - Name of the metric
   * @returns Comparison result or null if no significant difference
   */
  private compareMetrics(
    baseline: number,
    current: number,
    metricName: string
  ): {
    metric: string;
    baseline: number;
    current: number;
    difference: number;
    percentChange: number;
  } | null {
    const difference = current - baseline;
    const percentChange = (difference / baseline) * 100;

    return {
      metric: metricName,
      baseline,
      current,
      difference,
      percentChange,
    };
  }
}
