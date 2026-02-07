# Test Case: POST with Valid Auth Creates Resource and Returns Success

| Attribute | Value |
|-----------|--------|
| **Test Case ID** | API-POST-008 |
| **Priority** | High |
| **Type** | REST API, Functional, Security |

## Objective

Verify that a POST request with valid authentication creates the resource and returns a success status (201 or 200) and that the created resource can be retrieved (e.g. via GET by ID).

## Preconditions

- Create endpoint requires authentication.
- Valid credentials or token are available from config/environment.
- Base URL and endpoints (create and get-by-ID) are configured.

## Test Data

- Valid request body for creation.
- Valid auth from env/config.

## Steps

1. Obtain valid auth from config/env.
2. Send a POST request with valid body and valid auth.
3. Capture the response status code and body (and Location header if present).
4. If response indicates success, optionally perform a GET by the returned ID to verify the resource exists and matches.

## Expected Result

- Response status code is **201** (or 200 per contract).
- Response body (and/or Location) identifies the created resource.
- Optional: GET by that ID returns 200 and consistent data. No 401 or 403.

## Automation Notes

- Assert on status and on created resource (id/body). Use auth from config; no hardcoded secrets. Optional GET verification keeps test self-contained and idempotent.
