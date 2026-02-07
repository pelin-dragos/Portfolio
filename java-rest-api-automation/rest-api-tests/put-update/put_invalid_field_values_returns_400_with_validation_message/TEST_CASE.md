# Test Case: PUT with Invalid Field Values Returns 400 with Validation Message

| Attribute | Value |
|-----------|--------|
| **Test Case ID** | API-PUT-006 |
| **Priority** | High |
| **Type** | REST API, Negative |

## Objective

Verify that a PUT request with invalid field values (e.g. wrong type, invalid format, out-of-range) returns HTTP 400 and a validation message, and does not update the resource.

## Preconditions

- PUT endpoint validates field formats and constraints.
- A resource exists and its ID is available.

## Test Data

- Existing resource ID.
- Body with one invalid value: e.g. invalid email, invalid enum, or string exceeding max length.

## Steps

1. Send a PUT request with existing ID and a body containing at least one invalid field value.
2. Capture the response status code and body.
3. Verify the response indicates validation failure.

## Expected Result

- Response status code is **400** (or 422).
- Response body contains a validation error. Resource remains unchanged (or only valid fields updated if API allows partial validation).

## Automation Notes

- Assert on status and error body. One invalid field per test. Use constants for invalid values.
