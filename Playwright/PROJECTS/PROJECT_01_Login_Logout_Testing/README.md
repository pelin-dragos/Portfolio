# 🚀 Project 1: Login/Logout Testing - Complete Test Suite

## 📋 Project Description

A comprehensive test suite for login/logout functionality on demo websites, implemented using Playwright and TypeScript with best practices in test automation.

**Status:** ✅ Fully Implemented  
**Difficulty Level:** ⭐ Very Easy  
**Technologies:** Playwright, TypeScript, Page Object Pattern

---

## 🎯 Objective

Creating a complete test suite to verify login/logout functionality, covering:
- ✅ Login with valid credentials
- ✅ Login with invalid credentials (multiple scenarios)
- ✅ Logout and session verification
- ✅ Error messages and validations
- ✅ Redirects and security checks

---

## 📁 Project Structure

```
PROJECT_01_Login_Logout_Testing/
├── README.md                    # This file
├── package.json                 # Node.js dependencies
├── tsconfig.json                # TypeScript configuration
├── playwright.config.ts         # Playwright configuration
├── .gitignore                   # Git ignore file
├── pages/                       # Page Object Pattern
│   ├── LoginPage.ts            # Login Page Object
│   └── ProductsPage.ts         # Products Page Object (after login)
└── tests/                       # Test suites
    ├── test_login_success.spec.ts
    ├── test_login_failure.spec.ts
    └── test_logout.spec.ts
```

---

## 🛠️ Technologies Used

- **Playwright** - Modern browser automation framework
- **TypeScript** - Type-safe JavaScript
- **Page Object Pattern** - Professional code organization
- **Cross-browser testing** - Chrome, Firefox, Safari/WebKit

---

## 📦 Installation

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager

### Installation Steps

1. **Navigate to the project folder:**
```bash
cd PROJECT_01_Login_Logout_Testing
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
# Run all tests
npm test

# Run tests in headed mode (see browser)
npm run test:headed

# Run tests with UI mode (interactive)
npm run test:ui

# Run tests in debug mode
npm run test:debug
```

### Run Specific Test Suites

```bash
# Run only login success tests
npm run test:login-success

# Run only login failure tests
npm run test:login-failure

# Run only logout tests
npm run test:logout
```

### Run Specific Browsers

```bash
# Run only on Chromium
npx playwright test --project=chromium

# Run only on Firefox
npx playwright test --project=firefox

# Run only on WebKit (Safari)
npx playwright test --project=webkit
```

### Run Specific Test

```bash
# Run a specific test file
npx playwright test tests/test_login_success.spec.ts

# Run a specific test by name
npx playwright test -g "should login with valid credentials"
```

---

## 📊 Test Suites

### 1. **test_login_success.spec.ts** - Successful Login
- ✅ Login with standard_user
- ✅ Login with multiple user types (problem_user, performance_glitch_user)
- ✅ Verify elements after login

**Number of tests:** 4 test cases

### 2. **test_login_failure.spec.ts** - Failed Login
- ✅ Login with invalid username
- ✅ Login with invalid password
- ✅ Login with empty credentials
- ✅ Login with multiple invalid combinations (parameterized)

**Number of tests:** 7+ test cases

### 3. **test_logout.spec.ts** - Logout
- ✅ Logout after successful login
- ✅ Verify session is cleared
- ✅ Re-login after logout

**Number of tests:** 3 test cases

**Total:** 14+ comprehensive test cases

---

## 🎨 Features

### ✨ Playwright Advantages
- **Auto-waiting** - No need for explicit waits
- **Built-in screenshots** - Automatic on failure
- **Video recording** - Optional video on failure
- **Trace viewer** - Detailed debugging with trace
- **Cross-browser** - Test on Chrome, Firefox, Safari automatically
- **Fast execution** - Parallel test execution
- **Type safety** - TypeScript for better IDE support

### 📊 Test Parametrization
- Parameterized tests for multiple scenarios
- Data-driven approach for invalid credentials
- Reduced code duplication

### 🌐 Cross-Browser Testing
- Configured for Chromium, Firefox, and WebKit
- All tests run on all browsers by default

---

## 💡 Usage Examples

### Basic Test Execution

