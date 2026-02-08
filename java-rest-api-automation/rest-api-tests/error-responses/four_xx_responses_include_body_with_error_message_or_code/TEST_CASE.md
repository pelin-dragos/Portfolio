# Test Case: 4xx Responses Include Body with Error Message or Code

| Attribute | Value |
|-----------|--------|
| **Test Case ID** | API-ERROR-001 |
| **Priority** | Medium |
| **Type** | REST API, Functional |

## Objective

Verify that when the API returns a 4xx client error (e.g. 400, 401, 404, 422), the response includes a body with an error message or error code (when the API contract supports it), so that clients can display or log a meaningful reason for the failure.

## Preconditions

- API returns 4xx for at least one scenario (e.g. validation failure, not found, unauthorized).
- API contract states that 4xx responses may or shall include a body with message/code.

## Test Data

- A request that triggers a 4xx (e.g. GET with non-existent ID for 404, or POST with invalid body for 400).
- Expected: response body is non-empty and contains at least a message or code field.

## Steps

1. Send a request that is expected to return a 4xx (e.g. invalid input, missing auth, or non-existent resource).
2. Capture the response status code and body.
3. Verify the response body is present (not empty) and contains at least one of: error message, error code, or structured error object.

## Expected Result

- Response status is 4xx.
- Response body is present and parseable (e.g. JSON).
- Body contains an error message and/or error code (field names per API contract). If API returns empty body for some 4xx, document and optionally skip or assert only when body is non-empty.

## Automation Notes

- Assert on status 4xx and on body presence and content (e.g. `error`, `message`, or `code`). Use one representative 4xx scenario (e.g. 404 or 400). Adapt to API contract.

---

## Traceability (automation)

| Item | Location |
|------|----------|
| **Test Case ID** | API-ERROR-001 |
| **Automated test (source)** | `FourXxResponsesIncludeBodyWithErrorMessageOrCodeTest.java` (same folder) |
| **Project path** | `java-rest-api-automation/rest-api-tests/error-responses/four_xx_responses_include_body_with_error_message_or_code/` |
