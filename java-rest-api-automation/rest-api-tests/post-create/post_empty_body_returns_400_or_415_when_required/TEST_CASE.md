# Test Case: POST with Empty Body Returns 400 or 415 When Body Is Required

| Attribute | Value |
|-----------|--------|
| **Test Case ID** | API-POST-005 |
| **Priority** | Medium |
| **Type** | REST API, Negative |

## Objective

Verify that a POST request with an empty body (or no body) to an endpoint that requires a body returns a client error (400 Bad Request or 415 Unsupported Media Type) and does not create a resource.

## Preconditions

- Create endpoint requires a request body (documented).
- Base URL and endpoint are configured.

## Test Data

- Empty body: `{}` or no body; Content-Type may still be `application/json` for empty JSON.

## Steps

1. Send a POST request to the create endpoint with an empty JSON body `{}` (or omit body and set Content-Type if that is the invalid case).
2. Capture the response status code and body.
3. Do not send any required fields.

## Expected Result

- Response status code is **400** or **415** (or another 4xx per API contract).
- No resource is created. Response may indicate missing body or validation failure.

## Automation Notes

- Assert on status 400 or 415. Document which variant the API returns. Use empty body from constant or literal; do not send production data.

---

## Traceability (automation)

| Item | Location |
|------|----------|
| **Test Case ID** | API-POST-005 |
| **Automated test (source)** | `PostEmptyBodyReturns400Or415WhenRequiredTest.java` (same folder) |
| **Project path** | `java-rest-api-automation/rest-api-tests/post-create/post_empty_body_returns_400_or_415_when_required/` |
