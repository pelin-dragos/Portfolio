# Test Case: Endpoint Requiring Role Returns 403 With Insufficient Permissions

| Attribute | Value |
|-----------|--------|
| **Test Case ID** | API-AUTH-003 |
| **Priority** | Medium |
| **Type** | REST API, Security |

## Objective

Verify that when an endpoint requires a specific role or permission, a request with a valid token that does not have that role/permission returns HTTP 403 Forbidden (and does not return the protected data).

## Preconditions

- Endpoint requires a role or permission (e.g. admin-only).
- Test has access to a token with lower privileges (e.g. user role) that is valid but insufficient for this endpoint.
- Base URL and endpoint are configured.

## Test Data

- Valid token with insufficient permissions (e.g. user token for admin endpoint).
- Request to the protected endpoint (e.g. GET or DELETE admin resource).

## Steps

1. Obtain a valid token that does not have the required role (e.g. user token).
2. Send a request to the endpoint that requires higher privileges (e.g. admin).
3. Capture the response status code and body.

## Expected Result

- Response status code is **403 Forbidden**.
- No protected data is returned. Body may contain an error message. If API does not use roles, mark test as N/A.

## Automation Notes

- Assert on status 403. Use token from config (e.g. user token). Skip or tag when endpoint does not enforce role-based access. Part of optional auth set.

---

## Traceability (automation)

| Item | Location |
|------|----------|
| **Test Case ID** | API-AUTH-003 |
| **Automated test (source)** | `EndpointRequiringRoleReturns403WithInsufficientPermissionsTest.java` (same folder) |
| **Project path** | `java-rest-api-automation/rest-api-tests/auth/endpoint_requiring_role_returns_403_with_insufficient_permissions/` |
