# Test Case: Expired Token Returns 401 With Appropriate Message

| Attribute | Value |
|-----------|--------|
| **Test Case ID** | API-AUTH-004 |
| **Priority** | Medium |
| **Type** | REST API, Security |

## Objective

Verify that when a request is sent with an expired authentication token, the API returns HTTP 401 Unauthorized and optionally an error message or code indicating token expiry (when the API supports it).

## Preconditions

- Endpoint requires authentication (e.g. Bearer token).
- An expired token can be obtained (e.g. from test fixture, or short-lived token that is allowed to expire, or mock). If expiry cannot be simulated, test may be N/A.
- API returns 401 for expired token and may include a message/code (e.g. "Token expired").

## Test Data

- Expired token (pre-generated or from fixture that waits for expiry).
- Request to any protected endpoint.

## Steps

1. Obtain an expired token (per environment capability).
2. Send a request to a protected endpoint with the expired token in the Authorization header.
3. Capture the response status code and body.
4. Optionally verify the error message or code indicates expiry.

## Expected Result

- Response status code is **401 Unauthorized**.
- Response body may contain a message or code indicating token expired or invalid. No protected data is returned. If API does not distinguish expiry, generic "Unauthorized" is acceptable.

## Automation Notes

- Assert on status 401. Optionally assert on body containing "expired" or similar. Skip or tag when expired token cannot be produced in test env. Part of optional auth set.

---

## Traceability (automation)

| Item | Location |
|------|----------|
| **Test Case ID** | API-AUTH-004 |
| **Automated test (source)** | `ExpiredTokenReturns401WithAppropriateMessageTest.java` (same folder) |
| **Project path** | `java-rest-api-automation/rest-api-tests/auth/expired_token_returns_401_with_appropriate_message/` |
