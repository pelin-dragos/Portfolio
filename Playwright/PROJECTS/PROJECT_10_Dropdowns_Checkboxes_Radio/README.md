# 🚀 Project 10: Dropdowns, Checkboxes, Radio Buttons Testing - Complete Suite

## 📋 Project Description

A comprehensive test suite for all types of input controls (dropdowns, checkboxes, radio buttons), implemented using Playwright, TypeScript, Page Object Pattern, and specialized utilities for managing form elements.

**Status:** ✅ Fully Implemented  
**Difficulty Level:** ⭐⭐⭐ Medium  
**Technologies:** Playwright, TypeScript, Page Object Pattern, Form Elements Utilities

---

## 🎯 Objective

Creating a complete test suite for form elements, covering:
- ✅ Tests for dropdowns (single select, selection by value/text/index)
- ✅ Tests for checkboxes (select/deselect, multiple selections)
- ✅ Tests for radio buttons (selection, groups, mutual exclusivity)
- ✅ State verification (checked/unchecked, enabled/disabled)
- ✅ Tests for combinations of controls
- ✅ Reusable utilities for managing form elements

---

## 📁 Project Structure

```
PROJECT_10_Dropdowns_Checkboxes_Radio/
├── README.md                    # This file
├── package.json                 # Node.js dependencies
├── tsconfig.json                # TypeScript configuration
├── playwright.config.ts         # Playwright configuration
├── .gitignore                   # Git ignore file
├── pages/                       # Page Object Pattern
│   ├── DropdownPage.ts         # Dropdown Page Object
│   ├── CheckboxPage.ts         # Checkbox Page Object
│   └── RadioPage.ts            # Radio Button Page Object
├── utils/                       # Utilities
│   └── FormElementsUtils.ts  # Form elements utilities
└── tests/                       # Test suites
    └── test_form_elements.spec.ts
```

---

## 🛠️ Technologies Used

- **Playwright 1.40.0+** - Modern browser automation framework
- **TypeScript 5.3.3+** - Type-safe test code
- **Page Object Pattern** - Professional code organization
- **FormElementsUtils** - Reusable utilities for form elements

---

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation Steps

1. **Navigate to the project folder:**
```bash
cd PROJECTS/PROJECT_10_Dropdowns_Checkboxes_Radio
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
cd PROJECTS/PROJECT_10_Dropdowns_Checkboxes_Radio

# 2. Install dependencies (first time only)
npm install
npx playwright install

# 3. Run all tests
npm test

# 4. Run specific test categories
npm run test:dropdown        # Dropdown tests
npm run test:checkbox        # Checkbox tests
npm run test:radio           # Radio button tests
npm run test:form-elements   # All form elements tests
```

### Test Commands

**Run all tests:**
```bash
npm test
```

