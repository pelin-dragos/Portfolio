# 🚀 Project 11: Iframe Handling & Testing - Complete Suite

## 📋 Project Description

A comprehensive test suite for navigating and testing in iframes, implemented using Playwright, TypeScript, Page Object Pattern, and specialized utilities for managing iframes.

**Status:** ✅ Fully Implemented  
**Difficulty Level:** ⭐⭐⭐ Medium  
**Technologies:** Playwright, TypeScript, Page Object Pattern, Frame Locators

---

## 🎯 Objective

Creating a complete test suite for iframe handling, covering:
- ✅ Switch between iframes (by ID, name, index)
- ✅ Tests for elements in iframe
- ✅ Return to main context (default content, parent frame)
- ✅ Tests for multiple iframes on the same page
- ✅ Nested frames management (frame in frame)
- ✅ Reusable utilities for iframe operations

---

## 📁 Project Structure

```
PROJECT_11_Iframe_Handling/
├── README.md                    # This file
├── package.json                 # Node.js dependencies
├── tsconfig.json                # TypeScript configuration
├── playwright.config.ts         # Playwright configuration
├── .gitignore                   # Git ignore file
├── pages/                       # Page Object Pattern
│   ├── IframePage.ts           # Iframe Page Object
│   └── FramesPage.ts           # Nested Frames Page Object
├── utils/                       # Utilities
│   └── IframeUtils.ts          # Iframe utilities
└── tests/                       # Test suites
    └── test_iframe.spec.ts
```

---

## 🛠️ Technologies Used

- **Playwright 1.40.0+** - Modern browser automation framework
- **TypeScript 5.3.3+** - Type-safe test code
- **Page Object Pattern** - Professional code organization
- **Frame Locators** - Playwright's iframe handling

---

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation Steps

1. **Navigate to the project folder:**
```bash
cd PROJECTS/PROJECT_11_Iframe_Handling
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
cd PROJECTS/PROJECT_11_Iframe_Handling

# 2. Install dependencies (first time only)
npm install
npx playwright install

# 3. Run all tests
npm test

# 4. Run specific test categories
npm run test:iframe              # Iframe tests
npm run test:frame-switching     # Frame switching tests
npm run test:nested-frames      # Nested frames tests
npm run test:frame-interaction   # Frame interaction tests
```

### Test Commands

**Run all tests:**
```bash
npm test
```

