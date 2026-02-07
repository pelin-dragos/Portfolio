# 🚀 Project 12: Alert & Popup Handling - Complete Suite

## 📋 Project Description

A comprehensive test suite for managing JavaScript alerts, confirms, and prompts, implemented using Playwright, TypeScript, Page Object Pattern, and specialized utilities for alert handling.

**Status:** ✅ Fully Implemented  
**Difficulty Level:** ⭐⭐⭐ Medium  
**Technologies:** Playwright, TypeScript, Page Object Pattern, Dialog Listeners

---

## 🎯 Objective

Creating a complete test suite for alert and popup handling, covering:
- ✅ Tests for JavaScript alerts (simple alerts)
- ✅ Tests for confirm dialogs (accept/dismiss)
- ✅ Tests for prompt dialogs (input text, accept/cancel)
- ✅ Browser popup management (non-JS) - through configurations
- ✅ Message verification in alerts
- ✅ Reusable utilities for alert operations

---

## 📁 Project Structure

```
PROJECT_12_Alert_Popup_Handling/
├── README.md                    # This file
├── package.json                 # Node.js dependencies
├── tsconfig.json                # TypeScript configuration
├── playwright.config.ts         # Playwright configuration
├── .gitignore                   # Git ignore file
├── pages/                       # Page Object Pattern
│   └── AlertPage.ts            # Alert Page Object
├── utils/                       # Utilities
│   └── AlertUtils.ts           # Alert utilities
└── tests/                       # Test suites
    └── test_alert.spec.ts
```

---

## 🛠️ Technologies Used

- **Playwright 1.40.0+** - Modern browser automation framework
- **TypeScript 5.3.3+** - Type-safe test code
- **Page Object Pattern** - Professional code organization
- **Dialog Listeners** - Playwright's alert handling mechanism

---

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation Steps

1. **Navigate to the project folder:**
```bash
cd PROJECTS/PROJECT_12_Alert_Popup_Handling
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
cd PROJECTS/PROJECT_12_Alert_Popup_Handling

# 2. Install dependencies (first time only)
npm install
npx playwright install

# 3. Run all tests
npm test

# 4. Run specific test categories
npm run test:alert              # Alert tests
npm run test:confirm            # Confirm tests
npm run test:prompt             # Prompt tests
npm run test:alert-handling     # Alert handling tests
```

### Test Commands

**Run all tests:**
```bash
npm test
```

**Run specific categories:**
```bash
npm run test:alert              # Tests for alerts
npm run test:confirm            # Tests for confirms
npm run test:prompt             # Tests for prompts
npm run test:alert-handling     # Tests for alert handling
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

### 1. **TestJavaScriptAlerts** - JavaScript Alert Testing
- ✅ Accept alert and verify message
- ✅ Get alert text
- ✅ Handle using AlertUtils

**Number of tests:** 3 test cases

### 2. **TestJavaScriptConfirms** - JavaScript Confirm Testing
- ✅ Accept confirm and verify message
- ✅ Dismiss confirm and verify message
- ✅ Handle using AlertUtils
- ✅ Safe handling (handle_alert_safely)

**Number of tests:** 4 test cases

### 3. **TestJavaScriptPrompts** - JavaScript Prompt Testing
- ✅ Send text to prompt
- ✅ Send empty text
- ✅ Cancel prompt (without text)
- ✅ Handle using AlertUtils

**Number of tests:** 4 test cases

### 4. **TestAlertUtils** - Alert Utils Testing
- ✅ Wait for alert
- ✅ Check if alert exists
- ✅ Wait and accept alert
- ✅ Wait and dismiss alert
- ✅ Execute action with alert

**Number of tests:** 5 test cases

### 5. **TestMultipleAlerts** - Multiple Alerts Testing
- ✅ Handle multiple consecutive alerts

**Number of tests:** 1 test case

**Total:** **17 test cases**

---

## 🎨 Features

### Test Organization
- ✅ **Tags** - Categorization: `@alert`, `@confirm`, `@prompt`, `@alert_handling`
- ✅ **Page Objects** - Clear code organization
- ✅ **AlertUtils** - Reusable utilities
- ✅ **TypeScript** - Type-safe code

### Alert Management
- ✅ JavaScript alerts (accept)
- ✅ JavaScript confirms (accept/dismiss)
- ✅ JavaScript prompts (send text, accept/cancel)
- ✅ Multiple alerts handling

---

## 📄 Page Objects and Utilities

### 1. **AlertPage** (`pages/AlertPage.ts`)
Page Object for alerts:
- Navigate to alerts page
- Click buttons that trigger alerts
- Handle alerts (accept, dismiss)
- Get result messages
- Handle prompts (send text)

### 2. **AlertUtils** (`utils/AlertUtils.ts`)
Utilities for managing alerts:
- `waitForAlert()` - Wait for alert to appear
- `acceptAlert()` - Accept an alert (click OK)
- `dismissAlert()` - Dismiss an alert (click Cancel)
- `getAlertText()` - Get alert text
- `sendTextToPrompt()` - Send text to prompt
- `isAlertPresent()` - Check if alert exists
- `handleAlertSafely()` - Handle alert safely
- `waitForAndAcceptAlert()` - Wait and accept
- `waitForAndDismissAlert()` - Wait and dismiss
- `executeActionWithAlert()` - Execute action with alert

---

## 🌐 Tested Websites

The project uses demo practice sites for testing:
- **The Internet (Herokuapp)** - https://the-internet.herokuapp.com/javascript_alerts (for all alert types)

---

## 📊 Test Coverage

### JavaScript Alerts
- ✅ Accept alert and verify message
- ✅ Get alert text
- ✅ Handle using AlertUtils

### JavaScript Confirms
- ✅ Accept confirm and verify message
- ✅ Dismiss confirm and verify message
- ✅ Safe handling

### JavaScript Prompts
- ✅ Send text to prompt
- ✅ Send empty text
- ✅ Cancel prompt (without text)

### Alert Utils
- ✅ Wait for alert
- ✅ Check if alert exists
- ✅ Execute action with alert

### Multiple Alerts
- ✅ Handle multiple consecutive alerts

---

## 🔍 Best Practices

### 1. Set up dialog listener before triggering alert
```typescript
const dialogPromise = new Promise<string>((resolve) => {
  page.on('dialog', (dialog) => {
    resolve(dialog.message());
    dialog.accept();
  });
});

