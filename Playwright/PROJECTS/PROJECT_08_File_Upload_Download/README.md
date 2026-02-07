# 🚀 Project 8: File Upload/Download Testing - Complete Suite

## 📋 Project Description

A comprehensive test suite for automating file upload and download, implemented using best practices in test automation. Covers upload, download, and automatic file validation.

**Status:** ✅ Fully Implemented  
**Difficulty Level:** ⭐⭐⭐ Medium  
**Technologies:** Playwright, TypeScript, File Operations

---

## 🎯 Objective

Creating a complete test suite for file upload and download, covering:
- ✅ Test file upload (different types: TXT, PDF, JPG)
- ✅ Verify file was uploaded correctly
- ✅ Test file download
- ✅ Verify downloaded file is correct
- ✅ Validate file size, type, content
- ✅ Manage temporary folder for test files
- ✅ Automatic cleanup after tests

---

## 📁 Project Structure

```
PROJECT_08_File_Upload_Download/
├── README.md                    # This file
├── package.json                 # Node.js dependencies
├── tsconfig.json                # TypeScript configuration
├── playwright.config.ts         # Playwright configuration
├── .gitignore                   # Git ignore file
├── pages/                       # Page Object Pattern
│   ├── FileUploadPage.ts       # File Upload Page Object
│   └── FileDownloadPage.ts     # File Download Page Object
├── utils/                       # Utilities
│   └── FileUtils.ts            # File management utilities
└── tests/                       # Test suites
    └── test_file_upload_download.spec.ts
```

---

## 🛠️ Technologies Used

- **Playwright 1.40.0+** - Browser automation with download support
- **TypeScript 5.3.3+** - Type-safe test code
- **Node.js fs module** - File operations
- **FileUtils** - Utilities for file management

---

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation Steps

1. **Navigate to the project folder:**
```bash
cd PROJECTS/PROJECT_08_File_Upload_Download
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
cd PROJECTS/PROJECT_08_File_Upload_Download

# 2. Install dependencies (first time only)
npm install
npx playwright install

# 3. Run all tests
npm test

# 4. Run specific test categories
npm run test:upload            # Upload tests
npm run test:download          # Download tests
npm run test:file-management   # File management tests
```

### Test Commands

**Run all tests:**
```bash
npm test
```

**Run specific categories:**
```bash
npm run test:upload            # File upload tests
npm run test:download          # File download tests
npm run test:file-management   # File management tests
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

### 1. **File Upload** - Upload Tests
- ✅ Upload text file (.txt)
- ✅ Upload large file
- ✅ Upload multiple files sequentially
- ✅ Validate file name
- ✅ Validate success message

**Number of tests:** 5 test cases

### 2. **File Download** - Download Tests
- ✅ Download file
- ✅ Download multiple files
- ✅ Validate downloaded file

**Number of tests:** 3 test cases

### 3. **File Management** - File Management Tests
- ✅ FileUtils - create and delete
- ✅ FileUtils - verify file size

**Number of tests:** 2 test cases

**Total:** **10 comprehensive test cases**

---

## 🎨 Features

### File Upload
- ✅ Upload different file types
- ✅ Upload large files
- ✅ Upload multiple files
- ✅ Automatic file validation

### File Download
- ✅ Download single files
- ✅ Download multiple files
- ✅ Automatic download verification
- ✅ File size validation

### File Management
- ✅ Create test files
- ✅ Delete test files
- ✅ Verify file size
- ✅ Verify file content
- ✅ Automatic cleanup

---

## 🌐 Tested Websites

The project uses demo practice sites for testing:
- **The Internet** - https://the-internet.herokuapp.com/
  - File Upload
  - File Download

---

## 📊 Test Coverage

### File Upload
- ✅ Upload text file (.txt)
- ✅ Upload large file
- ✅ Upload multiple files
- ✅ Validate file name
- ✅ Validate success message

### File Download
- ✅ Download file
- ✅ Download multiple files
- ✅ Validate downloaded file
- ✅ Verify file size

### File Management
- ✅ Create and delete files
- ✅ Verify file size
- ✅ Verify file content

---

## 🔍 Best Practices

### Playwright Download Handling

Playwright handles downloads differently than Selenium:

```typescript
// Wait for download event
const downloadPromise = page.waitForEvent('download');
await link.click();
const download = await downloadPromise;

// Save file
await download.saveAs(filePath);
```

### File Utilities

```typescript
import { FileUtils } from '../utils/FileUtils';

// Create test file
const filePath = FileUtils.createTestFile(
  directory,
  'test.txt',
  'Test content'
);

// Wait for download
const isDownloaded = await FileUtils.waitForFileDownload(
  filePath,
  30000
);
```

---

## 🐛 Troubleshooting

### Problem: "Download not working"
**Solution:**
1. Verify Playwright's download event handling is used correctly
2. Check that download directory exists and has write permissions
3. Verify `waitForFileDownload()` is used correctly

### Problem: "Upload not working"
**Solution:**
1. Verify file path is correct (absolute, not relative)
2. Check that file exists before upload
3. Verify file input is found correctly

### Problem: "File not downloaded"
**Solution:**
1. Wait sufficient time for download (use `waitForFileDownload()`)
2. Check that no temporary files (.crdownload) exist
3. Verify download directory is correctly configured

---

## ✅ Deliverables

- ✅ Tests for upload and download
- ✅ Automatic file verification (size, content)
- ✅ Temporary folder management for test files
- ✅ Automatic cleanup after tests
- ✅ FileUtils for file management

---

## 🎓 Learning and Portfolio

This project demonstrates:
- ✅ Upload and download work correctly
- ✅ Automatic file verification
- ✅ Proper cleanup
- ✅ File management in test automation
- ✅ Playwright download handling
- ✅ Best practices in test automation

**Perfect for portfolio and demonstration of skills in test automation!** 🚀

---

## 📝 Notes

- ✅ `test_files/` and `downloads/` folders are created automatically
- ✅ Test files are automatically deleted after tests (cleanup)
- ✅ Downloads remain in `downloads/` folder for manual verification
- ✅ Code is commented for learning ease

---

**Good luck with file upload and download testing! 🎉**
