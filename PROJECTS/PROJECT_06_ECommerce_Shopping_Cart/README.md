# 🚀 Project 6: E-Commerce Shopping Cart Flow - Complete Suite

## 📋 Project Description

A comprehensive test suite for the complete e-commerce flow, implemented using Playwright and TypeScript with best practices in test automation. Covers complete flow: Login → Browse → Add to Cart → Checkout → Complete.

**Status:** ✅ Fully Implemented  
**Difficulty Level:** ⭐⭐⭐ Medium  
**Technologies:** Playwright, TypeScript, Page Object Pattern

---

## 🎯 Objective

Creating a complete test suite for the e-commerce flow, covering:
- ✅ Login and navigate to products
- ✅ Add products to cart (single and multiple)
- ✅ Verify cart content
- ✅ Checkout process (form, overview, confirmation)
- ✅ Correct total calculation
- ✅ Remove products from cart
- ✅ Validate checkout form

---

## 📁 Project Structure

```
PROJECT_06_ECommerce_Shopping_Cart/
├── README.md                    # This file
├── package.json                 # Node.js dependencies
├── tsconfig.json                # TypeScript configuration
├── playwright.config.ts         # Playwright configuration
├── .gitignore                   # Git ignore file
├── pages/                       # Page Object Pattern
│   ├── LoginPage.ts            # Login Page Object
│   ├── ProductsPage.ts         # Products Page Object
│   ├── CartPage.ts             # Cart Page Object
│   └── CheckoutPage.ts         # Checkout Pages (Info, Overview, Complete)
└── tests/                       # Test suites
    └── test_shopping_cart_flow.spec.ts
```

---

## 🛠️ Technologies Used

- **Playwright 1.40.0+** - Browser automation
- **TypeScript 5.3.3+** - Type-safe test code
- **Page Object Pattern** - Professional code organization (4+ Page Objects)

---

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation Steps

1. **Navigate to the project folder:**
```bash
cd PROJECTS/PROJECT_06_ECommerce_Shopping_Cart
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
cd PROJECTS/PROJECT_06_ECommerce_Shopping_Cart

# 2. Install dependencies (first time only)
npm install
npx playwright install

# 3. Run all tests
npm test

# 4. Run specific test categories
npm run test:flow      # Complete flow tests
npm run test:cart      # Cart management tests
npm run test:checkout  # Checkout process tests
npm run test:browse    # Browse and navigation tests
```

### Test Commands

**Run all tests:**
```bash
npm test
```

**Run specific categories:**
```bash
npm run test:flow      # Complete purchase flow
npm run test:cart      # Cart management
npm run test:checkout  # Checkout process
npm run test:browse    # Browsing and navigation
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

### 1. **Complete Purchase Flow** - End-to-End Flow
- ✅ Complete flow: Login → Browse → Add to Cart → Checkout → Complete
- ✅ Verify total price
- ✅ Verify correct calculation (subtotal + tax = total)
- ✅ Verify success message

**Number of tests:** 1 test case

### 2. **Cart Management** - Cart Operations
- ✅ Add single product
- ✅ Add multiple products
- ✅ Remove product from cart
- ✅ Calculate cart total price

**Number of tests:** 4 test cases

### 3. **Checkout Process** - Checkout Flow
- ✅ Validate checkout form (required fields)
- ✅ Complete checkout form
- ✅ Correct calculation in checkout overview
- ✅ Complete order finalization

**Number of tests:** 4 test cases

### 4. **Browse and Navigation** - Browsing
- ✅ Login and navigate to products
- ✅ View product information
- ✅ Continue shopping from cart

**Number of tests:** 3 test cases

**Total:** **12 comprehensive test cases**

---

## 🎨 Features

### Page Object Pattern
- ✅ **4+ Page Objects** - Login, Products, Cart, Checkout (Info, Overview, Complete)
- ✅ **Reusable code** - Page objects can be extended easily
- ✅ **Type-safe** - Full TypeScript support
- ✅ **Professional organization** - Clean code structure

---

## 🌐 Tested Websites

The project uses demo practice sites for testing:
- **SauceDemo** - https://www.saucedemo.com/ (main)

**Credentials:**
- Username: `standard_user`
- Password: `secret_sauce`

---

## 📊 Test Coverage

### Complete Flow
- ✅ Login → Browse → Add to Cart → Checkout → Complete
- ✅ Verify total price calculation
- ✅ Verify correct calculation (subtotal + tax = total)

### Cart Management
- ✅ Add single product
- ✅ Add multiple products
- ✅ Remove product from cart
- ✅ Calculate cart total price
- ✅ Verify cart content

### Checkout Process
- ✅ Validate form (required fields)
- ✅ Complete form with valid data
- ✅ Correct calculation in overview
- ✅ Complete order finalization

### Browsing and Navigation
- ✅ Login and navigation
- ✅ View products
- ✅ Continue shopping

---

## 🐛 Troubleshooting

### Problem: "Products page not loaded"
**Solution:**
1. Check internet connection
2. Verify SauceDemo site is accessible
3. Verify login succeeded (check URL)

### Problem: "Element not found" or "Timeout"
**Solution:**
1. Verify locators are correct
2. Add delays if needed
3. Check that page loaded completely

### Problem: "Total calculation incorrect"
**Solution:**
1. Verify all products are added correctly to cart
2. Verify prices are extracted correctly
3. Verify tax is calculated correctly

---

## ✅ Deliverables

- ✅ Complete test suite for e-commerce flow
- ✅ Minimum 4 page objects (Login, Products, Cart, Checkout)
- ✅ Tests for positive and negative scenarios
- ✅ Stable tests with proper waits
- ✅ Reusable and organized code

---

## 🎓 Learning and Portfolio

This project demonstrates:
- ✅ Page Object Pattern implementation
- ✅ Complete end-to-end flow
- ✅ Dynamic element handling
- ✅ Professional code organization
- ✅ Stable and reliable tests
- ✅ Best practices in test automation

**Perfect for portfolio and demonstration of skills in test automation!** 🚀

---

## 📝 Notes

- ✅ All tests use proper waits for stability
- ✅ Page Objects are reusable and easy to extend
- ✅ Code is commented for learning ease
- ✅ Tests are organized logically by categories

---

**Good luck with e-commerce flow testing! 🎉**
