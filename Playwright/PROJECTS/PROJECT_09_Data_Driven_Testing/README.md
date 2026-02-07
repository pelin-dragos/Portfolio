# 🚀 Project 9: Data-Driven Testing - Complete Suite

## 📋 Project Description

A comprehensive test suite based on external data (CSV, JSON), implemented using Playwright test parametrization and best practices in test automation. Allows scalability and ease in adding new test data.

**Status:** ✅ Fully Implemented  
**Difficulty Level:** ⭐⭐⭐ Medium  
**Technologies:** Playwright, TypeScript, CSV, JSON, Test Parametrization

---

## 🎯 Objective

Creating a complete test suite based on external data, covering:
- ✅ Reading test data from CSV/JSON
- ✅ Parametrized tests with `test.each()` pattern
- ✅ Minimum 2 different data sources (CSV, JSON)
- ✅ Tests for positive and negative scenarios
- ✅ Report showing data used for each test
- ✅ Easy to add new data without modifying code

---

## 📁 Project Structure

```
PROJECT_09_Data_Driven_Testing/
├── README.md                    # This file
├── package.json                 # Node.js dependencies
├── tsconfig.json                # TypeScript configuration
├── playwright.config.ts         # Playwright configuration
├── .gitignore                   # Git ignore file
├── test_data/                   # Test data files
│   ├── login_data.csv          # Login data (CSV)
│   ├── login_data.json         # Login data (JSON)
│   ├── search_queries.csv      # Search data (CSV)
│   └── search_queries.json     # Search data (JSON)
├── pages/                       # Page Object Pattern
│   ├── LoginPage.ts           # Login Page Object
│   └── GoogleSearchPage.ts    # Google Search Page Object
├── utils/                       # Utilities
│   └── DataUtils.ts           # Data management utilities
└── tests/                       # Test suites
    └── test_data_driven.spec.ts
```

---

## 🛠️ Technologies Used

- **Playwright 1.40.0+** - Browser automation with test parametrization
- **TypeScript 5.3.3+** - Type-safe test code
- **Node.js fs module** - File operations for CSV/JSON
- **DataUtils** - Utilities for data management

---

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation Steps

1. **Navigate to the project folder:**
```bash
cd PROJECTS/PROJECT_09_Data_Driven_Testing
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
cd PROJECTS/PROJECT_09_Data_Driven_Testing

# 2. Install dependencies (first time only)
npm install
npx playwright install

# 3. Run all tests (runs for each data set)
npm test

# 4. Run specific test categories
npm run test:csv              # CSV data tests
npm run test:json             # JSON data tests
npm run test:data-driven      # All data-driven tests
```

### Test Commands

**Run all tests:**
```bash
npm test
```

**Run specific categories:**
```bash
npm run test:csv              # Tests with CSV data
npm run test:json             # Tests with JSON data
npm run test:data-driven      # All data-driven tests
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

### 1. **Login Data-Driven** - Login with Data
- ✅ Login with data from CSV (parametrized - 6 sets)
- ✅ Login with data from JSON (parametrized - 6 sets)
- ✅ Login with filtered data

**Number of tests:** 3 test cases (but runs for 12+ data sets = 12+ executions total)

### 2. **Search Data-Driven** - Search with Data
- ✅ Search with data from CSV (parametrized - 5 sets)
- ✅ Search with data from JSON (parametrized - 5 sets)

**Number of tests:** 2 test cases (but runs for 10 data sets = 10 executions total)

### 3. **Data Utils** - Data Utilities
- ✅ Verify CSV reading
- ✅ Verify JSON reading
- ✅ Verify data filtering
- ✅ Verify data validation
- ✅ Verify finding by key
- ✅ Verify conversion for test format

**Number of tests:** 6 test cases

### 4. **Multiple Data Sources** - Multiple Sources
- ✅ Compare CSV vs JSON

**Number of tests:** 1 test case

**Total:** **12 test cases** (but over **30+ executions** due to parametrization)

---

## 🎨 Features

### Test Parametrization
- ✅ **test.each() pattern** - Tests run automatically for each data set
- ✅ **CSV support** - Read test data from CSV files
- ✅ **JSON support** - Read test data from JSON files
- ✅ **Scalable** - Easy to add new data without code changes

### Data Management
- ✅ Read CSV/JSON files
- ✅ Filter test data
- ✅ Validate test data
- ✅ Find data by key
- ✅ Automatic data loading

---

## 📄 Test Data Files

### 1. **login_data.csv** and **login_data.json**
Test data for login testing:
- username, password, expected_result, test_description
- 6 data sets (positive and negative)

### 2. **search_queries.csv** and **search_queries.json**
Test data for search testing:
- query, expected_min_results, description
- 5 test queries

---

## 🌐 Tested Websites

The project uses demo practice sites for testing:
- **SauceDemo** - https://www.saucedemo.com/ (for login testing)
- **Google** - https://www.google.com/ (for search testing)

---

## 📊 Test Coverage

### Data-Driven Login
- ✅ Login with data from CSV (6 sets)
- ✅ Login with data from JSON (6 sets)
- ✅ Login with filtered data
- ✅ Validate expected results

### Data-Driven Search
- ✅ Search with data from CSV (5 sets)
- ✅ Search with data from JSON (5 sets)
- ✅ Validate minimum results

### Data Utils
- ✅ Read CSV/JSON
- ✅ Filter data
- ✅ Validate data
- ✅ Find by key

---

## 🔍 Best Practices

### Adding New Data:

**1. For CSV:**
- Open `test_data/login_data.csv`
- Add a new row: `new_user,new_pass,success,New test case`
- Run tests - automatically executes for new data set

**2. For JSON:**
- Open `test_data/login_data.json`
- Add a new object in array
- Run tests - automatically executes for new data set

**No need to modify test code!** 🎉

### Test Parametrization Pattern:

```typescript
const loginData = loadLoginDataCsv();

for (const testData of loginData) {
  test(`Login: ${testData.username}`, async ({ page }) => {
    // Test runs automatically for each data set
  });
}
```

---

## 🐛 Troubleshooting

### Problem: "CSV/JSON file not found"
**Solution:**
1. Verify files exist in `test_data/` folder
2. Verify path is correct (absolute or relative)
3. Check that DataUtils functions work correctly

### Problem: "KeyError: 'username'"
**Solution:**
1. Verify CSV/JSON has correct columns/fields
2. Verify column/field names match those used in code
3. Use `validateTestData()` for validation

### Problem: "Test runs only once instead of multiple times"
**Solution:**
1. Verify `for` loop is used correctly for parametrization
2. Verify data loading function returns an array
3. Check that test data is loaded correctly

---

## ✅ Deliverables

- ✅ Test data files (CSV, JSON) with multiple data sets
- ✅ Parametrized tests using `test.each()` pattern
- ✅ Documentation about data structure
- ✅ Examples of how to add new data
- ✅ Minimum 2 different data sources (CSV, JSON)
- ✅ Tests for positive and negative scenarios
- ✅ Clear report with data used for each test

---

## 🎓 Learning and Portfolio

This project demonstrates:
- ✅ External data used correctly
- ✅ Reusable and scalable tests
- ✅ Easy to add new data (without code modification)
- ✅ Clear report with data used
- ✅ Test parametrization for scalability
- ✅ Best practices in test automation

**Perfect for portfolio and demonstration of skills in test automation!** 🚀

---

## 📝 Notes

- ✅ Data is external - no need to modify code for new data
- ✅ Playwright shows data used in test reports
- ✅ Filtering and validation available through DataUtils
- ✅ Code is commented for learning ease

---

**Good luck with data-driven testing! 🎉**
