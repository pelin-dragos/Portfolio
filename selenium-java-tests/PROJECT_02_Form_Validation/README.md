# Project 02: Form Validation

## 🎯 Objective

Automated form validation for **required fields**, **email**, **password**, and **phone** across multiple sites: DemoQA (Practice Form, Text Box) and The Internet (Basic Auth / login). All scenarios are aligned with **[TEST_CASES.md](TEST_CASES.md)**.

## 📋 Requirements

- ✅ Required-field validation (submit without filling; error messages)
- ✅ Email format validation (invalid, valid)
- ✅ Password rules validation (length, format)
- ✅ Phone number validation (invalid format, valid)
- ✅ Page Object Model; no credentials in code
- ✅ Config from environment; multiple base URLs supported

## 🛠️ Technologies

- **Selenium WebDriver** — Browser automation
- **Java 17** — Language
- **Maven** — Build (Maven Wrapper included)
- **JUnit 5** — Test framework
- **WebDriverManager** — Driver management
- **Firefox** — Default browser

## 📁 Project Structure

```
PROJECT_02_Form_Validation/
├── pom.xml                          # Maven dependencies
├── mvnw.cmd                         # Maven Wrapper (Windows)
├── README.md                        # This file
├── TEST_CASES.md                    # Test case specifications
├── TEST_RUN_CONFORMITY.md           # TC-to-method mapping and run status
│
└── src/test/
    ├── java/.../project02/
    │   ├── base/
    │   │   └── BaseTest.java        # WebDriver lifecycle, Firefox
    │   ├── config/
    │   │   └── TestConfig.java      # DemoQA & The Internet base URLs from env
    │   ├── pages/
    │   │   ├── DemoQATextBoxPage.java      # Text Box full form
    │   │   ├── DemoQAPracticeFormPage.java # Practice Form (required, email, etc.)
    │   │   └── TheInternetLoginPage.java  # Basic Auth / login form
    │   └── tests/
    │       ├── RequiredFieldsTest.java     # Required field validation
    │       ├── EmailValidationTest.java    # Email format
    │       ├── PasswordValidationTest.java  # Password rules
    │       └── PhoneValidationTest.java    # Phone format
    │
    └── resources/
        └── .env.example             # DEMOQA_BASE_URL, THE_INTERNET_BASE_URL
```

## ✨ Features

### 1. Required Fields

- Submit with empty required fields
- Verify error messages or validation indicators
- DemoQA Practice Form and Text Box where applicable

### 2. Email Validation

- Invalid formats (e.g. missing @, no TLD)
- Valid format acceptance
- Clear assertion messages on failure

### 3. Password Validation

- Too short / too long
- Missing special characters or digits (if required by form)
- Valid password acceptance

### 4. Phone Validation

- Invalid formats (letters, wrong length)
- Valid format acceptance

### 5. Configuration

- **DemoQA base URL** and **The Internet base URL** from env (see `.env.example`)

## 📝 Deliverables

- ✅ Page Objects for DemoQA and The Internet forms
- ✅ Four test classes aligned with TEST_CASES.md
- ✅ Maven Wrapper; independent, order-agnostic tests

## ✅ Evaluation Criteria

- ✅ All validation scenarios from TEST_CASES.md covered
- ✅ No hardcoded credentials; config from env
- ✅ Tests independent and runnable singly or as suite

## 🚀 Quick Start

### 1. Prerequisites

- **Java 17+**, **Firefox** installed

### 2. Run All Tests

```bash
cd selenium-java-tests/PROJECT_02_Form_Validation
.\mvnw.cmd test
```

### 3. Run a Single Test Class

```bash
.\mvnw.cmd test -Dtest=RequiredFieldsTest
.\mvnw.cmd test -Dtest=EmailValidationTest
.\mvnw.cmd test -Dtest=PasswordValidationTest
.\mvnw.cmd test -Dtest=PhoneValidationTest
```

### 4. From Repo Root

```bash
mvn test -pl selenium-java-tests/PROJECT_02_Form_Validation
```

## 📚 Documentation

- **[TEST_CASES.md](TEST_CASES.md)** — All cases (required, email, password, phone)
- **[TEST_RUN_CONFORMITY.md](TEST_RUN_CONFORMITY.md)** — Mapping and run status

## 📊 Implementation Status

| Feature           | Status        | Notes                    |
|------------------|---------------|--------------------------|
| Required fields  | ✅ Implemented | DemoQA Practice Form     |
| Email validation | ✅ Implemented | Invalid/valid formats    |
| Password validation | ✅ Implemented | Length/format rules   |
| Phone validation | ✅ Implemented | Invalid/valid formats    |
| Page Objects     | ✅ Implemented | 3 pages (DemoQA x2, The Internet) |
| Env config       | ✅ Implemented | Multiple base URLs       |

## 💡 Tips

1. Use **.env** or export variables from `.env.example` if base URLs differ from defaults.
2. DemoQA and The Internet are public; no credentials needed for validation tests.

---

**Aligned with [TEST_CASES.md](TEST_CASES.md) and [TEST_RUN_CONFORMITY.md](TEST_RUN_CONFORMITY.md).**
