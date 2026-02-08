# Test Case: PUT Response Body Contains Updated Fields and Values

| Attribute | Value |
|-----------|--------|
| **Test Case ID** | API-PUT-002 |
| **Priority** | High |
| **Type** | REST API, Functional |

## Objective

Verify that the PUT update response body (when returned) contains the updated fields and values as sent in the request (or as derived by the server per contract).

## Preconditions

- PUT endpoint returns 200 with a body (or 204 and test uses GET to verify).
- A resource exists and its ID is available.
- Known update values are sent (e.g. new title, new status).

## Test Data

- Existing resource ID.
- Update body with known values (e.g. `title: "Updated Title"`).

## Steps

1. Send a PUT request with valid body and existing ID.
2. Capture the response body (or perform GET by ID if PUT returns 204).
3. Verify that the returned (or retrieved) resource contains the updated field values.

## Expected Result

- Response (or subsequent GET) contains the resource with updated values matching the request (or server rules).
- No stale or pre-update values for the updated fields.

## Automation Notes

- Assert on key updated fields (e.g. title, status) using RestAssured path or DTO. Use test data for expected values.

---

## Traceability (automation)

| Item | Location |
|------|----------|
| **Test Case ID** | API-PUT-002 |
| **Automated test (source)** | `PutResponseContainsUpdatedFieldsAndValuesTest.java` (same folder) |
| **Project path** | `java-rest-api-automation/rest-api-tests/put-update/put_response_contains_updated_fields_and_values/` |
