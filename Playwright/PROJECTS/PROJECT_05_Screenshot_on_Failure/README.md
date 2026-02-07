# 🚀 Project 5: Screenshot on Failure - Complete Suite

## 📋 Project Description

A comprehensive test suite with automatic screenshot capture on test failure, implemented using Playwright and TypeScript with best practices in test automation. Demonstrates automatic screenshot functionality for debugging.

**Status:** ✅ Fully Implemented  
**Difficulty Level:** ⭐⭐ Easy  
**Technologies:** Playwright, TypeScript, Page Object Pattern, Screenshot Automation

---

## 🎯 Objective

Creating an automatic screenshot capture system when tests fail, covering:
- ✅ Automatic screenshot capture on test failure
- ✅ Screenshot organization with timestamps
- ✅ Screenshot includes test name and error information
- ✅ Organization in test-results directory
- ✅ Automatic video capture on failure
- ✅ Trace viewer support for debugging

---

## 📁 Project Structure

```
PROJECT_05_Screenshot_on_Failure/
├── README.md                    # This file
├── package.json                 # Node.js dependencies
├── tsconfig.json                # TypeScript configuration
├── playwright.config.ts         # Playwright configuration (screenshot on failure)
├── .gitignore                   # Git ignore file
├── pages/                       # Page Object Pattern
│   └── LoginPage.ts            # Login Page Object (SauceDemo)
└── tests/                       # Test suites
    └── test_screenshot_on_failure.spec.ts
```

---

## 🛠️ Technologies Used

- **Playwright 1.40.0+** - Browser automation with built-in screenshot support
- **TypeScript 5.3.3+** - Type-safe test code
- **Page Object Pattern** - Professional code organization

---

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation Steps

1. **Navigate to the project folder:**
```bash
cd PROJECTS/PROJECT_05_Screenshot_on_Failure
```

2. **Install dependencies:**
```bash
npm install
```

3. **Install Playwright browsers:**
```bash
npx playwright install
```

---

## 🚀 Running Tests

### Quick Start

```bash
# 1. Navigate to the project folder
cd PROJECTS/PROJECT_05_Screenshot_on_Failure

# 2. Install dependencies (first time only)
npm install
npx playwright install

# 3. Run all tests
npm test

# 4. Run tests that intentionally fail (to see screenshots)
npm run test:failures
```

### Test Commands

**Run all tests:**
```bash
npm test
```

**Run only tests that demonstrate failures:**
```bash
npm run test:failures
```

**Run with UI (recommended for debugging):**
```bash
npm run test:ui
```

**Run in headed mode (see browser):**
```bash
npm run test:headed
```

**Debug tests:**
```bash
npm run test:debug
```

---

## 📊 Test Suites

### 1. **test_screenshot_on_failure.spec.ts** - Screenshot on Failure Demonstration
- ✅ Successful login (no screenshot generated)
- ✅ Failed login with invalid credentials (screenshot captured)
- ✅ Assertion failure (screenshot captured)
- ✅ Element not found failure (screenshot captured)
- ✅ Timeout failure (screenshot captured)

**Number of tests:** 5 test cases (4 intentionally fail to demonstrate screenshots)

---

## 🎨 Features

### Automatic Screenshot Capture
- ✅ **Automatic capture** - Playwright automatically captures screenshots when tests fail
- ✅ **Zero configuration** - Works automatically for all tests via `playwright.config.ts`
- ✅ **Automatic organization** - Screenshots saved in `test-results/` directory
- ✅ **Video capture** - Videos are also captured on failure
- ✅ **Trace viewer** - Traces are captured for debugging

### How It Works

In Playwright, screenshot on failure is configured in `playwright.config.ts`:

```typescript
use: {
  screenshot: 'only-on-failure',  // Key setting
  video: 'retain-on-failure',
  trace: 'on-first-retry',
}
```

Screenshots are automatically captured when tests fail and saved in the `test-results/` directory.

---

## 📸 Screenshot Organization

Screenshots are automatically organized in the `test-results/` directory:

```
test-results/
├── test-name-chromium/
│   ├── test-output.png          # Screenshot on failure
│   ├── video.webm               # Video on failure
│   └── trace.zip                # Trace file for debugging
```

### Screenshot Format:
- Automatic naming by Playwright
- Includes test name and browser
- Organized in subdirectories per test

---

## 🔍 How Screenshot on Failure Works

### Playwright Configuration

Playwright automatically captures screenshots when tests fail through the `screenshot: 'only-on-failure'` setting in the configuration file. No additional code is needed in tests.

### Features:
- ✅ Executes automatically for all tests
- ✅ Captures screenshot only when test fails
- ✅ Includes video and trace for debugging
- ✅ Handles errors gracefully
- ✅ Includes test information in file names

---

## 🌐 Tested Websites

The project uses demo practice sites for testing:
- **SauceDemo** - https://www.saucedemo.com/ (for login testing)

---

## 📊 Test Coverage

### Screenshot Automation
- ✅ Screenshot automatically captured on assertion failure
- ✅ Screenshot automatically captured on element not found
- ✅ Screenshot automatically captured on timeout
- ✅ Screenshot automatically captured on login failure
- ✅ No screenshot captured for successful tests

---

## 🐛 Troubleshooting

### Problem: "Screenshot not saved"
**Solution:**
1. Check that `test-results/` directory is created
2. Verify write permissions
3. Check test output for errors

### Problem: "Screenshot not appearing"
**Solution:**
1. Ensure `screenshot: 'only-on-failure'` is set in `playwright.config.ts`
2. Verify test is actually failing
3. Check `test-results/` directory after test run

### Problem: "Want to see screenshots for passed tests"
**Solution:**
Change `screenshot: 'only-on-failure'` to `screenshot: 'on'` in `playwright.config.ts`

---

## ✅ Deliverables

- ✅ Functional screenshot automation
- ✅ Organized screenshot storage
- ✅ README with explanations about debugging with screenshots
- ✅ Tests that demonstrate the functionality
- ✅ Automatic video and trace capture

---

## 🎓 Learning and Portfolio

This project demonstrates:
- ✅ Playwright screenshot automation
- ✅ Automatic screenshot capture on failure
- ✅ Automatic file organization
- ✅ Error handling and debugging tools
- ✅ Best practices in test automation

**Perfect for portfolio and demonstration of skills in test automation!** 🚀

---

## 💡 Usage Examples

### Automatic Usage (Playwright)

```typescript
test('some test', async ({ page }) => {
  // Normal test - no need to do anything for screenshot
  // If test fails, screenshot is captured automatically!
  await expect(someElement).toBeVisible();
});
```

The screenshot will be automatically saved in `test-results/` if the test fails.

---

## 📝 Notes

- ✅ Screenshots are automatically saved only for failed tests
- ✅ Successful tests do not generate screenshots (unless configured)
- ✅ Screenshots work automatically for all tests using the configuration
- ✅ Code is commented for learning ease
- ⚠️ Screenshots are saved in `test-results/` directory (can be large)

---

**Good luck with automated debugging! 🎉**
