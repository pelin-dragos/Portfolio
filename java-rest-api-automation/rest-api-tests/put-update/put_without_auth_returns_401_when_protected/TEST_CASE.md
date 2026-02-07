# Test Case: PUT Without Auth Returns 401 When Endpoint Is Protected

| Attribute | Value |
|-----------|--------|
| **Test Case ID** | API-PUT-007 |
| **Priority** | High |
| **Type** | REST API, Security / Negative |

## Objective

Verify that a PUT request without valid authentication returns HTTP 401 Unauthorized and the resource is not updated.

## Preconditions

- Update endpoint requires authentication.
- A resource exists; valid update body is used. Only auth is omitted or invalid.

## Test Data

- Existing resource ID, valid update body.
- No auth header or invalid token.

## Steps

1. Send a PUT request with valid ID and valid body but without valid auth (omit or use invalid token).
2. Capture the response status code and body.

## Expected Result

- Response status code is **401 Unauthorized**.
- Resource is not updated. If endpoint is public, mark test as N/A.

## Automation Notes

- Assert on status 401. Skip or tag when endpoint is not protected.
