# Proiect 24: Performance Testing with Playwright

## 🎯 Obiectiv
Măsurare completă a performance-ului aplicațiilor web: page load time, network timing, action timing, și comparare cu baseline pentru detectare regressions.

## 📋 Cerințe
- ✅ Măsurare page load time
- ✅ Măsurare timp pentru acțiuni specifice
- ✅ Network timing (via Performance API)
- ✅ Performance metrics collection
- ✅ Reporting pentru performance
- ✅ Baseline și threshold management

## 🛠️ Tehnologii
- **Playwright** - Modern automation framework cu suport nativ pentru Performance API
- **TypeScript** - Strongly typed JavaScript
- **Performance API** - Navigation Timing, Resource Timing
- **Node.js** - Runtime environment

## 📁 Structură Proiect

```
PROJECT_24_Performance_Testing/
├── package.json                  # Dependențe Node.js
├── tsconfig.json                 # Configurare TypeScript
├── playwright.config.ts          # Configurare Playwright
├── README.md                     # Acest fișier
│
├── utils/                         # Utilities
│   ├── PerformanceMetrics.ts    # PerformanceMetrics class
│   ├── BaselineManager.ts        # BaselineManager class
│   └── PerformanceReporter.ts   # PerformanceReporter class
│
├── pages/                         # Page Object Pattern
│   ├── LoginPage.ts             # Login page
│   └── ProductsPage.ts          # Products page
│
├── tests/                         # Test suite
│   └── test_performance.spec.ts
│
├── reports/                       # Reports (generat)
│   ├── performance_report.json  # JSON report
│   └── performance_report.txt    # Text report
│
└── baselines/                     # Baseline metrics (generat)
    └── performance_baseline.json # Baseline storage
```

## ✨ Funcționalități

### 1. Page Load Time Measurement
- **DOM Content Loaded**: Timp până la DOMContentLoaded event
- **Load Complete**: Timp până la load event complete
- **DOM Interactive**: Timp până la DOM interactive
- **DOM Complete**: Timp până la DOM complete

### 2. Network Timing
- **DNS Lookup**: DNS resolution time
- **TCP Connection**: TCP connection time
- **Request Time**: Time to send request
- **Response Time**: Time to receive response
- **DOM Processing**: DOM processing time
- **Total Time**: Total page load time

### 3. Resource Timing
- **Duration**: Resource load duration
- **Size**: Resource transfer size
- **Type**: Resource type (script, css, img, etc.)
- **Slowest Resources**: Identification

### 4. Action Timing
- **Login Action**: Timp pentru login
- **Navigation**: Timp pentru navigation
- **Custom Actions**: Măsurare pentru orice acțiune

### 5. Baseline Management
- **Save Baseline**: Salvează metrics ca baseline
- **Compare**: Compară cu baseline
- **Threshold**: Configurable threshold (default 15%)
- **Regression Detection**: Detectează performance regressions

### 6. Reporting
- **JSON Report**: Structured data
- **Text Report**: Human-readable
- **HTML Report**: Playwright HTML
- **Summary**: Pass/Fail summary

## 📝 Deliverables
- ✅ Suite de teste pentru performance (page load, network, actions)
- ✅ Metrics collection (PerformanceMetrics class)
- ✅ Performance reports (JSON, text)
- ✅ Baseline definition și comparison (BaselineManager)
- ✅ Threshold management (configurable)
- ✅ Documentation completă

## ✅ Criterii de Evaluare
- ✅ Metrics corecte colectate (page load, network, actions)
- ✅ Reports clare pentru performance (JSON, text)
- ✅ Baseline și threshold management funcțional
- ✅ Regression detection funcțională
- ✅ Test assertions pentru performance thresholds

## 🚀 Quick Start

### 1. Setup
```bash
cd PROJECTS/PROJECT_24_Performance_Testing
npm install
npx playwright install --with-deps chromium
mkdir -p reports baselines
```

