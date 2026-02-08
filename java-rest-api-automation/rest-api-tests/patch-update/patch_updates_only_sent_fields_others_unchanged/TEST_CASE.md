# Test Case: PATCH Updates Only Sent Fields; Others Unchanged

| Attribute | Value |
|-----------|--------|
| **Test Case ID** | API-PATCH-002 |
| **Priority** | High |
| **Type** | REST API, Functional |

## Objective

Verify that after a PATCH request, only the fields included in the request body are updated; all other fields retain their previous values (or server defaults per contract).

## Preconditions

- PATCH endpoint supports partial update and does not require a full body.
- A resource exists with known values for multiple fields.
- Test sends only one or two fields in the PATCH body.

## Test Data

- Existing resource with known `title`, `body`, `status` (or equivalent).
- Partial body: e.g. only `{ "status": "completed" }`.

## Steps

1. Create or obtain a resource with known values; record initial values for fields not in PATCH body.
2. Send a PATCH request with only the field(s) to update (e.g. `status`).
3. GET the resource (or use PATCH response) and verify: updated field has new value; other fields unchanged.

## Expected Result

- Patched field(s) have the new value(s).
- All other fields are unchanged from their pre-PATCH values (no overwrite with null or default unless contract says so).

## Automation Notes

- Assert on both updated and non-updated fields. Use test data for before/after values. Document API behaviour if PATCH sends null to clear fields.

---

## Traceability (automation)

| Item | Location |
|------|----------|
| **Test Case ID** | API-PATCH-002 |
| **Automated test (source)** | `PatchUpdatesOnlySentFieldsOthersUnchangedTest.java` (same folder) |
| **Project path** | `java-rest-api-automation/rest-api-tests/patch-update/patch_updates_only_sent_fields_others_unchanged/` |
