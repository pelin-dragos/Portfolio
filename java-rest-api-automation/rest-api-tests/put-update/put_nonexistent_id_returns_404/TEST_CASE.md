# Test Case: PUT with Non-Existent ID Returns 404

| Attribute | Value |
|-----------|--------|
| **Test Case ID** | API-PUT-003 |
| **Priority** | High |
| **Type** | REST API, Negative |

## Objective

Verify that a PUT request with a non-existent resource ID returns HTTP 404 Not Found and does not create or update any resource.

## Preconditions

- Update endpoint is configured.
- The ID used does not exist (e.g. high number, or from a deleted resource).
- Request body is otherwise valid.

## Test Data

- Non-existent resource ID.
- Valid full update body.

## Steps

1. Choose a non-existent resource ID.
2. Send a PUT request with that ID and a valid body.
3. Capture the response status code and body.

## Expected Result

- Response status code is **404 Not Found**.
- No resource is created or updated. Body may contain an error message.

## Automation Notes

- Assert on status 404. Use a constant or stable non-existent ID. Do not use an ID that might exist in other environments.
