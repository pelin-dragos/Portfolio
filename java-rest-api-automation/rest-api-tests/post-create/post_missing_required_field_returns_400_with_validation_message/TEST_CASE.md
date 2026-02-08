# Test Case: POST with Missing Required Field Returns 400 with Validation Error Message

| Attribute | Value |
|-----------|--------|
| **Test Case ID** | API-POST-003 |
| **Priority** | High |
| **Type** | REST API, Negative |

## Objective

Verify that a POST request with one or more required fields missing returns HTTP 400 Bad Request and a validation error message (or error code) indicating the missing or invalid data.

## Preconditions

- Create endpoint validates required fields and returns 4xx with a body when validation fails.
- API contract defines at least one required field (e.g. title, name, email).

## Test Data

- Request body with one required field omitted (e.g. omit `title`). Other required fields present and valid.
- Expected: 400 and error message/code referencing the missing field or "validation failed".

## Steps

1. Build a request body that omits one required field (e.g. missing `title`).
2. Send a POST request to the create endpoint with this body.
3. Capture the response status code and body.
4. Verify the error message or error structure references validation (and optionally the field name).

## Expected Result

- Response status code is **400** (or 422 if used for validation).
- Response body contains an error message or validation details (e.g. "title is required", "Validation failed").
- No resource is created (no 201 and no new ID returned).

## Automation Notes

- Assert on status 400 (or 422) and on presence of error message/code in body. Use a single missing field to keep the test focused; use constants for field names.

---

## Traceability (automation)

| Item | Location |
|------|----------|
| **Test Case ID** | API-POST-003 |
| **Automated test (source)** | `PostMissingRequiredFieldReturns400WithValidationMessageTest.java` (same folder) |
| **Project path** | `java-rest-api-automation/rest-api-tests/post-create/post_missing_required_field_returns_400_with_validation_message/` |
