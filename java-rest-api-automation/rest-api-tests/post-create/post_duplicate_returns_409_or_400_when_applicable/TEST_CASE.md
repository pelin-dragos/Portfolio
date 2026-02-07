# Test Case: POST Duplicate Returns 409 or 400 When Applicable

| Attribute | Value |
|-----------|--------|
| **Test Case ID** | API-POST-009 |
| **Priority** | Medium |
| **Type** | REST API, Negative |

## Objective

Verify that when the API enforces a uniqueness constraint (e.g. unique email, unique code), sending a second POST that would violate that constraint returns HTTP 409 Conflict or 400 Bad Request with a clear message, and does not create a duplicate resource.

## Preconditions

- Create endpoint has at least one uniqueness constraint (documented).
- First POST with given unique value succeeds (resource created).
- Same unique value sent again is considered duplicate.

## Test Data

- Request body that includes a unique field (e.g. email, code). Use the same value twice in two POST requests.

## Steps

1. Send a first POST with valid body including a unique field value; verify 201 (or 200).
2. Send a second POST with the same unique field value (and other required fields valid).
3. Capture the response status code and body of the second request.

## Expected Result

- Second response status code is **409** or **400** (per API contract).
- Response body contains an error message indicating duplicate or constraint violation.
- Only one resource exists for that unique value (no duplicate created). If API does not enforce uniqueness, mark test as N/A.

## Automation Notes

- Assert on status 409 or 400 and on error message. Use test data for unique value; clean up created resource in teardown if needed to keep suite idempotent.
