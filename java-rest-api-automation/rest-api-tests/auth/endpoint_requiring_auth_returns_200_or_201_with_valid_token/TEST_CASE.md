# Test Case: Endpoint Requiring Auth Returns 200 or 201 With Valid Token

| Attribute | Value |
|-----------|--------|
| **Test Case ID** | API-AUTH-002 |
| **Priority** | High |
| **Type** | REST API, Security, Functional |

## Objective

Verify that an endpoint that requires authentication returns a success status (200 or 201) and the expected data when the request includes a valid authentication token (or credentials).

## Preconditions

- Endpoint requires authentication.
- Valid token or credentials are available from test config/environment (never hardcoded).
- Base URL and endpoint are configured.

## Test Data

- Valid auth token (from env/config).
- Request appropriate for the endpoint (e.g. GET for list, or POST body for create).

## Steps

1. Obtain valid auth from config/env (e.g. login or use pre-configured token).
2. Send a request to the protected endpoint with the valid auth header.
3. Capture the response status code and body.
4. Verify success status and that data is returned as expected.

## Expected Result

- Response status code is **200** or **201** (as appropriate for the operation).
- Response body contains the expected data (e.g. list or created resource). No 401 or 403.

## Automation Notes

- Assert on status and optionally on response body. Use auth from config only. Part of optional auth set.

---

## Traceability (automation)

| Item | Location |
|------|----------|
| **Test Case ID** | API-AUTH-002 |
| **Automated test (source)** | `EndpointRequiringAuthReturns200Or201WithValidTokenTest.java` (same folder) |
| **Project path** | `java-rest-api-automation/rest-api-tests/auth/endpoint_requiring_auth_returns_200_or_201_with_valid_token/` |
