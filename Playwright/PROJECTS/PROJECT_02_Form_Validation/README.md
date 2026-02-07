# 🚀 Project 2: Form Validation Testing - Complete Test Suite

## 📋 Project Description

A comprehensive test suite for web form validation, implemented using Playwright and TypeScript with best practices in test automation. Covers email, phone, required fields, and password validation.

**Status:** ✅ Fully Implemented  
**Difficulty Level:** ⭐⭐ Easy  
**Technologies:** Playwright, TypeScript, Page Object Pattern

---

## 🎯 Objective

Creating a complete test suite to verify web form validation, covering:
- ✅ Email validation (correct/incorrect format)
- ✅ Phone validation (length, format)
- ✅ Required fields validation
- ✅ Password validation (minimum length, special characters)
- ✅ Error messages for each validation type
- ✅ Tests for positive and negative cases

---

## 📁 Project Structure

```
PROJECT_02_Form_Validation/
├── README.md                    # This file
├── package.json                 # Node.js dependencies
├── tsconfig.json                # TypeScript configuration
├── playwright.config.ts         # Playwright configuration
├── .gitignore                   # Git ignore file
├── pages/                       # Page Object Pattern
│   └── FormPage.ts             # Form Page Object
└── tests/                       # Test suites
    ├── test_email_validation.spec.ts
    ├── test_phone_validation.spec.ts
    ├── test_required_fields.spec.ts
    └── test_password_validation.spec.ts
```

---

## 🛠️ Technologies Used

- **Playwright 1.40.0+** - Browser automation
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
cd PROJECTS/PROJECT_02_Form_Validation
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
cd PROJECTS/PROJECT_02_Form_Validation

# 2. Install dependencies (first time only)
npm install
npx playwright install

# 3. Run all tests
npm test
```

### Test Commands

**Run all tests:**
```bash
npm test
```

**Run tests with visible browser:**
```bash
npm run test:headed
```

**Run tests in UI mode (interactive):**
```bash
npm run test:ui
```

**Run tests in debug mode:**
```bash
npm run test:debug
```

**Run specific test suites:**
```bash
npm run test:email      # Email validation tests
npm run test:phone      # Phone validation tests
npm run test:required   # Required fields tests
npm run test:password   # Password validation tests
```

**Run specific test file:**
```bash
npx playwright test tests/test_email_validation.spec.ts
```

**Run tests on specific browser:**
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

---

## 📊 Test Suites

### 1. **test_email_validation.spec.ts** - Email Validation
- ✅ Email with valid format
- ✅ Email without @
- ✅ Email without domain
- ✅ Email without username
- ✅ Empty email field
- ✅ Multiple valid/invalid formats (parameterized)

**Number of tests:** 10+ test cases

### 2. **test_phone_validation.spec.ts** - Phone Validation
- ✅ Phone with valid format (10 digits)
- ✅ Phone too short (< 10 digits)
- ✅ Phone too long (> 10 digits)
- ✅ Phone with letters
- ✅ Empty phone field (required)
- ✅ Multiple invalid formats (parameterized)

**Number of tests:** 8+ test cases

### 3. **test_required_fields.spec.ts** - Required Fields
- ✅ First Name empty (required)
- ✅ Last Name empty (required)
- ✅ Email empty (required)
- ✅ Multiple empty fields simultaneously
- ✅ All fields completed (positive test)
- ✅ Parameterized tests for all required fields

**Number of tests:** 6+ test cases

### 4. **test_password_validation.spec.ts** - Password Validation
- ✅ Password with valid format
- ✅ Password too short (minimum length)
- ✅ Empty password field (required)
- ✅ Password with special characters
- ✅ Password with only numbers
- ✅ Multiple password formats (parameterized)

**Number of tests:** 6+ test cases

**Total:** 30+ comprehensive test cases

---

## 🌐 Tested Websites

The project uses demo practice websites for testing:
- **DemoQA Text Box** - https://demoqa.com/text-box
- **DemoQA Practice Form** - https://demoqa.com/automation-practice-form
- **The Internet** - https://the-internet.herokuapp.com/login

---

## 📊 Test Coverage

### Email Validation
- ✅ Valid formats (5+ variants)
- ✅ Invalid formats (6+ variants)
- ✅ Empty field
- ✅ HTML5 validation

### Phone Validation
- ✅ Valid format (10 digits)
- ✅ Invalid format (too short, too long, with letters)
- ✅ Empty field (required)
- ✅ HTML5 validation

### Required Fields
- ✅ First Name required
- ✅ Last Name required
- ✅ Email required
- ✅ Multiple empty fields
- ✅ All fields completed

### Password Validation
- ✅ Valid format
- ✅ Minimum length
- ✅ Special characters
- ✅ Empty field (required)
- ✅ Different formats

---

## ✨ Features

- ✅ Complete Page Object Pattern implementation
- ✅ TypeScript for type safety
- ✅ Automatic screenshots on failure
- ✅ Video recording on failure
- ✅ Trace viewer for debugging
- ✅ Cross-browser testing (Chromium, Firefox, WebKit)
- ✅ Parameterized tests for multiple scenarios
- ✅ HTML5 validation testing
- ✅ Professional code organization

---

## 🔍 Test Results

After running tests, you can view results:

**HTML Report:**
```bash
npx playwright show-report
```

**View trace (for failed tests):**
```bash
npx playwright show-trace trace.zip
```

---

## 🐛 Troubleshooting

### Problem: "Element not found"
**Solution:** Check that the website is accessible and that locators are correct. Some sites may have changed their structure.

### Problem: "Test fails randomly"
**Solution:** Increase timeouts or add explicit waits. Network conditions may affect test execution.

### Problem: "Browser not installed"
**Solution:** Run `npx playwright install` to install all required browsers.

---

## ✅ Deliverables

- ✅ Complete test suite for minimum 8 validation scenarios (30+ test cases)
- ✅ Documentation about tested validation types
- ✅ Test data examples (valid/invalid)
- ✅ Tests for positive and negative cases
- ✅ Reusable code (Page Object Pattern)
- ✅ Complete coverage of validation scenarios

---

## 🎓 Learning and Portfolio

This project demonstrates:
- ✅ Page Object Pattern
- ✅ TypeScript for test automation
- ✅ Playwright best practices
- ✅ Parameterized tests
- ✅ Web form validation testing
- ✅ HTML5 validation testing
- ✅ Multiple demo websites
- ✅ Best practices in test automation

**Perfect for portfolio and demonstration of test automation skills!** 🚀

---

## 📝 Notes

- ✅ All tests are created for demo practice websites
- ✅ No special permissions required
- ✅ Websites accept automated testing
- ✅ Code is commented for easy learning

---

**Happy testing! 🎉**