**Run specific categories:**
```bash
npm run test:iframe              # Tests for iframes
npm run test:frame-switching      # Tests for frame switching
npm run test:nested-frames        # Tests for nested frames
npm run test:frame-interaction    # Tests for frame interactions
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

### 1. **TestIframeSwitching** - Iframe Switch Testing
- ✅ Switch to iframe and verify context
- ✅ Interact with elements in iframe
- ✅ Switch using IframeUtils
- ✅ Switch by ID, index

**Number of tests:** 5 test cases

### 2. **TestNestedFrames** - Nested Frames Testing
- ✅ Navigate in nested frames
- ✅ Switch to parent frame
- ✅ Navigate using IframeUtils

**Number of tests:** 3 test cases

### 3. **TestIframeInteraction** - Frame Interaction Testing
- ✅ Find element in iframe
- ✅ Click element in iframe
- ✅ Get text from iframe
- ✅ Execute JavaScript in iframe
- ✅ Test IframePage methods

**Number of tests:** 5 test cases

### 4. **TestMultipleIframes** - Multiple Frames Testing
- ✅ Get all iframes
- ✅ Switch between multiple frames

**Number of tests:** 2 test cases

**Total:** **15 test cases**

---

## 🎨 Features

### Test Organization
- ✅ **Tags** - Categorization: `@iframe`, `@frame_switching`, `@nested_frames`, `@frame_interaction`
- ✅ **Page Objects** - Clear code organization
- ✅ **IframeUtils** - Reusable utilities
- ✅ **TypeScript** - Type-safe code

### Iframe Management
- ✅ Switch to iframes (by ID, name, index)
- ✅ Nested frames handling
- ✅ Element interaction in frames
- ✅ Multiple frames management

---

## 📄 Page Objects and Utilities

### 1. **IframePage** (`pages/IframePage.ts`)
Page Object for simple iframes:
- Navigate to iframe page
- Switch to iframe / default content
- Interact with elements in iframe
- Verify context (in iframe or not)

### 2. **FramesPage** (`pages/FramesPage.ts`)
Page Object for nested frames:
- Navigate to nested frames
- Switch to different frames (top, bottom, left, middle, right)
- Get text from each frame

### 3. **IframeUtils** (`utils/IframeUtils.ts`)
Utilities for managing iframes:
- `getFrameLocator()` - Get frame locator by selector
- `getFrameLocatorById()` - Get frame locator by ID
- `getFrameLocatorByName()` - Get frame locator by name
- `getFrameByIndex()` - Get frame locator by index
- `getAllFrames()` - Get all iframes
- `getFrameCount()` - Get frame count
- `findElementInFrame()` - Find element in frame
- `clickElementInFrame()` - Click element in frame
- `getTextFromFrame()` - Get text from frame
- `getNestedFrameLocator()` - Get nested frame locator
- `isFrameAccessible()` - Check if frame is accessible
- `executeScriptInFrame()` - Execute JavaScript in frame

---

## 🌐 Tested Websites

The project uses demo practice sites for testing:
- **The Internet (Herokuapp)** - https://the-internet.herokuapp.com/iframe (for simple iframe)
- **The Internet (Herokuapp)** - https://the-internet.herokuapp.com/nested_frames (for nested frames)

---

## 📊 Test Coverage

### Iframe Switching
- ✅ Switch to iframe (by ID, name, index)
- ✅ Verify context (in iframe or not)
- ✅ Return to default content
- ✅ Switch using IframeUtils

### Nested Frames
- ✅ Navigate in nested frames
- ✅ Switch between nested frames
- ✅ Get text from each frame
- ✅ Switch to parent frame

### Frame Interaction
- ✅ Find elements in iframe
- ✅ Click elements in iframe
- ✅ Get text from iframe
- ✅ Execute JavaScript in iframe

### Multiple Frames
- ✅ Get all iframes
- ✅ Switch between multiple frames

---

## 🔍 Best Practices

### 1. Use Frame Locators in Playwright
```typescript
const frame = page.frameLocator('#iframe-id');
const element = frame.locator('#element-id');
```

### 2. Always wait for frame to be available
```typescript
const frame = page.frameLocator('#iframe-id');
await frame.locator('body').waitFor({ state: 'visible' });
```

### 3. Use IframeUtils for reusability
```typescript
const text = await IframeUtils.getTextFromFrame(page, '#iframe-id', '#element-id');
```

### 4. Handle nested frames properly
```typescript
const topFrame = page.frameLocator('frame[name="frame-top"]');
const leftFrame = topFrame.frameLocator('frame[name="frame-left"]');
```

---

## 🐛 Troubleshooting

### Problem: "Element not found in iframe"
**Solution:**
1. Verify you're using frame locator:
```typescript
const frame = page.frameLocator('#iframe-id');
const element = frame.locator('#element-id');
```

2. Wait for frame to be available:
```typescript
await frame.locator('body').waitFor({ state: 'visible' });
```

### Problem: "Cannot access iframe"
**Solution:**
1. Verify iframe exists and is loaded:
```typescript
const isAccessible = await IframeUtils.isFrameAccessible(page, '#iframe-id');
```

2. Wait for iframe to be attached:
```typescript
await page.locator('#iframe-id').waitFor({ state: 'attached' });
```

### Problem: "Nested frame not accessible"
**Solution:**
1. Use nested frame locators:
```typescript
const parentFrame = page.frameLocator('frame[name="parent"]');
const childFrame = parentFrame.frameLocator('frame[name="child"]');
```

---

## ✅ Deliverables

- ✅ Tests for switching between iframes (by ID, name, index)
- ✅ Tests for elements in iframe
- ✅ Tests for return to main context
- ✅ Tests for multiple iframes on the same page
- ✅ Tests for nested frames (frame in frame)
- ✅ Helpers for iframe switching (IframeUtils)
- ✅ Documentation about iframe handling strategies
- ✅ Minimum 3 scenarios with iframe (simple, nested, multiple)

---

## 🎓 Learning and Portfolio

This project demonstrates:
- ✅ Switching between iframes using Playwright frame locators
- ✅ Nested frames management
- ✅ Return to main context
- ✅ Reusable utilities for iframe operations
- ✅ Page Object Pattern for iframe handling
- ✅ Best practices in test automation

**Perfect for portfolio and demonstration of skills in test automation!** 🚀

---

## 📝 Notes

- ✅ Playwright uses `frameLocator()` instead of `switch_to.frame()`
- ✅ Frame locators are lazy - they don't switch context immediately
- ✅ For nested frames, use chained frame locators
- ✅ IframeUtils provides reusable functions for all operations
- ✅ Code is commented for learning ease

---

**Good luck with iframe testing! 🎉**
