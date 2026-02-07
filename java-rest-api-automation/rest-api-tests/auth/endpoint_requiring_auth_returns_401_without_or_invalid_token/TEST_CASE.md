# Test Case: Endpoint Requiring Auth Returns 401 Without or With Invalid Token

| Attribute | Value |
|-----------|--------|
| **Test Case ID** | API-AUTH-001 |
| **Priority** | High |
| **Type** | REST API, Security |

## Objective

Verify that an endpoint that requires authentication returns HTTP 401 Unauthorized when the request is sent without an auth token or with an invalid/ malformed token (e.g. wrong format, random string).

## Preconditions

- At least one protected endpoint is configured (e.g. GET list or GET by ID that requires Bearer token).
- Base URL and endpoint are configured.

## Test Data

- No Authorization header, or `Authorization: Bearer invalid_token_12345`.
- Any valid path and method for the endpoint (e.g. GET).

## Steps

1. Send a request to the protected endpoint without an Authorization header; capture status code.
2. (Optional) Send another request with an invalid token (e.g. `Bearer invalid`); capture status code.
3. Verify both (or the one executed) return 401.

## Expected Result

- Response status code is **401 Unauthorized** when no token or invalid token is sent.
- No resource data is returned. Body may contain an error message.

## Automation Notes

- Assert on status 401. Use one or two variants (no header, invalid token). Skip or tag when endpoint is not protected. Part of optional auth test set.
