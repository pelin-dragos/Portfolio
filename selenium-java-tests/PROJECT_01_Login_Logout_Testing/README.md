# Project 01: Login & Logout Testing

## 🎯 Objective

Automated login and logout flows for **Sauce Demo** with Selenium (Java): successful login (standard_user, problem_user, performance_glitch_user), login failure (invalid/empty credentials), logout, and session verification. Tests are independent and aligned with **[TEST_CASES.md](TEST_CASES.md)**.

## 📋 Requirements

- ✅ Login success with valid users (multiple personas)
- ✅ Login failure with invalid/empty credentials
- ✅ Logout and session verification
- ✅ Page Object Model with explicit waits (no `Thread.sleep`)
- ✅ No credentials in code; config via environment variables
- ✅ Tests run in any order; each test is self-contained

## 🛠️ Technologies

- **Selenium WebDriver** — Browser automation
- **Java 17** — Language
- **Maven** — Build and dependencies (Maven Wrapper included)
- **JUnit 5** — Test framework
- **WebDriverManager** — Driver management (no manual driver path)
- **Firefox** — Default browser (avoids Chrome password-manager popups)

## 📁 Project Structure

```
PROJECT_01_Login_Logout_Testing/
├── pom.xml                          # Maven dependencies
├── mvnw.cmd                         # Maven Wrapper (Windows)
├── README.md                        # This file
├── TEST_CASES.md                    # Test case specifications
├── TEST_RUN_CONFORMITY.md           # TC-to-method mapping and run status
│
└── src/test/
    ├── java/.../project01/
    │   ├── base/
    │   │   └── BaseTest.java        # WebDriver lifecycle, Firefox setup
    │   ├── config/
    │   │   └── TestConfig.java      # Base URL from env (SAUCEDEMO_BASE_URL)
    │   ├── pages/
    │   │   ├── LoginPage.java       # Login actions and assertions
    │   │   └── ProductsPage.java    # Post-login product list
    │   └── tests/
    │       ├── LoginSuccessTest.java   # TC-LOGIN-001 to 004
    │       ├── LoginFailureTest.java   # TC-LOGIN-005 to 011
    │       └── LogoutTest.java        # TC-LOGOUT-001 to 003
    │
    └── resources/
        └── .env.example             # Placeholder for SAUCEDEMO_BASE_URL
```

## ✨ Features

### 1. Login Success

- **standard_user** — Full access
- **problem_user** — Simulated issues
- **performance_glitch_user** — Delayed response
- Assertions: redirect to products page, inventory visible

### 2. Login Failure

- Invalid username/password
- Empty username or password
- Locked-out user handling
- Error message verification

### 3. Logout

- Logout from products page
- Redirect to login page
- Session cleared (no back-to-products without re-login)

### 4. Configuration

- **Base URL:** `SAUCEDEMO_BASE_URL` (default: `https://www.saucedemo.com/`)
- No credentials in code; use env or `.env` (see `.env.example`)

## 📝 Deliverables

- ✅ Page Objects: `LoginPage`, `ProductsPage` with explicit waits
- ✅ Three test classes aligned with TEST_CASES.md (TC-LOGIN-*, TC-LOGOUT-*)
- ✅ Maven Wrapper for reproducible builds (no global Maven required)
- ✅ TEST_RUN_CONFORMITY.md for traceability

## ✅ Evaluation Criteria

- ✅ All scenarios from TEST_CASES.md covered
- ✅ Explicit waits (WebDriverWait); no hardcoded sleeps
- ✅ Tests independent; runnable in any order or singly
- ✅ No secrets in code; config from env

## 🚀 Quick Start

### 1. Prerequisites

- **Java 17+** (set `JAVA_HOME` to your JDK)
- **Firefox** installed (default browser)
- Maven is **not** required on PATH — project uses **Maven Wrapper**

### 2. Run All Tests

```bash
cd selenium-java-tests/PROJECT_01_Login_Logout_Testing
.\mvnw.cmd test
```

On first run, the wrapper downloads Maven 3.9.6 into `.mvn/wrapper/maven/`.

### 3. Run a Single Test Class

```bash
.\mvnw.cmd test -Dtest=LoginSuccessTest
.\mvnw.cmd test -Dtest=LoginFailureTest
.\mvnw.cmd test -Dtest=LogoutTest
```

### 4. Optional: Custom Base URL

```bash
set SAUCEDEMO_BASE_URL=https://your-saucedemo-instance.com/
.\mvnw.cmd test
```

## 📚 Documentation

- **[TEST_CASES.md](TEST_CASES.md)** — Full list of test cases (TC-ID, steps, expected result, priority)
- **[TEST_RUN_CONFORMITY.md](TEST_RUN_CONFORMITY.md)** — Mapping of test cases to test methods and run status

## 📊 Implementation Status

| Feature           | Status        | Notes                          |
|------------------|---------------|--------------------------------|
| Login success    | ✅ Implemented | 4 scenarios (3 users + 1 combined) |
| Login failure    | ✅ Implemented | Invalid, empty, locked_out      |
| Logout           | ✅ Implemented | 3 scenarios                    |
| Page Objects     | ✅ Implemented | LoginPage, ProductsPage         |
| Explicit waits   | ✅ Implemented | WebDriverWait; no Thread.sleep  |
| Env config       | ✅ Implemented | SAUCEDEMO_BASE_URL             |

## 💡 Tips

1. **Browser:** Firefox is used by default to avoid Chrome/Google “Change your password” popups on Sauce Demo.
2. **From repo root:** Run with `mvn test -pl selenium-java-tests/PROJECT_01_Login_Logout_Testing` if Maven is on PATH.
3. **Clean run:** Use `.\mvnw.cmd clean test` to ensure a fresh build.

---

**Aligned with [TEST_CASES.md](TEST_CASES.md) and [TEST_RUN_CONFORMITY.md](TEST_RUN_CONFORMITY.md).**
