# Test Case: POST Without Auth Returns 401 When Endpoint Is Protected

| Attribute | Value |
|-----------|--------|
| **Test Case ID** | API-POST-007 |
| **Priority** | High |
| **Type** | REST API, Security / Negative |

## Objective

Verify that a POST request to the create endpoint without valid authentication returns HTTP 401 Unauthorized and no resource is created.

## Preconditions

- Create endpoint requires authentication.
- Base URL and endpoint are configured.
- Request body is valid; the only missing part is auth.

## Test Data

- Valid request body (all required fields).
- No Authorization header, or invalid/expired token.

## Steps

1. Build a valid request body for creation.
2. Send a POST request without a valid auth header (omit or use invalid token).
3. Capture the response status code and body.

## Expected Result

- Response status code is **401 Unauthorized**.
- No resource is created. Body may contain an error message. If endpoint is public, mark test as N/A.

## Automation Notes

- Assert on status 401. Do not send valid credentials. Skip or tag when endpoint is not protected.

---

## Traceability (automation)

| Item | Location |
|------|----------|
| **Test Case ID** | API-POST-007 |
| **Automated test (source)** | `PostWithoutAuthReturns401WhenProtectedTest.java` (same folder) |
| **Project path** | `java-rest-api-automation/rest-api-tests/post-create/post_without_auth_returns_401_when_protected/` |
