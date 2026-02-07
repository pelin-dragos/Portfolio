# Test Case: Response Does Not Expose Sensitive Headers

| Attribute | Value |
|-----------|--------|
| **Test Case ID** | API-HEADERS-003 |
| **Priority** | Low |
| **Type** | REST API, Security |

## Objective

Verify that the API response does not expose sensitive or unnecessary headers (e.g. server version, internal framework, or debug headers) that could aid attackers or leak implementation details. If the API is configured to strip such headers, the test asserts they are absent.

## Preconditions

- API is configured (or expected) to not expose certain headers (e.g. `X-Powered-By`, `Server` with version, custom debug headers).
- Base URL and at least one endpoint are available.
- Expected behaviour is documented (which headers must be absent or sanitized).

## Test Data

- List of headers that must not be present (e.g. `X-Powered-By`, `Server` if it exposes version), or that must have sanitized values.
- Any successful request to get a response.

## Steps

1. Send a request to an endpoint that returns a response (e.g. GET list).
2. Capture all response headers.
3. Verify that no sensitive or blacklisted header is present (or that its value does not expose version/details per policy).

## Expected Result

- Sensitive headers (as per project policy) are absent or do not contain sensitive values (e.g. no server version in `Server`).
- Test passes when none of the blacklisted headers are present or when they are sanitized. If policy allows certain headers, document and assert accordingly.

## Automation Notes

- Assert on absence of configured headers (e.g. header list in config). If API always exposes some headers, mark test as documenting current behaviour or adjust policy. Optional test; may be N/A if no header policy is defined.
