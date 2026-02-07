# Test Case: GET Resource by Invalid ID Format Returns 400 or 404

| Attribute | Value |
|-----------|--------|
| **Test Case ID** | API-GET-SINGLE-004 |
| **Priority** | Medium |
| **Type** | REST API, Negative |

## Objective

Verify that when the resource ID in the path is in an invalid format (e.g. string "abc" when numeric ID is expected, or invalid UUID), the API returns a client error (400 Bad Request or 404 Not Found) and does not return a resource.

## Preconditions

- Resource-by-ID endpoint expects a specific ID format (e.g. numeric, UUID).
- Base URL and endpoint are configured.

## Test Data

- Invalid ID format: e.g. `invalid`, `abc`, empty segment, or malformed UUID, as applicable to the API.

## Steps

1. Send a GET request to the resource-by-ID endpoint with an invalid ID format in the path (e.g. `GET /resources/abc` when ID must be numeric).
2. Capture the response status code and body.
3. Do not send a valid ID.

## Expected Result

- Response status code is **400** or **404** (or another 4xx defined in the API contract for invalid input).
- No successful resource body is returned. Response may include a validation or "not found" message.

## Automation Notes

- Assert on status 400 or 404. Use a constant for the invalid ID value. Adapt to API behaviour (some APIs return 404 for any non-matching path value).
