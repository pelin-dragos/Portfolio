# Test Case: PUT with Valid Body and Existing ID Returns 200 and Updated Resource

| Attribute | Value |
|-----------|--------|
| **Test Case ID** | API-PUT-001 |
| **Priority** | High |
| **Type** | REST API, Functional |

## Objective

Verify that a PUT request with a valid full body and an existing resource ID returns HTTP 200 (or 204 per contract) and that the resource is updated as specified.

## Preconditions

- Update endpoint (PUT) is configured (e.g. `PUT /resources/{id}`).
- A resource exists (created in setup or from test data) and its ID is known.
- Request body contains all required fields and valid values for a full update.

## Test Data

- Existing resource ID.
- Valid full update body (all required and optionally optional fields).

## Steps

1. Ensure a resource exists; obtain its ID.
2. Build a valid full update request body.
3. Send a PUT request to the resource-by-ID endpoint with that ID and the body.
4. Capture the response status code and body.
5. Optionally GET the resource and verify updated values.

## Expected Result

- Response status code is **200** (or 204 if no body).
- If response includes a body, it reflects the updated resource. Subsequent GET returns the same updated data.

## Automation Notes

- Assert on status 200 (or 204) and on response body when present. Use ID and body from test data or setup; teardown if resource must be removed.

---

## Traceability (automation)

| Item | Location |
|------|----------|
| **Test Case ID** | API-PUT-001 |
| **Automated test (source)** | `PutValidBodyExistingIdReturns200AndUpdatedResourceTest.java` (same folder) |
| **Project path** | `java-rest-api-automation/rest-api-tests/put-update/put_valid_body_existing_id_returns_200_and_updated_resource/` |
