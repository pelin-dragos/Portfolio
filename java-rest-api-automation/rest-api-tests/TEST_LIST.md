# REST API Tests (RestAssured) — Test List

All tests to be implemented for the REST API test suite. Each test must follow the rules in the repository root: `TESTING_RULES.md`.

**Folder structure:** Test cases are grouped in subfolders by category (e.g. `get-list/`, `post-create/`, `delete/`). Each test has its own folder with a `TEST_CASE.md`. See **README.md** in this folder for the full structure.

---

## GET — List / Collection

1. GET list of resources returns status 200.
2. GET list returns valid JSON array (or expected structure).
3. GET list with valid pagination parameters returns correct page and size.
4. GET list with invalid pagination (e.g. negative page) returns 400 or 422.
5. GET list when empty returns 200 and empty array (or empty collection).
6. GET list respects query filters when supported (e.g. filter by status) and returns matching results.
7. GET list without required auth returns 401 when endpoint is protected.
8. GET list with valid auth returns 200 and data.

---

## GET — Single Resource by ID

9. GET resource by valid ID returns 200 and correct resource body.
10. GET resource by valid ID returns response with expected fields and types.
11. GET resource by non-existent ID returns 404.
12. GET resource by invalid ID format (e.g. string instead of number) returns 400 or 404.
13. GET resource without auth returns 401 when endpoint is protected.
14. GET resource with valid auth returns 200 and correct data.

---

## POST — Create

15. POST with valid body returns 201 and Location header (or 200 per API contract).
16. POST with valid body returns response containing created resource (id, fields).
17. POST with missing required field returns 400 with validation error message.
18. POST with invalid field format (e.g. invalid email) returns 400 with validation message.
19. POST with empty body returns 400 or 415 when body is required.
20. POST with wrong Content-Type (e.g. text/plain instead of application/json) returns 415 or 400.
21. POST without auth returns 401 when endpoint is protected.
22. POST with valid auth creates resource and returns success status.
23. POST duplicate (e.g. unique constraint) returns 409 or 400 with clear message when applicable.

---

## PUT — Full Update

24. PUT with valid body and existing ID returns 200 (or 204) and updated resource.
25. PUT response body contains updated fields and values.
26. PUT with non-existent ID returns 404.
27. PUT with invalid ID format returns 400 or 404.
28. PUT with missing required fields returns 400 with validation errors.
29. PUT with invalid field values returns 400 with validation message.
30. PUT without auth returns 401 when endpoint is protected.
31. PUT with valid auth updates resource and returns success status.

---

## PATCH — Partial Update

32. PATCH with valid partial body and existing ID returns 200 and updated resource.
33. PATCH updates only sent fields; other fields remain unchanged.
34. PATCH with non-existent ID returns 404.
35. PATCH with invalid field value returns 400 with validation message.
36. PATCH with empty body returns 400 or 200 (no change) per API contract.
37. PATCH without auth returns 401 when endpoint is protected.
38. PATCH with valid auth updates resource and returns success status.

---

## DELETE

39. DELETE with valid existing ID returns 204 (or 200 with empty body per contract).
40. DELETE with non-existent ID returns 404.
41. DELETE with invalid ID format returns 400 or 404.
42. GET after DELETE for same ID returns 404 (resource no longer exists).
43. DELETE without auth returns 401 when endpoint is protected.
44. DELETE with valid auth removes resource and returns success status.
45. DELETE with conflict (e.g. resource in use) returns 409 when applicable.

---

## Headers & Content-Type

46. Requests with Accept: application/json receive JSON response when supported.
47. Responses include Content-Type: application/json (or declared type) for JSON APIs.
48. Responses do not expose sensitive headers (e.g. server version) or expose only as configured.

---

## Error Responses & Status Codes

49. 4xx responses include body with error message or code when API supports it.
50. 5xx responses (if testable via mock or contract) are handled without crashing client.
51. Response time for success cases is within configured timeout (optional performance check).

---

## Optional: Authentication & Authorization

52. Endpoint requiring auth returns 401 when no token or invalid token is sent.
53. Endpoint requiring auth returns 200 or 201 when valid token is sent.
54. Endpoint requiring role returns 403 when token has insufficient permissions.
55. Expired token returns 401 with appropriate message when API supports it.

---

## Summary Count

| Category              | Number of tests |
|-----------------------|-----------------|
| GET — List            | 8               |
| GET — Single          | 6               |
| POST — Create         | 9               |
| PUT — Update          | 8               |
| PATCH — Partial       | 7               |
| DELETE                | 7               |
| Headers & Content-Type| 3               |
| Error responses       | 3               |
| Auth (optional)       | 4               |
| **Total**             | **55**          |

---

*Adjust test IDs and scope per actual API (e.g. add resource-specific validation or remove PATCH if not supported).*
