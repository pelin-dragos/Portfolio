# Test Case: PATCH with Invalid Field Value Returns 400 with Validation Message

| Attribute | Value |
|-----------|--------|
| **Test Case ID** | API-PATCH-004 |
| **Priority** | High |
| **Type** | REST API, Negative |

## Objective

Verify that a PATCH request with an invalid value for one of the sent fields (e.g. wrong type, invalid enum) returns HTTP 400 and a validation message, and does not update the resource.

## Preconditions

- PATCH endpoint validates field values.
- A resource exists and its ID is available.

## Test Data

- Existing resource ID.
- Partial body with one invalid value: e.g. `status: "invalid_enum"`, or invalid email format.

## Steps

1. Send a PATCH request with existing ID and a body containing at least one invalid field value.
2. Capture the response status code and body.
3. Verify the response indicates validation failure.

## Expected Result

- Response status code is **400** (or 422).
- Response body contains a validation error. Resource is not updated.

## Automation Notes

- Assert on status and error body. Use constants for invalid values. One invalid field per test.

---

## Traceability (automation)

| Item | Location |
|------|----------|
| **Test Case ID** | API-PATCH-004 |
| **Automated test (source)** | `PatchInvalidFieldValueReturns400WithValidationMessageTest.java` (same folder) |
| **Project path** | `java-rest-api-automation/rest-api-tests/patch-update/patch_invalid_field_value_returns_400_with_validation_message/` |
