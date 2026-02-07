# Test Case: PATCH with Valid Auth Updates Resource and Returns Success

| Attribute | Value |
|-----------|--------|
| **Test Case ID** | API-PATCH-007 |
| **Priority** | High |
| **Type** | REST API, Functional, Security |

## Objective

Verify that a PATCH request with valid authentication updates the resource and returns a success status (200).

## Preconditions

- PATCH endpoint requires authentication.
- Valid credentials or token are available from config/env.
- A resource exists and its ID is available.

## Test Data

- Existing resource ID, valid partial body.
- Valid auth from env/config.

## Steps

1. Obtain valid auth from config/env.
2. Send a PATCH request with valid ID, valid partial body, and valid auth.
3. Capture the response status code and body.
4. Optionally GET the resource and verify updated values.

## Expected Result

- Response status code is **200**.
- Resource is updated as per partial body. No 401 or 403.

## Automation Notes

- Assert on status 200 and on updated field values. Use auth from config; no hardcoded secrets.
