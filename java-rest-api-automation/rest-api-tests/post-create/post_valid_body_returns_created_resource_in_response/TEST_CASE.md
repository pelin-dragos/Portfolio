# Test Case: POST with Valid Body Returns Response Containing Created Resource

| Attribute | Value |
|-----------|--------|
| **Test Case ID** | API-POST-002 |
| **Priority** | High |
| **Type** | REST API, Functional |

## Objective

Verify that the POST create response body contains the created resource (e.g. assigned ID and submitted or computed fields) so that the client can use the response without a follow-up GET.

## Preconditions

- Create endpoint returns 201 (or 200) for valid payload (as per API-POST-001).
- API returns the created resource in the response body (full or partial per contract).

## Test Data

- Valid request body with known field values (e.g. title, body) for comparison.

## Steps

1. Send a POST request with a valid body to the create endpoint.
2. Capture the response body.
3. Verify the response contains at least an identifier (e.g. `id`) and that key submitted fields match (e.g. title, body) or that server-generated fields are present as per contract.

## Expected Result

- Response status code is **201** (or 200).
- Response body includes the created resource: at minimum an `id` (or equivalent) and the key fields sent or derived.
- Submitted values are reflected in the response (or documented server logic applies).

## Automation Notes

- Assert on status and on body: presence of `id`, and equality or presence of key fields. Use RestAssured body path or DTO.

---

## Traceability (automation)

| Item | Location |
|------|----------|
| **Test Case ID** | API-POST-002 |
| **Automated test (source)** | `PostValidBodyReturnsCreatedResourceInResponseTest.java` (same folder) |
| **Project path** | `java-rest-api-automation/rest-api-tests/post-create/post_valid_body_returns_created_resource_in_response/` |
