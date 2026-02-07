# Running the API Tests

## 1. Configure environment (required for tests that call real APIs)

Tests read configuration from **environment variables** or from a **`.env` file** in the project root (`java-rest-api-automation/`). Variables set in the system environment override values from `.env`.

### Option A: Use a `.env` file (recommended)

1. Copy the example file:
   ```bash
   cp .env.example .env
   ```
2. Edit `.env` and set **real values** (do not commit `.env`):
   - **BASE_URL** — base URL of your API (e.g. `https://api.example.com`), no trailing slash.
   - **AUTH_TOKEN** — Bearer token for protected endpoints (for auth tests).
   - **PROTECTED_ENDPOINT** — path of a protected endpoint (e.g. `/api/users` or `/api/me`).

Example for a real API:
```env
BASE_URL=https://jsonplaceholder.typicode.com
AUTH_TOKEN=
PROTECTED_ENDPOINT=/posts
```
*(Note: JSONPlaceholder does not require auth; auth tests will be skipped if AUTH_TOKEN is empty.)*

Example for an API that requires auth:
```env
BASE_URL=https://your-api.com
AUTH_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6...
PROTECTED_ENDPOINT=/api/users
```

### Option B: Set environment variables in the shell

**PowerShell:**
```powershell
$env:BASE_URL="https://api.example.com"
$env:AUTH_TOKEN="your_token"
$env:PROTECTED_ENDPOINT="/api/users"
mvn test
```

**Cmd:**
```cmd
set BASE_URL=https://api.example.com
set AUTH_TOKEN=your_token
set PROTECTED_ENDPOINT=/api/users
mvn test
```

## 2. Run tests

From the project root (`java-rest-api-automation/`):

```bash
# Run all tests (tests that need BASE_URL/AUTH_TOKEN will skip if not set)
mvn test

# Run only the auth test "valid token returns 200/201"
mvn test -Dtest=EndpointRequiringAuthReturns200Or201WithValidTokenTest
```

## 3. When will the test run correctly?

| Condition | Result |
|-----------|--------|
| **BASE_URL** and **AUTH_TOKEN** and **PROTECTED_ENDPOINT** set (in .env or env), and the API is reachable | Test runs and asserts 200 or 201 and non-null body. |
| **BASE_URL** or **AUTH_TOKEN** missing | Test is **skipped** (JUnit Assumptions), not failed. |
| API returns 401/403 or unreachable | Test **fails** (assertion or connection error). |

So: **yes**, if in `.env` you have the correct links/values for your API (BASE_URL, AUTH_TOKEN, PROTECTED_ENDPOINT), the test will run as intended. The project now **loads `.env` automatically** when you run `mvn test`, so you do not need to export variables manually if you use a `.env` file.

## 4. Future tests

New tests can use the same config: `ApiConfig.getBaseUrl()`, `ApiConfig.getAuthToken()`, `ApiConfig.getProtectedEndpoint()`. If you add more endpoints (e.g. list, create), add them to `.env.example` and to `ApiConfig` when you implement those tests.
