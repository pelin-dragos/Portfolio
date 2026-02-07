# REST API Tests — Test Cases

Test cases for the RestAssured API suite. Each test has its own folder with a **TEST_CASE.md** used as the specification for automation (Java + RestAssured + JUnit 5).

## Folder structure (grouped by category)

Tests are grouped by **HTTP method and theme** so the list is easier to navigate:

| Folder | Description | Count |
|--------|-------------|-------|
| **get-list** | GET collection/list endpoint | 8 |
| **get-single** | GET resource by ID | 6 |
| **post-create** | POST create resource | 9 |
| **put-update** | PUT full update | 8 |
| **patch-update** | PATCH partial update | 7 |
| **delete** | DELETE resource | 7 |
| **headers** | Accept, Content-Type, sensitive headers | 3 |
| **error-responses** | 4xx/5xx and response time | 3 |
| **auth** | Authentication and authorization | 4 |

**Total: 55 test cases.**

## Inside each test folder

- **TEST_CASE.md** — Full test case (Objective, Preconditions, Steps, Expected Result, Automation Notes). Use this when writing the Java test.

## Reference

- **TEST_LIST.md** — Full enumerated list of all tests (same content, flat list).
- **TESTING_RULES.md** (repository root) — Rules that apply to all test implementation.
