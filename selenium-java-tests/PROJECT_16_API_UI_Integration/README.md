# Project 16: API + UI Integration

## 🎯 Objective

Combine **Selenium (UI)** and **RestAssured (API)** in the same flow: create/read/update/delete via API, then verify data in the browser (e.g. JSON view). Uses **JSONPlaceholder** (or configurable base URL). Aligned with **[TEST_CASES.md](TEST_CASES.md)**.

## 📋 Requirements

- ✅ API calls (POST, GET, PUT, DELETE) via RestAssured
- ✅ UI verification with Selenium (open URL, parse JSON from page)
- ✅ Integration tests: create/update via API → verify in browser
- ✅ Data consistency: API response and UI content match
- ✅ Base URL from config/env; no hardcoded hosts or secrets

## 🛠️ Technologies

- **Selenium WebDriver** — Browser automation (UI verification)
- **RestAssured** — REST API calls
- **Java 17** — Language
- **Maven** — Build (Maven Wrapper included)
- **JUnit 5** — Test framework
- **WebDriverManager** — Driver management
- **Firefox** — Default browser

## 📁 Project Structure

```
PROJECT_16_API_UI_Integration/
├── pom.xml                          # Maven dependencies (Selenium + RestAssured)
├── mvnw.cmd                         # Maven Wrapper (Windows)
├── README.md                        # This file
├── TEST_CASES.md                    # Test case specifications
├── TEST_RUN_CONFORMITY.md           # TC-to-method mapping and run status
│
└── src/test/
    ├── java/.../project16/
    │   ├── base/
    │   │   └── BaseTest.java        # Selenium WebDriver (Firefox), per-test lifecycle
    │   ├── config/
    │   │   └── TestConfig.java      # API base URL, UI/timeout from env
    │   ├── api/
    │   │   └── PostsApiClient.java # RestAssured: POST, GET, PUT, DELETE /posts
    │   ├── ui/
    │   │   └── JsonPage.java        # Selenium: navigate to URL, get body text, parse JSON
    │   └── tests/
    │       ├── ApiCreateTest.java       # API-only create
    │       ├── UiVerificationTest.java  # UI-only: open URL, verify JSON/id/title
    │       ├── IntegrationTest.java     # API create/update → verify in UI
    │       ├── CompleteFlowTest.java    # Full API+UI flow
    │       └── DataConsistencyTest.java # API vs UI data match
    │
    └── resources/
        └── .env.example             # API_BASE_URL
```

## ✨ Features

### 1. API Layer (RestAssured)

- **POST** — Create resource; assert 201, Location, body
- **GET** — Read single/list; assert 200, body
- **PUT** — Update; assert 200, updated fields
- **DELETE** — Delete; assert 204/200

### 2. UI Layer (Selenium)

- Navigate to API URL (e.g. `GET /posts/1`)
- Get page body (JSON viewer or raw text)
- Parse JSON or assert presence of id/title/body

### 3. Integration

- Create/update via API → open same resource URL in browser → verify content
- Data consistency: same id/title/body in API response and UI

### 4. Configuration

- **API_BASE_URL** (default: `https://jsonplaceholder.typicode.com/`)
- See **`src/test/resources/.env.example`**

## 📝 Deliverables

- ✅ PostsApiClient (RestAssured) and JsonPage (Selenium)
- ✅ Five test classes: API, UI, Integration, CompleteFlow, DataConsistency
- ✅ No secrets in code; config from env

## ✅ Evaluation Criteria

- ✅ API and UI steps clearly separated; combined in integration tests
- ✅ Tests independent; runnable in any order
- ✅ JSONPlaceholder limitation (no persistence for POST/PUT/DELETE) documented and handled

## 🚀 Quick Start

### 1. Prerequisites

- **Java 17+**, **Firefox** installed

### 2. Run All Tests

```bash
cd selenium-java-tests/PROJECT_16_API_UI_Integration
.\mvnw.cmd test
```

### 3. Run a Single Test Class

```bash
.\mvnw.cmd test -Dtest=ApiCreateTest
.\mvnw.cmd test -Dtest=UiVerificationTest
.\mvnw.cmd test -Dtest=IntegrationTest
.\mvnw.cmd test -Dtest=CompleteFlowTest
.\mvnw.cmd test -Dtest=DataConsistencyTest
```

### 4. Custom API Base URL

```bash
set API_BASE_URL=https://your-api.example.com/
.\mvnw.cmd test
```

## 📚 Documentation

- **[TEST_CASES.md](TEST_CASES.md)** — Test case list
- **[TEST_RUN_CONFORMITY.md](TEST_RUN_CONFORMITY.md)** — Mapping and run status

## ⚠️ Demo Limitation

**JSONPlaceholder** does not persist POST/PUT/DELETE. Tests use existing ids (e.g. 1) for UI verification where needed; README and test comments document this. For a real API that persists data, integration tests would assert full create → read in UI → update → read again.

## 📊 Implementation Status

| Feature        | Status        | Notes                    |
|----------------|---------------|--------------------------|
| API client     | ✅ Implemented | RestAssured /posts        |
| UI verification| ✅ Implemented | JsonPage, parse body     |
| Integration    | ✅ Implemented | API then UI verify        |
| Complete flow  | ✅ Implemented | Full API+UI flow         |
| Data consistency | ✅ Implemented | API vs UI match        |
| Env config     | ✅ Implemented | API_BASE_URL             |

## 💡 Tips

1. UI verification uses presence of id/title/body in page content so tests work with JSON viewer or raw JSON.
2. For a persistent API, extend tests to assert create → GET in UI → update → GET again.

---

**Aligned with [TEST_CASES.md](TEST_CASES.md) and [TEST_RUN_CONFORMITY.md](TEST_RUN_CONFORMITY.md).**
