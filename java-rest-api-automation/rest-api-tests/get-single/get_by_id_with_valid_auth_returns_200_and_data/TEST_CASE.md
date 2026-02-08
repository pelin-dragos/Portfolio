# Test Case: GET Resource by ID With Valid Auth Returns 200 and Correct Data

| Attribute | Value |
|-----------|--------|
| **Test Case ID** | API-GET-SINGLE-006 |
| **Priority** | High |
| **Type** | REST API, Functional, Security |

## Objective

Verify that when the resource-by-ID endpoint requires authentication, a GET request with valid credentials returns HTTP 200 and the correct resource data.

## Preconditions

- Resource-by-ID endpoint requires authentication.
- Valid credentials or token are available from test config/environment.
- A valid resource ID exists (or is created in setup).

## Test Data

- Valid resource ID.
- Valid auth (token or credentials from env).

## Steps

1. Obtain valid authentication from config/env.
2. Send a GET request to the resource-by-ID endpoint with valid ID and valid auth header.
3. Capture the response status code and body.
4. Verify the response contains the expected resource and key fields.

## Expected Result

- Response status code is **200**.
- Response body contains the requested resource with correct ID and expected fields.
- No 401 or 403.

## Automation Notes

- Assert on status 200 and on body (ID and key fields). Use auth from config; no hardcoded secrets.

---

## Traceability (automation)

| Item | Location |
|------|----------|
| **Test Case ID** | API-GET-SINGLE-006 |
| **Automated test (source)** | `GetByIdWithValidAuthReturns200AndDataTest.java` (same folder) |
| **Project path** | `java-rest-api-automation/rest-api-tests/get-single/get_by_id_with_valid_auth_returns_200_and_data/` |
