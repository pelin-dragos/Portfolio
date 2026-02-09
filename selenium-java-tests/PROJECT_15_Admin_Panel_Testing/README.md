# Project 15: Admin Panel Testing

## 🎯 Objective

Selenium (Java) tests for an **admin panel** (e.g. OrangeHRM): admin login, **Users CRUD** (Create, Read, Update, Delete), search, reset, pagination, and bulk operations. All scenarios are aligned with **[TEST_CASES.md](TEST_CASES.md)**. Base URL and admin credentials come only from **environment variables** (no secrets in code).

## 📋 Requirements

- ✅ Admin login with valid/invalid credentials
- ✅ Users CRUD: create, read, update, delete
- ✅ Search and filter users
- ✅ Reset filters
- ✅ Pagination
- ✅ Bulk operations (multi-select, bulk actions)
- ✅ Skip tests when admin credentials not configured

## 🛠️ Technologies

- **Selenium WebDriver** — Browser automation
- **Java 17** — Language
- **Maven** — Build (Maven Wrapper included)
- **JUnit 5** — Test framework
- **WebDriverManager** — Driver management
- **Firefox** — Default browser

## 📁 Project Structure

```
PROJECT_15_Admin_Panel_Testing/
├── pom.xml                          # Maven dependencies
├── mvnw.cmd                         # Maven Wrapper (Windows)
├── README.md                        # This file
├── TEST_CASES.md                    # Test case specifications
├── TEST_RUN_CONFORMITY.md           # TC-to-method mapping and run status
│
└── src/test/
    ├── java/.../project15/
    │   ├── base/
    │   │   └── BaseTest.java        # WebDriver lifecycle, Firefox
    │   ├── config/
    │   │   └── TestConfig.java      # Base URL, admin user/pass from env; isLoginConfigured()
    │   ├── pages/
    │   │   ├── LoginPage.java       # Admin login
    │   │   └── UsersManagementPage.java # Admin → User Management → Users (CRUD, search, pagination)
    │   ├── util/
    │   │   └── TestDataHelper.java # Unique usernames for test independence
    │   └── tests/
    │       ├── LoginTest.java           # Admin login
    │       ├── CreateUserTest.java      # Create user
    │       ├── ReadUsersTest.java       # List/read users
    │       ├── UpdateUserTest.java      # Edit user
    │       ├── DeleteUserTest.java      # Delete user
    │       ├── SearchFilterTest.java    # Search and filter
    │       ├── PaginationTest.java      # Pagination
    │       ├── BulkOperationsTest.java   # Bulk select and actions
    │       └── CompleteCrudFlowTest.java # E2E CRUD flow
    │
    └── resources/
        └── .env.example             # ADMIN_BASE_URL, ADMIN_USERNAME, ADMIN_PASSWORD
```

## ✨ Features

### 1. Admin Login

- Valid admin credentials → dashboard / user management
- Invalid credentials → error
- When credentials not set, login-dependent tests are **skipped**

### 2. Users CRUD

- **Create** — Add new user with required fields
- **Read** — List users, view user details
- **Update** — Edit user and save
- **Delete** — Delete user with confirmation

### 3. Search & Filter

- Search by username or other criteria
- Reset filters

### 4. Pagination

- Navigate pages; verify table content and pager state

### 5. Bulk Operations

- Multi-select users
- Bulk delete or other bulk actions

### 6. Test Data

- **TestDataHelper** — Generates unique usernames so tests do not depend on each other

### 7. Configuration

- **ADMIN_BASE_URL** (default: OrangeHRM demo)
- **ADMIN_USERNAME**, **ADMIN_PASSWORD** (e.g. OrangeHRM demo: `Admin` / `admin123`)

## 📝 Deliverables

- ✅ Page Objects: LoginPage, UsersManagementPage
- ✅ Nine test classes aligned with TEST_CASES.md
- ✅ Test data helper for independent runs

## ✅ Evaluation Criteria

- ✅ No credentials in code; env only
- ✅ CRUD, search, pagination, bulk operations covered
- ✅ Tests independent; runnable in any order

## 🚀 Quick Start

### 1. Prerequisites

- **Java 17+**, **Firefox** installed

### 2. Configure Credentials

See **`src/test/resources/.env.example`**. Example for OrangeHRM demo:

```bash
set ADMIN_USERNAME=Admin
set ADMIN_PASSWORD=admin123
```

Optional: `ADMIN_BASE_URL` if not using default OrangeHRM demo URL.

### 3. Run All Tests

```bash
cd selenium-java-tests/PROJECT_15_Admin_Panel_Testing
.\mvnw.cmd test
```

### 4. Run a Single Test Class

```bash
.\mvnw.cmd test -Dtest=LoginTest
.\mvnw.cmd test -Dtest=CreateUserTest
.\mvnw.cmd test -Dtest=SearchFilterTest
# ... etc.
```

## 📚 Documentation

- **[TEST_CASES.md](TEST_CASES.md)** — Full test case list
- **[TEST_RUN_CONFORMITY.md](TEST_RUN_CONFORMITY.md)** — Mapping and run status

## 📊 Implementation Status

| Feature        | Status        | Notes                    |
|----------------|---------------|--------------------------|
| Admin login    | ✅ Implemented | Skip if no creds         |
| Create user    | ✅ Implemented | Unique data via helper   |
| Read/List      | ✅ Implemented | Users table              |
| Update user    | ✅ Implemented | Edit and save            |
| Delete user    | ✅ Implemented | With confirmation        |
| Search/Filter  | ✅ Implemented | Reset supported          |
| Pagination     | ✅ Implemented |                          |
| Bulk operations| ✅ Implemented | Multi-select, actions    |
| E2E CRUD flow  | ✅ Implemented | CompleteCrudFlowTest     |

## 💡 Tips

1. **OrangeHRM demo** may reset data periodically; create/delete may have restrictions (see test comments and TEST_RUN_CONFORMITY.md).
2. Use **TestDataHelper** for unique usernames to avoid clashes between runs.

---

**Aligned with [TEST_CASES.md](TEST_CASES.md) and [TEST_RUN_CONFORMITY.md](TEST_RUN_CONFORMITY.md).**
