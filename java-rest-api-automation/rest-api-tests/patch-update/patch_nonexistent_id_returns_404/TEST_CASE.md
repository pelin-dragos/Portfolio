# Test Case: PATCH with Non-Existent ID Returns 404

| Attribute | Value |
|-----------|--------|
| **Test Case ID** | API-PATCH-003 |
| **Priority** | High |
| **Type** | REST API, Negative |

## Objective

Verify that a PATCH request with a non-existent resource ID returns HTTP 404 Not Found and does not create or update any resource.

## Preconditions

- PATCH endpoint is configured.
- The ID used does not exist (e.g. high number or deleted resource).
- Request body is valid (partial or full as per API).

## Test Data

- Non-existent resource ID.
- Valid partial body.

## Steps

1. Choose a non-existent resource ID.
2. Send a PATCH request with that ID and a valid partial body.
3. Capture the response status code and body.

## Expected Result

- Response status code is **404 Not Found**.
- No resource is created or updated. Body may contain an error message.

## Automation Notes

- Assert on status 404. Use a stable non-existent ID constant.

---

## Traceability (automation)

| Item | Location |
|------|----------|
| **Test Case ID** | API-PATCH-003 |
| **Automated test (source)** | `PatchNonexistentIdReturns404Test.java` (same folder) |
| **Project path** | `java-rest-api-automation/rest-api-tests/patch-update/patch_nonexistent_id_returns_404/` |
