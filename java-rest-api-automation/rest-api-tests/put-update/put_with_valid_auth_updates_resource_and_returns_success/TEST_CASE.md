# Test Case: PUT with Valid Auth Updates Resource and Returns Success

| Attribute | Value |
|-----------|--------|
| **Test Case ID** | API-PUT-008 |
| **Priority** | High |
| **Type** | REST API, Functional, Security |

## Objective

Verify that a PUT request with valid authentication updates the resource and returns a success status (200 or 204).

## Preconditions

- Update endpoint requires authentication.
- Valid credentials or token are available from config/env.
- A resource exists and its ID is available.

## Test Data

- Existing resource ID, valid full update body.
- Valid auth from env/config.

## Steps

1. Obtain valid auth from config/env.
2. Send a PUT request with valid ID, valid body, and valid auth.
3. Capture the response status code and body.
4. Optionally GET the resource and verify updated values.

## Expected Result

- Response status code is **200** (or 204).
- Resource is updated; response or subsequent GET shows updated data. No 401 or 403.

## Automation Notes

- Assert on status and optionally on response/GET body. Use auth from config; no hardcoded secrets.
