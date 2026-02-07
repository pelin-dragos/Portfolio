# Java REST API Automation

Java-based QA automation framework for **REST API**, **web UI**, and **integration** testing. Uses **RestAssured**, **Selenium**, **JUnit 5**, and **Maven**, with clear separation of concerns and OOP design.

---

## Purpose

- Demonstrate **Java** and **OOP** proficiency for QA automation.
- Cover **REST API** testing (and optional SOAP), **web front-end** testing (including Angular), and **integration** scenarios with database verification.
- Provide a reusable, maintainable structure suitable for microservices, middleware, and web applications.

---

## Contents Overview

| # | Component | Description | Status |
|---|-----------|-------------|--------|
| 1 | **REST API tests** | RestAssured tests for GET, POST, PUT, PATCH, DELETE; positive/negative cases; client and DTOs | Core |
| 2 | **UI / Web tests** | Selenium tests with Page Object Model; supports Angular and other web frontends | Core |
| 3 | **Integration tests** | API + DB flows; SQL/JDBC verification after API or UI actions | Core |
| 4 | **Config, utils, base classes** | Environment config, shared utilities, base test classes | Core |
| 5 | **Test data** | JSON/CSV payloads and datasets under `src/test/resources` | Core |
| 6 | **Build & run** | Maven `pom.xml` with profiles (api, ui, integration, all) | Core |
| 7 | **Banking (optional)** | API or UI tests for banking-like flows (accounts, transactions) | Optional |
| 8 | **SOAP (optional)** | SOAP API tests or documentation for extensibility | Optional |

---

## Project Structure

```
java-rest-api-automation/
├── pom.xml
├── .env.example
├── README.md
│
├── src/
│   ├── main/
│   │   └── java/
│   │       └── [config, API client base, shared utilities]
│   │
│   └── test/
│       ├── java/
│       │   ├── api/                      # REST API tests (RestAssured)
│       │   │   ├── banking/              # Optional: banking API tests
│       │   │   └── soap/                 # Optional: SOAP tests
│       │   ├── ui/                       # Web UI tests (Selenium)
│       │   │   └── banking/              # Optional: banking UI tests
│       │   ├── integration/             # API + DB integration tests
│       │   └── common/                   # BaseApiTest, BaseWebTest, shared
│       │
│       └── resources/
│           ├── api/                      # API request payloads (JSON)
│           ├── ui/                       # UI test data (CSV/JSON)
│           └── integration/             # Integration test data, SQL refs
```

---

## 1. REST API Tests (RestAssured)

**Location:** `src/test/java/api/` (and optionally `api/soap/`)

- REST coverage: **GET, POST, PUT, PATCH, DELETE** with status, body, and header assertions.
- **API client** or base spec: base URL, auth, common headers.
- **DTOs** for request/response where applicable.
- **Positive and negative** cases (e.g. validation errors, 4xx/5xx).
- Optional: **SOAP** tests in `api/soap/` or documentation that the framework is extensible to SOAP.

---

## 2. UI / Web Tests (Selenium)

**Location:** `src/test/java/ui/`

- Browser automation: login, navigation, forms, lists.
- **Page Object Model**: Page classes and a base page.
- **WebDriver** setup (Chrome/Firefox, optional headless).
- UI tests can target **Angular** and other web frontends (demo or internal apps).

---

## 3. Integration Tests (API + DB)

**Location:** `src/test/java/integration/`

- Scenarios where **API** is used for setup, execution, and verification (e.g. microservices/middleware).
- **Database checks via SQL/JDBC**: after API or UI actions, run queries to verify data (inserts, updates, state).
- Optional: second API or service for cross-service verification.
- Test data setup/cleanup, including via SQL where needed.

---

## 4. Config, Utilities & Base Classes

**Location:** `src/main/java/` (config, clients, utils) and `src/test/java/common/` (base tests)

- **Config:** base URL, timeouts, environment (e.g. from `.env` or system properties); no secrets in code.
- **Utilities:** data generation (strings, dates), retry logic, logging, request/response helpers.
- **Base classes:** `BaseApiTest`, `BaseWebTest` (or `BaseSeleniumTest`) with common setup/teardown and driver or RestAssured init.
- Optional: test data loaders (e.g. JSON/CSV readers).

---

## 5. Test Data

**Location:** `src/test/resources/` with subfolders: `api/`, `ui/`, `integration/`

- **API:** JSON request bodies and, if needed, expected response samples.
- **UI:** CSV or JSON for login, form data, and other UI inputs.
- **Integration:** datasets and, if useful, reference SQL scripts (no production data; use placeholders).
- **`.env.example`** in project root for required env vars (no real secrets committed).

---

## 6. Build & Run (Maven)

**Location:** `pom.xml` at project root

- **Dependencies:** RestAssured, JUnit 5, Selenium WebDriver, JDBC driver for DB checks, optionally Lombok.
- **Profiles or tags** to run:
  - API only (e.g. `mvn test -Papi`)
  - UI only (e.g. `mvn test -Pui`)
  - Integration only (e.g. `mvn test -Pintegration`)
  - Full suite (e.g. `mvn test` or `mvn test -Pall`)
- Optional: Surefire report plugin, env-specific configuration.

**Example commands:**

```bash
cd java-rest-api-automation
mvn clean test                    # run full suite (or default profile)
mvn clean test -Papi              # API tests only
mvn clean test -Pui               # UI tests only
mvn clean test -Pintegration      # integration tests only
```

---

## 7. Optional: Banking

**Location:** e.g. `src/test/java/api/banking/` and/or `src/test/java/ui/banking/`

- **API:** Tests for banking-like endpoints (accounts, transactions, statements) against a demo API.
- **UI:** Selenium tests for a banking demo (e.g. ParaBank) to show experience with banking flows in Java.

---

## 8. Optional: SOAP

**Location:** `src/test/java/api/soap/` or equivalent package

- A few **SOAP** tests using a Java SOAP client against a demo service, **or**
- Short documentation in this README or a separate doc stating that the framework is **extensible for SOAP** and how (e.g. which client, where to add tests).

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Language | Java 11+ |
| API testing | RestAssured |
| UI testing | Selenium WebDriver |
| Unit/Test runner | JUnit 5 (or TestNG) |
| Build | Maven |
| DB verification | JDBC (+ DB driver as needed) |
| Optional | Lombok (DTOs, builders); SOAP client for SOAP tests |

---

## Quick Start (after implementation)

1. **Configure environment**

   ```bash
   cp .env.example .env
   # Edit .env with base URLs, DB connection (if used), etc. Do not commit .env.
   ```

2. **Run tests**

   ```bash
   mvn clean test
   ```

3. **Run by profile** (when configured)

   ```bash
   mvn clean test -Papi
   mvn clean test -Pui
   mvn clean test -Pintegration
   ```

---

## Checklist Summary

| Component | Required |
|-----------|----------|
| REST API tests (RestAssured) | Yes |
| UI tests (Selenium, incl. Angular) | Yes |
| Integration tests (API + SQL/JDBC) | Yes |
| Config, utils, base classes | Yes |
| Test data (resources) | Yes |
| Maven build and profiles | Yes |
| Banking (API or UI) | Optional |
| SOAP tests or docs | Optional |

---

*This framework is independent of Playwright and is intended for Java-based API, UI, and integration automation.*