**Run specific categories:**
```bash
npm run test:dropdown        # Tests for dropdowns
npm run test:checkbox        # Tests for checkboxes
npm run test:radio           # Tests for radio buttons
npm run test:form-elements   # All form elements tests
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

### 1. **TestDropdowns** - Dropdown Testing
- ✅ Select by value
- ✅ Select by visible text
- ✅ Select by index
- ✅ Get all options
- ✅ Tests with FormElementsUtils

**Number of tests:** 6 test cases

### 2. **TestCheckboxes** - Checkbox Testing
- ✅ Check/uncheck checkboxes
- ✅ Check all checkboxes
- ✅ Uncheck all checkboxes
- ✅ State verification (checked/unchecked)
- ✅ Tests with FormElementsUtils

**Number of tests:** 5 test cases

### 3. **TestRadioButtons** - Radio Button Testing
- ✅ Select 'Yes'
- ✅ Select 'Impressive'
- ✅ Mutual exclusivity (only one selected)
- ✅ Verify disabled radio
- ✅ Get selected radio
- ✅ Tests with FormElementsUtils

**Number of tests:** 6 test cases

### 4. **TestCombinedFormElements** - Combined Testing
- ✅ Interact with all element types in a single test

**Number of tests:** 1 test case

**Total:** **18 test cases**

---

## 🎨 Features

### Test Organization
- ✅ **Tags** - Categorization: `@dropdown`, `@checkbox`, `@radio`, `@form_elements`
- ✅ **Page Objects** - Clear code organization
- ✅ **FormElementsUtils** - Reusable utilities
- ✅ **TypeScript** - Type-safe code

### Form Elements Management
- ✅ Dropdown selection (by value/text/index)
- ✅ Checkbox check/uncheck
- ✅ Radio button selection
- ✅ State verification
- ✅ Multiple selections

---

## 📄 Page Objects and Utilities

### 1. **DropdownPage** (`pages/DropdownPage.ts`)
Page Object for dropdowns:
- Select by value/text/index
- Get selected option
- Get all options

### 2. **CheckboxPage** (`pages/CheckboxPage.ts`)
Page Object for checkboxes:
- Check/uncheck checkboxes
- Check/uncheck all
- State verification

### 3. **RadioPage** (`pages/RadioPage.ts`)
Page Object for radio buttons:
- Select radio buttons
- Verify mutual exclusivity
- Verify disabled radio

### 4. **FormElementsUtils** (`utils/FormElementsUtils.ts`)
Utilities for managing form elements:
- `selectDropdownOption()` - Select dropdown option
- `getSelectedDropdownOption()` - Get selected option
- `getAllDropdownOptions()` - Get all options
- `clickCheckbox()` - Click checkbox (with state check)
- `isCheckboxChecked()` - Check if checkbox is checked
- `clickRadioButton()` - Click radio button
- `isRadioSelected()` - Check if radio is selected
- `getAllRadioButtonsInGroup()` - Get all radio buttons in group
- `getSelectedRadioInGroup()` - Get selected radio
- `selectRadioByValue()` - Select radio by value
- `getAllCheckboxes()` - Get all checkboxes
- `selectMultipleCheckboxes()` - Select multiple checkboxes

---

## 🌐 Tested Websites

The project uses demo practice sites for testing:
- **The Internet (Herokuapp)** - https://the-internet.herokuapp.com/dropdown (for dropdowns)
- **The Internet (Herokuapp)** - https://the-internet.herokuapp.com/checkboxes (for checkboxes)
- **DemoQA** - https://demoqa.com/radio-button (for radio buttons)

---

## 📊 Test Coverage

### Dropdown Testing
- ✅ Select by value
- ✅ Select by visible text
- ✅ Select by index
- ✅ Get selected option
- ✅ Get all options
- ✅ Tests with FormElementsUtils

### Checkbox Testing
- ✅ Check/uncheck individual
- ✅ Check/uncheck all
- ✅ Verify initial state
- ✅ Verify state after toggle
- ✅ Tests with FormElementsUtils

### Radio Button Testing
- ✅ Select 'Yes' and 'Impressive'
- ✅ Mutual exclusivity (only one selected)
- ✅ Verify disabled radio
- ✅ Get selected radio
- ✅ Tests with FormElementsUtils

### Combined Testing
- ✅ Interact with all element types in a single test

---

## 🔍 Best Practices

### 1. Use Page Object Pattern
```typescript
const dropdownPage = new DropdownPage(page);
await dropdownPage.navigateTo();
await dropdownPage.selectOptionByValue('1');
```

### 2. Check state before click
```typescript
if (!(await checkboxPage.isCheckbox1Checked())) {
  await checkboxPage.checkCheckbox1();
}
```

### 3. Use waits for dynamic elements
```typescript
await expect(dropdown).toBeVisible();
await dropdown.selectOption({ value: '1' });
```

### 4. Use FormElementsUtils for reusability
```typescript
await FormElementsUtils.selectDropdownOption(page, dropdownLocator, '1', true);
```

---

## 🐛 Troubleshooting

### Problem: "Dropdown doesn't select"
**Solution:**
1. Verify element is visible:
```typescript
await expect(dropdown).toBeVisible();
```

2. Use correct select method:
```typescript
await dropdown.selectOption({ value: '1' });
```

### Problem: "Checkbox doesn't check"
**Solution:**
1. Check state before click:
```typescript
if (!(await checkbox.isChecked())) {
  await checkbox.click();
}
```

2. Use JavaScript click if checkbox is hidden:
```typescript
await page.evaluate((element) => {
  (element as HTMLElement).click();
}, await checkbox.elementHandle());
```

### Problem: "Radio button doesn't select"
**Solution:**
1. Radio buttons can be hidden - click on label:
```typescript
const label = page.locator("label[for='radioId']");
await label.click();
```

2. Or use JavaScript click:
```typescript
await page.evaluate((element) => {
  (element as HTMLElement).click();
}, await radio.elementHandle());
```

---

## ✅ Deliverables

- ✅ Test suite for dropdowns (single select, multiple methods)
- ✅ Test suite for checkboxes (select/deselect, multiple)
- ✅ Test suite for radio buttons (selection, groups, mutual exclusivity)
- ✅ State verification (checked/unchecked, enabled/disabled)
- ✅ Tests for combinations of controls
- ✅ Reusable utilities (FormElementsUtils)
- ✅ Complete documentation

---

## 🎓 Learning and Portfolio

This project demonstrates:
- ✅ Dropdown management with Playwright select methods
- ✅ Interactions with checkboxes and radio buttons
- ✅ State verification (isChecked, isDisabled)
- ✅ Page Object Pattern for organization
- ✅ Reusable utilities for form elements
- ✅ Best practices in test automation

**Perfect for portfolio and demonstration of skills in test automation!** 🚀

---

## 📝 Notes

- ✅ Uses Playwright's built-in select methods for dropdowns
- ✅ State verification available through isChecked() and isDisabled()
- ✅ Filtering and utilities available through FormElementsUtils
- ✅ Code is commented for learning ease

---

**Good luck with form elements testing! 🎉**
