# Test Case: GET Resource by Non-Existent ID Returns 404

| Attribute | Value |
|-----------|--------|
| **Test Case ID** | API-GET-SINGLE-003 |
| **Priority** | High |
| **Type** | REST API, Negative |

## Objective

Verify that a GET request to the resource-by-ID endpoint with a non-existent ID returns HTTP 404 Not Found and does not return a resource body.

## Preconditions

- Base URL and resource-by-ID endpoint are configured.
- The chosen ID is guaranteed not to exist (e.g. very high number, or ID from deleted resource). Do not use an ID that might exist in another environment.

## Test Data

- Non-existent resource ID: e.g. `999999`, or an ID known to be deleted, or a value that the API treats as "not found" per contract.

## Steps

1. Choose or generate a non-existent resource ID (e.g. max ID + 1, or a dedicated constant).
2. Send a GET request to the resource-by-ID endpoint with that ID in the path.
3. Capture the response status code and body.

## Expected Result

- Response status code is **404 Not Found**.
- Response body may contain an error message or code; no successful resource representation is returned.
- No 200 or 500 for "resource not found" scenario.

## Automation Notes

- Assert on status 404 only, or also on error body structure if API defines it. Use a stable non-existent ID (constant or clearly out-of-range) to avoid flakiness.

---

## Traceability (automation)

| Item | Location |
|------|----------|
| **Test Case ID** | API-GET-SINGLE-003 |
| **Automated test (source)** | `GetByNonexistentIdReturns404Test.java` (same folder) |
| **Project path** | `java-rest-api-automation/rest-api-tests/get-single/get_by_nonexistent_id_returns_404/` |
