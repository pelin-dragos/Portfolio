# Test Case: GET Resource by Valid ID Returns 200 and Correct Body

| Attribute | Value |
|-----------|--------|
| **Test Case ID** | API-GET-SINGLE-001 |
| **Priority** | High |
| **Type** | REST API, Functional |

## Objective

Verify that a GET request to the resource-by-ID endpoint with a valid existing ID returns HTTP 200 and the correct resource representation in the response body.

## Preconditions

- Base URL and resource-by-ID endpoint are configured (e.g. `GET /resources/{id}`).
- At least one resource exists (or is created in setup) so that a valid ID is available.
- ID is obtained from test data or from a previous POST/setup step; not hardcoded where avoidable.

## Test Data

- Valid resource ID (from config, test data, or setup).
- Endpoint path: e.g. `/resources/{id}`.

## Steps

1. Resolve a valid resource ID (from test data or by creating a resource in setup).
2. Send a GET request to the resource-by-ID endpoint with that ID in the path.
3. Capture the response status code and body.
4. Parse the response body and verify it represents a single resource (not an array).

## Expected Result

- Response status code is **200**.
- Response body is a single resource object (JSON object) with the requested ID and expected top-level fields.
- Body matches the resource that was requested (ID in path matches ID in body when applicable).

## Automation Notes

- Assert on status 200 and on body containing the expected ID and key fields. Use RestAssured path or JSON path for assertions.
- Obtain ID from shared test data or setup; avoid hardcoded production IDs.

---

## Traceability (automation)

| Item | Location |
|------|----------|
| **Test Case ID** | API-GET-SINGLE-001 |
| **Automated test (source)** | `GetByValidIdReturns200AndCorrectBodyTest.java` (same folder) |
| **Project path** | `java-rest-api-automation/rest-api-tests/get-single/get_by_valid_id_returns_200_and_correct_body/` |
