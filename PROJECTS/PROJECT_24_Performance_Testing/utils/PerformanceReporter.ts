import * as fs from 'fs';
import * as path from 'path';
import { PerformanceMetrics } from './PerformanceMetrics';

interface TestResult {
  testName: string;
  metrics: PerformanceMetrics;
  timestamp: string;
  passed: boolean;
  message?: string;
}

/**
 * PerformanceReporter - Generates performance reports
 */
export class PerformanceReporter {
  private reportDir: string = 'reports';
  private results: TestResult[] = [];

  constructor() {
    // Ensure report directory exists
    if (!fs.existsSync(this.reportDir)) {
      fs.mkdirSync(this.reportDir, { recursive: true });
    }
  }

  /**
   * Add test result
   * @param testName - Name of the test
   * @param metrics - Performance metrics
   * @param passed - Whether test passed
   * @param message - Optional message
   */
  addResult(
    testName: string,
    metrics: PerformanceMetrics,
    passed: boolean,
    message?: string
  ): void {
    this.results.push({
      testName,
      metrics,
      timestamp: new Date().toISOString(),
      passed,
      message,
    });
  }

  /**
   * Generate JSON report
   * @param filename - Output filename
   */
  generateJSONReport(filename: string = 'performance_report.json'): void {
    const reportPath = path.join(this.reportDir, filename);
    const report = {
      summary: {
        total: this.results.length,
        passed: this.results.filter(r => r.passed).length,
        failed: this.results.filter(r => !r.passed).length,
      },
      results: this.results,
    };
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  }

  /**
   * Generate text report
   * @param filename - Output filename
   */
  generateTextReport(filename: string = 'performance_report.txt'): void {
    const reportPath = path.join(this.reportDir, filename);
    let report = 'Performance Test Report\n';
    report += '='.repeat(50) + '\n\n';

    report += `Summary:\n`;
    report += `  Total Tests: ${this.results.length}\n`;
    report += `  Passed: ${this.results.filter(r => r.passed).length}\n`;
    report += `  Failed: ${this.results.filter(r => !r.passed).length}\n\n`;

    report += 'Results:\n';
    report += '-'.repeat(50) + '\n';

    for (const result of this.results) {
      report += `\nTest: ${result.testName}\n`;
      report += `Status: ${result.passed ? 'PASSED' : 'FAILED'}\n`;
      report += `Timestamp: ${result.timestamp}\n`;
      
      if (result.message) {
        report += `Message: ${result.message}\n`;
      }

      report += `\nMetrics:\n`;
      report += `  Page Load Time: ${result.metrics.pageLoad.loadComplete.toFixed(2)}s\n`;
      report += `  Network Total Time: ${result.metrics.network.totalTime.toFixed(2)}s\n`;
      report += `  DNS: ${result.metrics.network.dns.toFixed(2)}s\n`;
      report += `  TCP: ${result.metrics.network.tcp.toFixed(2)}s\n`;
      report += `  Response: ${result.metrics.network.response.toFixed(2)}s\n`;

      if (result.metrics.actionTime) {
        report += `  Action Time: ${result.metrics.actionTime.toFixed(2)}s\n`;
      }

      report += '\n';
    }

    fs.writeFileSync(reportPath, report);
  }

  /**
   * Clear results
   */
  clearResults(): void {
    this.results = [];
  }
}
