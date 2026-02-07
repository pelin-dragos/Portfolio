# Test Case: Response Includes Content-Type application/json

| Attribute | Value |
|-----------|--------|
| **Test Case ID** | API-HEADERS-002 |
| **Priority** | Medium |
| **Type** | REST API, Functional |

## Objective

Verify that for endpoints that return a JSON body, the response includes a `Content-Type` header set to `application/json` (or with charset, e.g. `application/json; charset=utf-8`), so that clients can interpret the response correctly.

## Preconditions

- At least one endpoint that returns a body (e.g. GET list, GET by ID, POST response) is configured.
- API returns JSON for that endpoint.

## Test Data

- Endpoint that returns JSON (e.g. GET list or GET by ID with valid ID).

## Steps

1. Send a request to an endpoint that returns a JSON body.
2. Capture the response headers.
3. Verify the `Content-Type` header is present and indicates JSON.

## Expected Result

- Response includes a `Content-Type` header.
- Value contains `application/json` (exact or as part of the value, e.g. with charset).

## Automation Notes

- Assert on response header `Content-Type` containing "application/json". Use RestAssured header extraction. Can be combined with a single success request (e.g. GET list).
