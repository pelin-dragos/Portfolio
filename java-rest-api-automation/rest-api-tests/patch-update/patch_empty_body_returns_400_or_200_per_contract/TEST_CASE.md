# Test Case: PATCH with Empty Body Returns 400 or 200 Per API Contract

| Attribute | Value |
|-----------|--------|
| **Test Case ID** | API-PATCH-005 |
| **Priority** | Low |
| **Type** | REST API, Negative / Boundary |

## Objective

Verify that a PATCH request with an empty body `{}` is handled according to the API contract: either returns 400 (nothing to update) or 200 with no change to the resource.

## Preconditions

- PATCH endpoint is configured.
- A resource exists and its ID is available.
- API contract defines behaviour for empty PATCH body.

## Test Data

- Existing resource ID.
- Empty JSON body: `{}`.

## Steps

1. Send a PATCH request with existing ID and body `{}`.
2. Capture the response status code and body.
3. Optionally GET the resource and verify no fields changed.

## Expected Result

- Response status code is **400** (bad request / nothing to update) or **200** (no-op success), as per API contract.
- If 200, resource is unchanged. No 500 or unexpected behaviour.

## Automation Notes

- Assert on status 400 or 200. Document expected behaviour. If API returns 200, assert resource unchanged.

---

## Traceability (automation)

| Item | Location |
|------|----------|
| **Test Case ID** | API-PATCH-005 |
| **Automated test (source)** | `PatchEmptyBodyReturns400Or200PerContractTest.java` (same folder) |
| **Project path** | `java-rest-api-automation/rest-api-tests/patch-update/patch_empty_body_returns_400_or_200_per_contract/` |
