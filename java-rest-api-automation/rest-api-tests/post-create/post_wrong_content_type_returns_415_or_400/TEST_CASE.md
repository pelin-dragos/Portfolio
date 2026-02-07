# Test Case: POST with Wrong Content-Type Returns 415 or 400

| Attribute | Value |
|-----------|--------|
| **Test Case ID** | API-POST-006 |
| **Priority** | Medium |
| **Type** | REST API, Negative |

## Objective

Verify that a POST request with an unsupported or wrong Content-Type header (e.g. `text/plain` instead of `application/json`) returns HTTP 415 Unsupported Media Type or 400 Bad Request and does not create a resource.

## Preconditions

- Create endpoint expects `application/json` (or another specific type) and rejects others.
- Base URL and endpoint are configured.

## Test Data

- Valid JSON body (so the only wrong part is the header).
- Header: `Content-Type: text/plain` (or other wrong type).

## Steps

1. Build a valid request body (JSON).
2. Send a POST request with `Content-Type: text/plain` (or another unsupported type) and the JSON body.
3. Capture the response status code and body.

## Expected Result

- Response status code is **415** or **400** (per API behaviour).
- No resource is created. Response may indicate unsupported media type or parsing error.

## Automation Notes

- Assert on status 415 or 400. Use a constant for the wrong Content-Type. Body can be valid JSON; the test targets header handling.
