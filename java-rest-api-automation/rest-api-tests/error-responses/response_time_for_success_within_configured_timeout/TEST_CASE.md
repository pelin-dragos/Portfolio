# Test Case: Response Time for Success Within Configured Timeout

| Attribute | Value |
|-----------|--------|
| **Test Case ID** | API-ERROR-003 |
| **Priority** | Low |
| **Type** | REST API, Performance (optional) |

## Objective

Verify that a successful request (e.g. GET list or GET by ID) completes within a configured maximum response time (timeout threshold), so that slow endpoints can be detected in CI or test runs.

## Preconditions

- A success endpoint is configured (e.g. GET list).
- A maximum response time (e.g. 5000 ms) is configured in test config or constants.
- Environment is stable enough that occasional network spikes do not cause flakiness; otherwise increase threshold or run only in stable env.

## Test Data

- Endpoint that typically returns 200 (e.g. GET list).
- Configured timeout threshold in milliseconds (e.g. 5000).

## Steps

1. Send a request to an endpoint that returns 200.
2. Measure the response time (e.g. RestAssured response time or custom timing).
3. Assert that response time is less than or equal to the configured threshold.
4. Assert that status code is 200.

## Expected Result

- Response status code is **200**.
- Response time (milliseconds) is **≤ configured timeout**. If exceeded, test fails with a clear message including actual time.

## Automation Notes

- Use RestAssured `time()` or similar to get response time. Read threshold from config. Consider tagging as performance and running separately if flaky. Optional test; can be disabled in unstable environments.

---

## Traceability (automation)

| Item | Location |
|------|----------|
| **Test Case ID** | API-ERROR-003 |
| **Automated test (source)** | `ResponseTimeForSuccessWithinConfiguredTimeoutTest.java` (same folder) |
| **Project path** | `java-rest-api-automation/rest-api-tests/error-responses/response_time_for_success_within_configured_timeout/` |
