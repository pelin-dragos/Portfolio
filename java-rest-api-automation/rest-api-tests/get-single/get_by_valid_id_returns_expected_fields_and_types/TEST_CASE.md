# Test Case: GET Resource by Valid ID Returns Response with Expected Fields and Types

| Attribute | Value |
|-----------|--------|
| **Test Case ID** | API-GET-SINGLE-002 |
| **Priority** | High |
| **Type** | REST API, Functional |

## Objective

Verify that the GET resource-by-ID response contains the expected fields and that their types conform to the API contract (e.g. string, number, boolean, nested object).

## Preconditions

- Resource-by-ID endpoint returns 200 for a valid ID (as per API-GET-SINGLE-001).
- API contract or schema defines required fields and types for the resource.
- A valid resource ID is available for the request.

## Test Data

- Valid resource ID.
- Expected fields and types per API contract (e.g. `id` (number), `title` (string), `completed` (boolean)).

## Steps

1. Send a GET request to the resource-by-ID endpoint with a valid ID.
2. Capture the response body.
3. For each required field (and optionally key optional fields), verify presence and type (e.g. string, number, boolean, array, object).
4. Optionally validate against a JSON schema if available.

## Expected Result

- Response status code is **200**.
- All required fields are present in the response body.
- Field types match the contract (e.g. no string where number is expected).
- Test passes when all asserted fields exist and have the correct type.

## Automation Notes

- Use RestAssured matchers or JSON path to assert on field presence and type. Consider a shared schema or DTO for reuse.
- Document expected fields in test data or constants; avoid scattering magic strings.

---

## Traceability (automation)

| Item | Location |
|------|----------|
| **Test Case ID** | API-GET-SINGLE-002 |
| **Automated test (source)** | `GetByValidIdReturnsExpectedFieldsAndTypesTest.java` (same folder) |
| **Project path** | `java-rest-api-automation/rest-api-tests/get-single/get_by_valid_id_returns_expected_fields_and_types/` |