### 2. Run Tests
```bash
# All performance tests
npm test

# Specific categories
npm run test:page-load
npm run test:network
npm run test:performance

# Smoke tests
npm run test:smoke
```

### 3. View Reports
```bash
# JSON report
cat reports/performance_report.json

# Text report
cat reports/performance_report.txt

# HTML report
npm run report
```

## 📚 Documentație

### Code Examples:

**Măsurare Page Load:**
```typescript
import { PerformanceMetrics } from '../utils/PerformanceMetrics';

const metrics = new PerformanceMetrics(page);
await page.goto(url);
await page.waitForLoadState('networkidle');

const pageLoadMetrics = await metrics.getPageLoadTime();
console.log(`Load time: ${pageLoadMetrics.loadComplete.toFixed(2)}s`);
```

**Măsurare Network:**
```typescript
const networkMetrics = await metrics.getNetworkTiming();
console.log(`DNS: ${networkMetrics.dns.toFixed(2)}s`);
console.log(`Total: ${networkMetrics.totalTime.toFixed(2)}s`);
```

**Baseline Comparison:**
```typescript
import { BaselineManager } from '../utils/BaselineManager';

const baselineManager = new BaselineManager();
const comparison = baselineManager.compareWithBaseline(
  'test_name',
  currentMetrics,
  15 // threshold percent
);

if (comparison.hasRegression) {
  console.warn('Performance regression detected!');
}
```

**Action Timing:**
```typescript
const actionTime = await metrics.measureActionTime(async () => {
  await loginPage.login('user', 'pass');
});
console.log(`Action time: ${actionTime.toFixed(2)}s`);
```

## 📊 Performance Metrics Details

### Navigation Timing API:
- **navigationStart**: Start of navigation
- **domContentLoaded**: DOMContentLoaded event
- **loadEventEnd**: Load event complete
- **domInteractive**: DOM interactive
- **domComplete**: DOM complete

### Network Timing:
- **DNS**: domainLookupEnd - domainLookupStart
- **TCP**: connectEnd - connectStart
- **Request**: responseStart - requestStart
- **Response**: responseEnd - responseStart

### Resource Timing:
- **getEntriesByType('resource')**: All resources
- **duration**: Load duration
- **transferSize**: Resource size
- **initiatorType**: Resource type

## 📊 Status Implementare

| Funcționalitate | Status | Note |
|----------------|--------|------|
| Page Load Metrics | ✅ Implementat | Navigation Timing API |
| Network Timing | ✅ Implementat | Performance API |
| Resource Timing | ✅ Implementat | Resource Timing API |
| Action Timing | ✅ Implementat | Custom measurement |
| Baseline Manager | ✅ Implementat | JSON storage |
| Threshold Comparison | ✅ Implementat | Configurable |
| Reporting | ✅ Implementat | JSON, text |
| Test Suites | ✅ Implementat | Comprehensive tests |

## 💡 Tips

1. **Pentru Accurate Metrics:**
   - Run tests în controlled environment
   - Close background applications
   - Use consistent network conditions
   - Run multiple times pentru average

2. **Pentru Baseline:**
   - Create baseline după optimizări
   - Update baseline după major changes
   - Use reasonable threshold (10-15%)

3. **Pentru Debugging:**
   - Check network tab în browser
   - Review resource timing
   - Check server response times

4. **Pentru CI/CD:**
   - Set thresholds pentru CI/CD
   - Fail tests dacă performance degrades
   - Track metrics over time

## 🔧 Configuration

### Performance Thresholds:
```typescript
// In tests
expect(pageLoadMetrics.loadComplete).toBeLessThan(5); // 5 seconds
expect(networkMetrics.totalTime).toBeLessThan(5);
expect(actionTime).toBeLessThan(3);
```

### Baseline Threshold:
```typescript
// Default 15% threshold
const comparison = baselineManager.compareWithBaseline(
  'test_name',
  currentMetrics,
  15 // percent
);
```

---

**Succes cu Performance Testing! 🚀**