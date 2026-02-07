# 🚀 Project 3: Google Search Automation - Complete Test Suite

## 📋 Project Description

A comprehensive test suite for automating Google searches, implemented using Playwright and TypeScript with best practices in test automation. Covers searches, result verification, autocomplete, and cookie management.

**Status:** ✅ Fully Implemented  
**Difficulty Level:** ⭐⭐ Easy  
**Technologies:** Playwright, TypeScript, Page Object Pattern

---

## 🎯 Objective

Creating a complete test suite for automating Google searches, covering:
- ✅ Search automation with different queries
- ✅ Verification that results contain searched keywords
- ✅ Testing searches in multiple languages
- ✅ Verifying search suggestions (autocomplete)
- ✅ Cookie popup management
- ✅ Verifying that first 3 results are relevant

---

## 📁 Project Structure

```
PROJECT_03_Google_Search_Automation/
├── README.md                    # This file
├── package.json                 # Node.js dependencies
├── tsconfig.json                # TypeScript configuration
├── playwright.config.ts         # Playwright configuration
├── .gitignore                   # Git ignore file
├── pages/                       # Page Object Pattern
│   └── GoogleSearchPage.ts     # Google Search Page Object
└── tests/                       # Test suites
    ├── test_search_queries.spec.ts
    ├── test_search_results.spec.ts
    ├── test_autocomplete.spec.ts
    └── test_cookies.spec.ts
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
cd PROJECTS/PROJECT_03_Google_Search_Automation
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
cd PROJECTS/PROJECT_03_Google_Search_Automation

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
npm run test:queries       # Search queries tests
npm run test:results       # Search results tests
npm run test:autocomplete  # Autocomplete tests
npm run test:cookies       # Cookies handling tests
```

**Run specific test file:**
```bash
npx playwright test tests/test_search_queries.spec.ts
```

**Run tests on specific browser:**
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

---

## 📊 Test Suites

### 1. **test_search_queries.spec.ts** - Search Queries
- ✅ Simple search
- ✅ Multiple searches (7+ parameterized queries)
- ✅ Long query
- ✅ Special characters
- ✅ Empty query

**Number of tests:** 13+ test cases

### 2. **test_search_results.spec.ts** - Results Verification
- ✅ First 3 results are relevant
- ✅ Results contain keywords (parameterized)
- ✅ Results have title and link

**Number of tests:** 6+ test cases

### 3. **test_autocomplete.spec.ts** - Autocomplete Suggestions
- ✅ Suggestions appear
- ✅ Autocomplete for multiple queries (parameterized)
- ✅ Suggestions are relevant

**Number of tests:** 7+ test cases

### 4. **test_cookies.spec.ts** - Cookies Handling
- ✅ Accept cookies
- ✅ Reject cookies
- ✅ Search after cookie handling

**Number of tests:** 3 test cases

**Total:** 29+ comprehensive test cases

---

## 🌐 Tested Websites

The project uses Google Search for testing:
- **Google.com** - https://www.google.com

⚠️ **Note:** Google is a real website and may have anti-bot protection. Tests are created for educational and practice purposes.

---

## 📊 Test Coverage

### Search Queries
- ✅ Simple query
- ✅ Multiple queries (7+ parameterized variants)
- ✅ Long query
- ✅ Special characters
- ✅ Empty query

### Search Results
- ✅ Result relevance (first 3)
- ✅ Keywords in results (parameterized)
- ✅ Result structure (title, link, snippet)

### Autocomplete
- ✅ Suggestions appearance
- ✅ Autocomplete for multiple queries (parameterized)
- ✅ Suggestions relevance

### Cookies Handling
- ✅ Accept cookies
- ✅ Reject cookies
- ✅ Search after handling

---

## ✨ Features

- ✅ Complete Page Object Pattern implementation
- ✅ TypeScript for type safety
- ✅ Automatic screenshots on failure
- ✅ Video recording on failure
- ✅ Trace viewer for debugging
- ✅ Cross-browser testing (Chromium, Firefox, WebKit)
- ✅ Parameterized tests for multiple scenarios
- ✅ Cookie popup handling with multiple language support
- ✅ Autocomplete suggestions testing
- ✅ Result relevance verification
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
**Solution:** Google may change page structure. Check locators in `GoogleSearchPage.ts`. Also, Google may have rate limiting or anti-bot protection.

### Problem: "Test fails randomly"
**Solution:** Google may have rate limiting. Increase delays between tests or reduce parallel execution.

### Problem: "Cookies popup not found"
**Solution:** Google may not show cookie popup in all regions or after first acceptance. Tests handle this gracefully.

---

## ✅ Deliverables

- ✅ Tests for minimum 5 different queries (15+ with parameterization)
- ✅ Verification that first 3 results are relevant
- ✅ Code that handles popups and cookies
- ✅ Tests for positive and negative cases
- ✅ Reusable code (Page Object Pattern, fixtures)
- ✅ Complete coverage of search scenarios

---

## 🎓 Learning and Portfolio

This project demonstrates:
- ✅ Page Object Pattern
- ✅ TypeScript for test automation
- ✅ Playwright best practices
- ✅ Parameterized tests
- ✅ Web search automation
- ✅ Cookie popup handling
- ✅ Result verification and relevance
- ✅ Autocomplete testing
- ✅ Best practices in test automation

**Perfect for portfolio and demonstration of test automation skills!** 🚀

---

## 📝 Notes

- ✅ Tests are created for educational purposes
- ⚠️ Google may have anti-bot protection (use responsibly)
- ✅ Code is commented for easy learning
- ⚠️ Respect Google's Terms of Service

---

## ⚠️ Warning

**Responsible Usage:**
- Tests are created for educational and practice purposes
- Do not abuse Google's rate limiting
- Respect Terms of Service
- For large-scale testing, use Google Custom Search API

---

**Happy testing! 🎉**
