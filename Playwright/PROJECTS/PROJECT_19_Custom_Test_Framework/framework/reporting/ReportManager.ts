import * as fs from 'fs';
import * as path from 'path';

interface TestResult {
  name: string;
  status: 'passed' | 'failed' | 'skipped';
  duration: number;
  timestamp: string;
  error?: string;
}

/**
 * ReportManager - Test results management
 * Manages test results and generates reports
 */
export class ReportManager {
  private results: TestResult[] = [];
  private reportDir: string = 'reports';

  constructor() {
    // Ensure report directory exists
    if (!fs.existsSync(this.reportDir)) {
      fs.mkdirSync(this.reportDir, { recursive: true });
    }
  }

  /**
   * Save test result
   * @param name - Test name
   * @param status - Test status
   * @param duration - Test duration in seconds
   * @param error - Error message if failed
   */
  saveTestResult(
    name: string,
    status: 'passed' | 'failed' | 'skipped',
    duration: number,
    error?: string
  ): void {
    this.results.push({
      name,
      status,
      duration,
      timestamp: new Date().toISOString(),
      error,
    });
  }

  /**
   * Generate summary
   * @returns Summary object
   */
  generateSummary(): {
    total: number;
    passed: number;
    failed: number;
    skipped: number;
    duration: number;
  } {
    const total = this.results.length;
    const passed = this.results.filter(r => r.status === 'passed').length;
    const failed = this.results.filter(r => r.status === 'failed').length;
    const skipped = this.results.filter(r => r.status === 'skipped').length;
    const duration = this.results.reduce((sum, r) => sum + r.duration, 0);

    return {
      total,
      passed,
      failed,
      skipped,
      duration,
    };
  }

  /**
   * Generate JSON report
   * @param filename - Output filename
   */
  generateJSONReport(filename: string = 'test-results.json'): void {
    const reportPath = path.join(this.reportDir, filename);
    const report = {
      summary: this.generateSummary(),
      results: this.results,
    };
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  }

  /**
   * Clear results
   */
  clearResults(): void {
    this.results = [];
  }
}
