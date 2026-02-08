# Test Case: GET Resource by ID Without Auth Returns 401 When Endpoint Is Protected

| Attribute | Value |
|-----------|--------|
| **Test Case ID** | API-GET-SINGLE-005 |
| **Priority** | High |
| **Type** | REST API, Security / Negative |

## Objective

Verify that when the resource-by-ID endpoint requires authentication, a GET request without valid credentials returns HTTP 401 Unauthorized.

## Preconditions

- Resource-by-ID endpoint is protected (requires auth).
- Base URL and endpoint are configured.
- A valid resource ID is available; the test focuses on auth, not on existence of the resource.

## Test Data

- Valid resource ID (existing).
- No auth header, or invalid/expired token.

## Steps

1. Send a GET request to the resource-by-ID endpoint with a valid ID in the path but without a valid auth header (omit or use invalid token).
2. Capture the response status code and body.

## Expected Result

- Response status code is **401 Unauthorized**.
- No resource data is returned. Body may contain an error message. If endpoint is public, mark test as N/A or skip.

## Automation Notes

- Assert on status 401. Use auth from config; do not hardcode tokens. Skip or tag test when endpoint is not protected.

---

## Traceability (automation)

| Item | Location |
|------|----------|
| **Test Case ID** | API-GET-SINGLE-005 |
| **Automated test (source)** | `GetByIdWithoutAuthReturns401WhenProtectedTest.java` (same folder) |
| **Project path** | `java-rest-api-automation/rest-api-tests/get-single/get_by_id_without_auth_returns_401_when_protected/` |