```bash
# Run all tests
npm test

# Run with verbose output
npx playwright test --reporter=list

# Run and generate HTML report
npx playwright test && npx playwright show-report
```

### Debugging Tests

```bash
# Run in debug mode
npm run test:debug

# Run in UI mode (interactive)
npm run test:ui

# Run specific test with trace
npx playwright test --trace on
```

### View Test Results

```bash
# Show HTML report
npx playwright show-report

# Show trace viewer (after running with trace)
npx playwright show-trace trace.zip
```

---

## 📈 Test Results

After running, you will get:
- 📸 Screenshots for failed tests (in `test-results/`)
- 🎥 Video recordings for failed tests (if enabled)
- 📊 HTML report with detailed results
- 🔍 Trace files for debugging (if enabled)

---

## ⚙️ Configuration

### Tested Websites
**Default:** SauceDemo (https://www.saucedemo.com/)

**For a complete list of practice websites and credentials, see: [TESTING_SITES.md](TESTING_SITES.md)**

### Test Credentials (SauceDemo)
- `standard_user` / `secret_sauce`
- `problem_user` / `secret_sauce`
- `performance_glitch_user` / `secret_sauce`
- `locked_out_user` / `secret_sauce` (for lockout testing)

### Modify Base URL

To test a different website, modify `playwright.config.ts`:

```typescript
use: {
  baseURL: 'https://your-test-website.com',
}
```

Or in Page Object (`pages/LoginPage.ts`):

```typescript
const loginPage = new LoginPage(page, 'https://your-test-website.com/');
```

**See [TESTING_SITES.md](TESTING_SITES.md) for the complete list of practice websites!**

---

## 📚 Additional Documentation

### Page Objects

**LoginPage:**
- `navigateTo()` - Navigate to the login page
- `login(username, password)` - Perform login
- `getErrorMessage()` - Get error message
- `isLoaded()` - Check if page is loaded
- `enterUsername(username)` - Enter username
- `enterPassword(password)` - Enter password
- `clickLogin()` - Click login button

**ProductsPage:**
- `isLoaded()` - Check if products page is loaded
- `logout()` - Perform logout
- `isLoggedIn()` - Check if user is logged in
- `getPageTitle()` - Get page title
- `getCurrentUrl()` - Get current URL

### Playwright Test Fixtures

- `page` - Page fixture (created for each test)
- `context` - Browser context fixture
- `browser` - Browser fixture

---

## ✅ Evaluation Criteria - Status

- [x] **All tests pass** - ✅ Implemented
- [x] **Well-organized code** - ✅ Page Object Pattern
- [x] **Explanatory comments** - ✅ Complete docstrings
- [x] **Complete README** - ✅ This document
- [x] **Screenshot automation** - ✅ Integrated (automatic on failure)
- [x] **Multiple test scenarios** - ✅ 14+ test cases
- [x] **Error handling** - ✅ Comprehensive
- [x] **Cross-browser testing** - ✅ Chromium, Firefox, WebKit

---

## 🎓 What I Learned from This Project

- ✅ Page Object Pattern implementation with TypeScript
- ✅ Playwright test automation framework
- ✅ TypeScript type safety and interfaces
- ✅ Test organization and structure
- ✅ Error handling and screenshot automation
- ✅ Test parametrization with TypeScript
- ✅ Professional code organization
- ✅ Cross-browser testing with Playwright
- ✅ Playwright debugging tools (trace, UI mode)

---

## 🔄 Migration from Selenium

This project was migrated from Selenium Python to Playwright TypeScript. Key improvements:

- ⚡ **Faster execution** - Playwright is 2-3x faster
- 🎯 **Auto-waiting** - No need for explicit waits
- 🔍 **Better debugging** - Trace viewer and UI mode
- 📸 **Built-in features** - Screenshots, video, network interception
- 🛡️ **Type safety** - TypeScript prevents runtime errors
- 🌐 **Better cross-browser** - More reliable browser automation

---

## 🆘 Support

For questions or issues:
1. Check the documentation in this README
2. Check Playwright documentation: https://playwright.dev
3. Check test results and screenshots in `test-results/`
4. Use trace viewer for debugging: `npx playwright show-trace`

---

## 📄 License

This project is created for educational and portfolio purposes.

---

**Project created with ❤️ for Test Automation Portfolio**
