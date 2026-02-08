# Test Case: PATCH Without Auth Returns 401 When Endpoint Is Protected

| Attribute | Value |
|-----------|--------|
| **Test Case ID** | API-PATCH-006 |
| **Priority** | High |
| **Type** | REST API, Security / Negative |

## Objective

Verify that a PATCH request without valid authentication returns HTTP 401 Unauthorized and the resource is not updated.

## Preconditions

- PATCH endpoint requires authentication.
- A resource exists; valid partial body is used. Only auth is omitted or invalid.

## Test Data

- Existing resource ID, valid partial body.
- No auth header or invalid token.

## Steps

1. Send a PATCH request with valid ID and valid partial body but without valid auth.
2. Capture the response status code and body.

## Expected Result

- Response status code is **401 Unauthorized**.
- Resource is not updated. If endpoint is public, mark test as N/A.

## Automation Notes

- Assert on status 401. Skip or tag when endpoint is not protected.

---

## Traceability (automation)

| Item | Location |
|------|----------|
| **Test Case ID** | API-PATCH-006 |
| **Automated test (source)** | `PatchWithoutAuthReturns401WhenProtectedTest.java` (same folder) |
| **Project path** | `java-rest-api-automation/rest-api-tests/patch-update/patch_without_auth_returns_401_when_protected/` |
