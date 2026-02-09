# Project 17: BDD Framework (Cucumber / Gherkin)

## 🎯 Objective

**BDD (Behavior-Driven Development)** with **Cucumber** and **Gherkin** in Java: feature files for login, logout, shopping cart, checkout, navigation, and product sorting on **Sauce Demo**. Step definitions use Selenium Page Objects. Scenarios are tagged (e.g. `@smoke`, `@login`, `@cart`) for filtered runs. Aligned with **[TEST_CASES.md](TEST_CASES.md)**.

## 📋 Requirements

- ✅ Cucumber-Java setup with JUnit 5
- ✅ Gherkin feature files (Given-When-Then)
- ✅ Step definitions in Java using Selenium Page Objects
- ✅ Feature files organized by functionality
- ✅ Tags for smoke, login, cart, checkout, navigation, sorting
- ✅ Base URL and credentials from environment (no secrets in code)

## 🛠️ Technologies

- **Cucumber** — BDD framework (Gherkin)
- **Selenium WebDriver** — Browser automation
- **Java 17** — Language
- **Maven** — Build (Maven Wrapper included)
- **JUnit 5** — Test runner (Cucumber-JUnit Platform)
- **WebDriverManager** — Driver management
- **Firefox** — Default browser

## 📁 Project Structure

```
PROJECT_17_BDD_Framework/
├── pom.xml                          # Maven dependencies (Cucumber, Selenium, JUnit 5)
├── mvnw.cmd                         # Maven Wrapper (Windows)
├── README.md                        # This file
├── TEST_CASES.md                    # Test case specifications
├── TEST_RUN_CONFORMITY.md           # TC-to-scenario mapping and run status
├── .env.example                     # BASE_URL, credentials placeholder
│
└── src/test/
    ├── java/.../project17/
    │   ├── base/
    │   │   ├── DriverHolder.java    # WebDriver holder for Cucumber
    │   │   └── Hooks.java           # Before/After; driver lifecycle per scenario
    │   ├── config/
    │   │   └── TestConfig.java     # Base URL, timeouts from env
    │   ├── pages/
    │   │   ├── LoginPage.java       # Login actions
    │   │   ├── ProductsPage.java    # Product list, sort
    │   │   ├── CartPage.java        # Cart actions
    │   │   └── CheckoutPage.java    # Checkout steps
    │   ├── steps/
    │   │   ├── LoginSteps.java      # Login steps
    │   │   ├── LogoutSteps.java     # Logout steps
    │   │   ├── CartSteps.java       # Shopping cart steps
    │   │   ├── CheckoutSteps.java   # Checkout steps
    │   │   ├── NavigationSteps.java # Navigation steps
    │   │   └── ProductSortingSteps.java # Sort steps
    │   └── RunCucumberTest.java     # JUnit 5 Cucumber entry point
    │
    └── resources/
        └── features/                 # Gherkin feature files
            ├── login.feature
            ├── logout.feature
            ├── shopping_cart.feature
            ├── checkout.feature
            ├── navigation.feature
            └── product_sorting.feature
```

## ✨ Features

### 1. BDD Framework (Cucumber-Java)

- **Gherkin** — Scenarios in natural language (Given-When-Then)
- **Step definitions** — Java classes in `steps/`; reuse Page Objects
- **Hooks** — Before/After for driver setup and teardown per scenario

### 2. Feature Files (6)

- **login.feature** — Login success/failure
- **logout.feature** — Logout and session
- **shopping_cart.feature** — Add/remove from cart
- **checkout.feature** — Checkout flow
- **navigation.feature** — Menu and navigation
- **product_sorting.feature** — Sort options

### 3. Tags

- `@smoke` — Smoke subset
- `@login`, `@logout`, `@cart`, `@checkout`, `@navigation`, `@sorting` — Filter by feature

### 4. Page Objects

- **LoginPage**, **ProductsPage**, **CartPage**, **CheckoutPage** — Used inside step definitions; no duplicate Selenium logic in steps

### 5. Configuration

- **Base URL** and credentials from env; use **[.env.example](.env.example)** (no secrets in code)

## 📝 Deliverables

- ✅ Six feature files with scenarios mapped to TEST_CASES.md
- ✅ Step definition classes reusing Page Objects
- ✅ Tags for filtered execution
- ✅ TEST_RUN_CONFORMITY.md for scenario-to-TC mapping

## ✅ Evaluation Criteria

- ✅ Scenarios readable (Gherkin); step definitions in Java
- ✅ Steps reuse Page Objects; no duplicated Selenium in steps
- ✅ Independent scenarios; runnable by tag or feature

## 🚀 Quick Start

### 1. Prerequisites

- **Java 17+**, **Firefox** installed

### 2. Run All Scenarios

```bash
cd selenium-java-tests/PROJECT_17_BDD_Framework
.\mvnw.cmd test
```

### 3. Run by Tag

```bash
# Smoke only
.\mvnw.cmd test -Dcucumber.filter.tags="@smoke"

# Login scenarios only
.\mvnw.cmd test -Dcucumber.filter.tags="@login"

# Cart and checkout
.\mvnw.cmd test -Dcucumber.filter.tags="@cart or @checkout"
```

### 4. Run a Single Feature

```bash
.\mvnw.cmd test -Dcucumber.features="src/test/resources/features/login.feature"
```

## 📚 Documentation

- **[TEST_CASES.md](TEST_CASES.md)** — Scenarios mapped to feature files and step definitions
- **[TEST_RUN_CONFORMITY.md](TEST_RUN_CONFORMITY.md)** — TC-to-scenario mapping and run status
- **[.env.example](.env.example)** — Placeholder for base URL and credentials

## 📊 Implementation Status

| Feature        | Status        | Notes                          |
|----------------|---------------|--------------------------------|
| Cucumber setup | ✅ Implemented | JUnit 5 Platform              |
| Feature files  | ✅ Implemented | 6 features                    |
| Step definitions | ✅ Implemented | 6 step classes               |
| Page Objects   | ✅ Implemented | 4 pages, reused in steps      |
| Hooks          | ✅ Implemented | Driver per scenario           |
| Tags           | ✅ Implemented | @smoke, @login, @cart, etc.    |
| Env config     | ✅ Implemented | No secrets in code            |

## 💡 Tips

1. **Tags:** Use `@smoke` for a quick run; combine with `or` for multiple groups.
2. **Steps:** Keep step definitions thin; put Selenium logic in Page Objects.
3. **Base URL:** Set via env or `.env`; see `.env.example`.

---

**Aligned with [TEST_CASES.md](TEST_CASES.md) and [TEST_RUN_CONFORMITY.md](TEST_RUN_CONFORMITY.md).**
