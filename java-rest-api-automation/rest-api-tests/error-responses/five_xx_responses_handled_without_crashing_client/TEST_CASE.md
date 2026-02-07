# Test Case: 5xx Responses Handled Without Crashing Client

| Attribute | Value |
|-----------|--------|
| **Test Case ID** | API-ERROR-002 |
| **Priority** | Low |
| **Type** | REST API, Resilience |

## Objective

Verify that when the API returns a 5xx server error (e.g. 500, 502, 503), the test client (RestAssured) handles the response without throwing an unhandled exception or crashing—i.e. the client can read status code and optionally body and log or assert, rather than failing with a connection or parsing crash.

## Preconditions

- Ability to trigger or simulate a 5xx (e.g. mock server, fault injection, or a known failing endpoint). If 5xx cannot be triggered reliably, test may be implemented as a contract or documented as N/A.
- Client code is configured with timeouts and error handling so that 5xx does not cause client crash.

## Test Data

- Request or endpoint that returns 5xx (when available), or use a mock that returns 500.

## Steps

1. Send a request that results in a 5xx response (or use mock).
2. Capture the response status code and optionally body without letting the client throw (e.g. do not assume JSON body; handle non-JSON or empty body).
3. Assert that status code is in 5xx range and that no unhandled exception occurred.

## Expected Result

- Response status code is 5xx (500, 502, 503, etc.).
- Test client completes without unhandled exception. Optional: assert that body can be read (or is empty) and that timeout did not fire if API responds with 5xx quickly.

## Automation Notes

- Assert on status >= 500 and status < 600. Ensure RestAssured (or client) does not throw on 5xx; use validatable response and optional try/catch for body parsing. Mark as N/A if 5xx cannot be triggered in test environment.
