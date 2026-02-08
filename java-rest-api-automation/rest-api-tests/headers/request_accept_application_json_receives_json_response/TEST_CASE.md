# Test Case: Request with Accept application/json Receives JSON Response

| Attribute | Value |
|-----------|--------|
| **Test Case ID** | API-HEADERS-001 |
| **Priority** | Medium |
| **Type** | REST API, Functional |

## Objective

Verify that when a request includes the header `Accept: application/json`, the API responds with a JSON body (and typically `Content-Type: application/json` in the response) when the endpoint supports JSON.

## Preconditions

- Target endpoint returns a response body (e.g. GET list or GET by ID).
- API supports JSON representation for that resource.
- Base URL and endpoint are configured.

## Test Data

- Header: `Accept: application/json`.
- Any valid request (e.g. GET list or GET by ID) that returns data.

## Steps

1. Send a request (e.g. GET) to an endpoint that returns a body, with header `Accept: application/json`.
2. Capture the response status code, Content-Type header, and body.
3. Parse the response body as JSON and verify it is valid.

## Expected Result

- Response is successful (e.g. 200).
- Response header `Content-Type` includes `application/json` (or equivalent, e.g. `application/json; charset=utf-8`).
- Response body is valid JSON (parseable, no syntax error).

## Automation Notes

- Assert on Content-Type and on successful JSON parsing. Use RestAssured content-type and body parsing. Skip for endpoints that do not return JSON.

---

## Traceability (automation)

| Item | Location |
|------|----------|
| **Test Case ID** | API-HEADERS-001 |
| **Automated test (source)** | `RequestAcceptApplicationJsonReceivesJsonResponseTest.java` (same folder) |
| **Project path** | `java-rest-api-automation/rest-api-tests/headers/request_accept_application_json_receives_json_response/` |
