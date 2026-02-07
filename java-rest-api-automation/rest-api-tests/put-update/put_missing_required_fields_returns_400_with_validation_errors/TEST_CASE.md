# Test Case: PUT with Missing Required Fields Returns 400 with Validation Errors

| Attribute | Value |
|-----------|--------|
| **Test Case ID** | API-PUT-005 |
| **Priority** | High |
| **Type** | REST API, Negative |

## Objective

Verify that a PUT request with one or more required fields missing from the body returns HTTP 400 (or 422) and a validation error message, and does not perform a partial update (when API requires full body).

## Preconditions

- PUT endpoint requires a full body with all required fields (per API contract).
- Validation returns 4xx with error details when required fields are missing.

## Test Data

- Existing resource ID.
- Incomplete body: one or more required fields omitted.

## Steps

1. Send a PUT request with an existing ID and a body that omits at least one required field.
2. Capture the response status code and body.
3. Verify the error indicates validation failure (and optionally the missing field).

## Expected Result

- Response status code is **400** (or 422).
- Response body contains validation error message or codes. Resource is not updated (or only when API allows partial updates; then adjust test scope).

## Automation Notes

- Assert on status and error body. Use constants for field names. If API allows PATCH-style partial PUT, document and possibly skip this test.
