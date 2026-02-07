# Running the API Tests

## Which API to use (all tests)

Use **GoREST** for the whole `rest-api-tests` suite. It supports GET list/single, POST, PUT, PATCH, DELETE, pagination, validation errors, and Bearer auth, so all 55 tests can run against it.

Details and endpoint mapping: **rest-api-tests/RECOMMENDED_API.md**

---

## 1. Setup (once)

1. **Java 11+ (JDK)** must be installed and **JAVA_HOME** must point to the JDK folder (e.g. `C:\Program Files\Java\jdk-11`). The tests and Maven Wrapper need this.

2. **Get a free token:** [https://gorest.co.in/my-account/access-tokens](https://gorest.co.in/my-account/access-tokens)  
   (Log in with GitHub / Google / Microsoft, then copy your token.)

3. **Copy and edit .env:** Copy `.env.example` to `.env`, then open `.env` and set:
   ```env
   BASE_URL=https://gorest.co.in/public/v2
   AUTH_TOKEN=paste_your_token_here
   PROTECTED_ENDPOINT=/users
   ```

4. Do **not** commit `.env` (it is in `.gitignore`).

---

## 2. Run tests

From `java-rest-api-automation/` (same folder as `pom.xml` and `.env`):

**If Maven is NOT installed** — use Maven Wrapper (included in the project):

```powershell
# All tests
.\mvnw.cmd test

# Only the auth test "valid token returns 200/201"
.\mvnw.cmd test -Dtest=EndpointRequiringAuthReturns200Or201WithValidTokenTest
```

At the first run, the wrapper will download Maven automatically (one-time).

**If Maven IS installed** (and `mvn` is in PATH):

```bash
mvn test
mvn test -Dtest=EndpointRequiringAuthReturns200Or201WithValidTokenTest
```

You need **JAVA_HOME** set to your JDK (Java 11+). The wrapper uses it to run Maven.

---

## 3. When does a test pass or skip?

| Condition | Result |
|-----------|--------|
| `.env` has BASE_URL + AUTH_TOKEN + PROTECTED_ENDPOINT, API reachable | Tests run and assert as designed. |
| BASE_URL or AUTH_TOKEN missing | Auth-related tests **skipped** (Assumptions). |
| API returns 4xx/5xx or unreachable | Test **fails** (assertion or connection error). |

With the GoREST values above in `.env`, all current and future tests in `rest-api-tests` are configured to run against the same API.
