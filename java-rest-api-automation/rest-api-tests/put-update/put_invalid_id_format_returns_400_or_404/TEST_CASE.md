# Test Case: PUT with Invalid ID Format Returns 400 or 404

| Attribute | Value |
|-----------|--------|
| **Test Case ID** | API-PUT-004 |
| **Priority** | Medium |
| **Type** | REST API, Negative |

## Objective

Verify that a PUT request with an invalid ID format in the path (e.g. non-numeric when numeric expected) returns HTTP 400 or 404 and does not update any resource.

## Preconditions

- Update endpoint expects a specific ID format (e.g. numeric, UUID).
- Base URL and endpoint are configured.

## Test Data

- Invalid ID format: e.g. `abc`, `invalid`, or malformed UUID.
- Valid request body.

## Steps

1. Send a PUT request to the update endpoint with an invalid ID in the path and a valid body.
2. Capture the response status code and body.

## Expected Result

- Response status code is **400** or **404** (per API contract).
- No resource is updated.

## Automation Notes

- Assert on status 400 or 404. Use a constant for the invalid ID.
