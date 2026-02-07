# Test Case: PATCH with Valid Partial Body and Existing ID Returns 200 and Updated Resource

| Attribute | Value |
|-----------|--------|
| **Test Case ID** | API-PATCH-001 |
| **Priority** | High |
| **Type** | REST API, Functional |

## Objective

Verify that a PATCH request with a valid partial body and an existing resource ID returns HTTP 200 and that only the sent fields are updated while the resource remains consistent.

## Preconditions

- PATCH endpoint is configured (e.g. `PATCH /resources/{id}`).
- A resource exists and its ID is available.
- Request body contains only a subset of fields (partial update).

## Test Data

- Existing resource ID.
- Partial body: e.g. `{ "title": "New Title" }` (one or more fields, not full resource).

## Steps

1. Ensure a resource exists; note current values for fields not being updated.
2. Send a PATCH request with the resource ID and a partial body (only fields to update).
3. Capture the response status code and body.
4. Verify the response (or GET) shows updated values for sent fields.

## Expected Result

- Response status code is **200**.
- Response body reflects the resource with the patched fields updated. Other fields remain unchanged (or as per API contract).

## Automation Notes

- Assert on status 200 and on updated field values. Use partial body from test data; avoid full resource if PATCH is partial-only.
