# Project 14: Banking Application Testing

## 🎯 Objective

Selenium (Java) tests for a **banking-style application** (e.g. ParaBank): login, dashboard, balance display, transfer funds, and account statements. Tests are aligned with **[TEST_CASES.md](TEST_CASES.md)**. Credentials and base URL come only from **environment variables** (no secrets in code).

## 📋 Requirements

- ✅ Login with valid/invalid credentials
- ✅ Dashboard: balance and account summary
- ✅ Transfer funds between accounts
- ✅ Account activity / statements
- ✅ End-to-end flow (login → transfer → statements)
- ✅ Skip login-dependent tests when credentials not configured

## 🛠️ Technologies

- **Selenium WebDriver** — Browser automation
- **Java 17** — Language
- **Maven** — Build (Maven Wrapper included)
- **JUnit 5** — Test framework
- **WebDriverManager** — Driver management
- **Firefox** — Default browser

## 📁 Project Structure

```
PROJECT_14_Banking_Application_Testing/
├── pom.xml                          # Maven dependencies
├── mvnw.cmd                         # Maven Wrapper (Windows)
├── README.md                        # This file
├── TEST_CASES.md                    # Test case specifications
├── TEST_RUN_CONFORMITY.md           # TC-to-method mapping and run status
│
└── src/test/
    ├── java/.../project14/
    │   ├── base/
    │   │   └── BaseTest.java        # WebDriver lifecycle, Firefox
    │   ├── config/
    │   │   └── TestConfig.java      # Base URL, username, password from env; isLoginConfigured()
    │   ├── pages/
    │   │   ├── LoginPage.java       # Login form
    │   │   ├── DashboardPage.java   # Account overview, balance
    │   │   ├── TransferFundsPage.java # Transfer between accounts
    │   │   └── AccountActivityPage.java # Statements / activity
    │   └── tests/
    │       ├── LoginTest.java           # TC-BANK-LOGIN-*
    │       ├── DashboardTest.java       # Dashboard and balance
    │       ├── TransferFundsTest.java   # Transfer flows
    │       ├── StatementsTest.java      # Account activity
    │       └── CompleteFlowTest.java    # E2E flow
    │
    └── resources/
        └── .env.example             # BANKING_BASE_URL, BANKING_USERNAME, BANKING_PASSWORD
```

## ✨ Features

### 1. Login

- Valid credentials → dashboard
- Invalid credentials → error; no dashboard access
- When `BANKING_USERNAME` / `BANKING_PASSWORD` are not set, login-dependent tests are **skipped** with a clear message

### 2. Dashboard

- Balance display
- Account summary
- Navigation to transfer and statements

### 3. Transfer Funds

- Select from/to accounts and amount
- Submit and verify success/feedback

### 4. Account Activity / Statements

- Open statements or activity view
- Verify data or table presence

### 5. Complete Flow

- Login → dashboard → transfer → statements in one test

### 6. Configuration

- **BANKING_BASE_URL** (default: `https://parabank.parasoft.com/parabank/`)
- **BANKING_USERNAME**, **BANKING_PASSWORD** — required for login-dependent tests

## 📝 Deliverables

- ✅ Page Objects: Login, Dashboard, TransferFunds, AccountActivity
- ✅ Five test classes aligned with TEST_CASES.md
- ✅ Skip logic when credentials not configured

## ✅ Evaluation Criteria

- ✅ No credentials in code; env only
- ✅ All banking scenarios from TEST_CASES.md covered or skipped with reason
- ✅ Independent tests; runnable in any order

## 🚀 Quick Start

### 1. Prerequisites

- **Java 17+**, **Firefox** installed

### 2. Configure Credentials (for full run)

Copy `src/test/resources/.env.example` to `.env` or set in shell:

```bash
set BANKING_USERNAME=john
set BANKING_PASSWORD=demo
```

Optional: `BANKING_BASE_URL` if using a different ParaBank instance.

### 3. Run All Tests

```bash
cd selenium-java-tests/PROJECT_14_Banking_Application_Testing
.\mvnw.cmd test
```

**Without credentials:** Only tests that do not require login (e.g. invalid login) run; others are skipped with a clear message.

### 4. Run a Single Test Class

```bash
.\mvnw.cmd test -Dtest=LoginTest
.\mvnw.cmd test -Dtest=DashboardTest
.\mvnw.cmd test -Dtest=TransferFundsTest
.\mvnw.cmd test -Dtest=StatementsTest
.\mvnw.cmd test -Dtest=CompleteFlowTest
```

## 📚 Documentation

- **[TEST_CASES.md](TEST_CASES.md)** — Test case list (TC-ID, steps, expected result)
- **[TEST_RUN_CONFORMITY.md](TEST_RUN_CONFORMITY.md)** — Mapping and run status

## 📊 Implementation Status

| Feature        | Status        | Notes                          |
|----------------|---------------|--------------------------------|
| Login          | ✅ Implemented | Valid/invalid; skip if no creds |
| Dashboard      | ✅ Implemented | Balance, summary                |
| Transfer funds | ✅ Implemented | Between accounts               |
| Statements     | ✅ Implemented | Account activity               |
| Complete flow  | ✅ Implemented | E2E                            |
| Env config     | ✅ Implemented | No secrets in code             |

## 💡 Tips

1. Do **not** commit real credentials; use `.env` (gitignored) or environment variables.
2. ParaBank demo may have default users (e.g. `john`/`demo`); check app docs.

---

**Aligned with [TEST_CASES.md](TEST_CASES.md) and [TEST_RUN_CONFORMITY.md](TEST_RUN_CONFORMITY.md).**
