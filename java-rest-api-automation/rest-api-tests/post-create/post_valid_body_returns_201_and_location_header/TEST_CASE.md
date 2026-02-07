# Test Case: POST with Valid Body Returns 201 and Location Header

| Attribute | Value |
|-----------|--------|
| **Test Case ID** | API-POST-001 |
| **Priority** | High |
| **Type** | REST API, Functional |

## Objective

Verify that a POST request with a valid request body to the create endpoint returns HTTP 201 Created and, when supported, a `Location` header pointing to the created resource.

## Preconditions

- Create endpoint (POST) is configured and accepts JSON (or documented format).
- Request body conforms to API contract (all required fields, valid formats).
- Base URL and endpoint are configured.

## Test Data

- Valid request body (from test data file or builder) with all required fields and valid values.
- Content-Type: `application/json`.

## Steps

1. Build or load a valid request body for resource creation.
2. Send a POST request to the create endpoint with the body and `Content-Type: application/json`.
3. Capture the response status code, headers, and body.
4. If API supports it, verify the `Location` header is present and contains a URL (e.g. to the new resource).

## Expected Result

- Response status code is **201 Created** (or 200 if that is the API contract).
- When supported, response includes a `Location` header with a valid URI for the created resource.
- Response body may contain the created resource or a subset; test may optionally assert on body.

## Automation Notes

- Assert on status 201 (or 200 per contract) and on presence and format of `Location` header. Use request body from test data or builder; no hardcoded production data.
