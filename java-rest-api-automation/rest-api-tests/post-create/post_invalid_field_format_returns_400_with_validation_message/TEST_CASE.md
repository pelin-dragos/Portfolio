# Test Case: POST with Invalid Field Format Returns 400 with Validation Message

| Attribute | Value |
|-----------|--------|
| **Test Case ID** | API-POST-004 |
| **Priority** | High |
| **Type** | REST API, Negative |

## Objective

Verify that a POST request with an invalid format for a field (e.g. invalid email, invalid date, string too long) returns HTTP 400 and a validation error message indicating the format or constraint violation.

## Preconditions

- Create endpoint validates field formats and returns 4xx with a body on validation failure.
- API contract defines format rules (e.g. email format, max length, enum values).

## Test Data

- Request body with one invalid format: e.g. `email: "not-an-email"`, or `status: "invalid_enum"`, or string exceeding max length.
- Other fields valid.

## Steps

1. Build a request body with one field set to an invalid format (per API rules).
2. Send a POST request to the create endpoint.
3. Capture the response status code and body.
4. Verify the response indicates validation failure and optionally references the field or constraint.

## Expected Result

- Response status code is **400** (or 422).
- Response body contains a validation error message or code. No resource is created.

## Automation Notes

- Assert on status and on error body. Use constants for invalid values (e.g. INVALID_EMAIL_FORMAT). One invalid field per test to keep failures clear.