// Then trigger the alert
await button.click();
const text = await dialogPromise;
```

### 2. Use AlertUtils for reusability
```typescript
const text = await AlertUtils.waitForAndAcceptAlert(page);
```

### 3. Always wait for result after handling alert
```typescript
await dialog.accept();
await page.waitForTimeout(500);
const result = await page.locator('#result').textContent();
```

### 4. Handle prompts with text
```typescript
page.on('dialog', (dialog) => {
  dialog.accept('Text to send');
});
```

---

## 🐛 Troubleshooting

### Problem: "Dialog not handled"
**Solution:**
1. Set up dialog listener BEFORE clicking the button:
```typescript
const dialogPromise = new Promise<void>((resolve) => {
  page.on('dialog', (dialog) => {
    dialog.accept();
    resolve();
  });
});

await button.click();
await dialogPromise;
```

### Problem: "Alert doesn't appear"
**Solution:**
1. Make sure listener is set up before action:
```typescript
// Set listener first
page.on('dialog', (dialog) => dialog.accept());

// Then click
await button.click();
```

### Problem: "Prompt doesn't receive text"
**Solution:**
1. Use `dialog.accept(text)` instead of `dialog.accept()`:
```typescript
page.on('dialog', (dialog) => {
  dialog.accept('Text to send');
});
```

---

## ✅ Deliverables

- ✅ Tests for JavaScript alerts (simple alerts)
- ✅ Tests for confirm dialogs (accept/dismiss)
- ✅ Tests for prompt dialogs (input text, accept/cancel)
- ✅ Helpers for alert handling (AlertUtils)
- ✅ Documentation about alert types
- ✅ Stable tests (don't hang on alerts)
- ✅ Cleanup after alerts (proper handling)

---

## 🎓 Learning and Portfolio

This project demonstrates:
- ✅ JavaScript alert management (accept, dismiss)
- ✅ Confirm and prompt handling
- ✅ Dialog listeners in Playwright
- ✅ Reusable utilities for alert operations
- ✅ Page Object Pattern for alert handling
- ✅ Best practices in test automation

**Perfect for portfolio and demonstration of skills in test automation!** 🚀

---

## 📝 Notes

- ✅ Playwright uses `page.on('dialog', ...)` instead of `switch_to.alert`
- ✅ Dialog listeners must be set up BEFORE triggering the alert
- ✅ Use `dialog.accept(text)` for prompts with text
- ✅ AlertUtils provides reusable functions for all operations
- ✅ Code is commented for learning ease

---

**Good luck with alert and popup testing! 🎉**
