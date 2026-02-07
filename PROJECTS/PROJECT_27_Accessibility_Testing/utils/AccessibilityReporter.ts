import * as fs from 'fs';
import * as path from 'path';
import { AccessibilityCheckResult } from './AccessibilityChecker';

interface AccessibilityTestResult {
  testName: string;
  result: AccessibilityCheckResult;
  timestamp: string;
}

/**
 * AccessibilityReporter - Generates accessibility test reports
 */
export class AccessibilityReporter {
  private reportDir: string = 'reports';
  private results: AccessibilityTestResult[] = [];

  constructor() {
    // Ensure report directory exists
    if (!fs.existsSync(this.reportDir)) {
      fs.mkdirSync(this.reportDir, { recursive: true });
    }
  }

  /**
   * Add test result
   * @param testName - Name of the test
   * @param result - Accessibility check result
   */
  addResult(testName: string, result: AccessibilityCheckResult): void {
    this.results.push({
      testName,
      result,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Generate JSON report
   * @param filename - Output filename
   */
  generateJSONReport(filename: string = 'accessibility_report.json'): void {
    const reportPath = path.join(this.reportDir, filename);
    const report = {
      summary: {
        total: this.results.length,
        passed: this.results.filter(r => r.result.passed).length,
        failed: this.results.filter(r => !r.result.passed).length,
        violations: this.results.filter(r => !r.result.passed).length,
      },
      results: this.results,
    };
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  }

  /**
   * Generate text report
   * @param filename - Output filename
   */
  generateTextReport(filename: string = 'accessibility_report.txt'): void {
    const reportPath = path.join(this.reportDir, filename);
    let report = 'Accessibility Test Report\n';
    report += '='.repeat(50) + '\n\n';

    report += `Summary:\n`;
    report += `  Total Tests: ${this.results.length}\n`;
    report += `  Passed: ${this.results.filter(r => r.result.passed).length}\n`;
    report += `  Failed: ${this.results.filter(r => !r.result.passed).length}\n`;
    report += `  Violations Found: ${this.results.filter(r => !r.result.passed).length}\n\n`;

    report += 'Results:\n';
    report += '-'.repeat(50) + '\n';

    for (const testResult of this.results) {
      report += `\nTest: ${testResult.testName}\n`;
      report += `Status: ${testResult.result.passed ? 'PASSED' : 'FAILED'}\n`;
      report += `Message: ${testResult.result.message}\n`;
      report += `Timestamp: ${testResult.timestamp}\n`;
      
      if (testResult.result.details) {
        report += `Details: ${JSON.stringify(testResult.result.details, null, 2)}\n`;
      }
      
      report += '\n';
    }

    // Violations summary
    const violations = this.results.filter(r => !r.result.passed);
    if (violations.length > 0) {
      report += '\n⚠️  ACCESSIBILITY VIOLATIONS FOUND:\n';
      report += '-'.repeat(50) + '\n';
      violations.forEach(vuln => {
        report += `- ${vuln.testName}: ${vuln.result.message}\n`;
      });
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
