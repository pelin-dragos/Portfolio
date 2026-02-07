# Recommended API for All REST API Tests

Use **one API** for the entire `rest-api-tests` suite so all 55 tests can run against the same base URL and behaviour.

---

## API: GoREST

| Item | Value |
|------|--------|
| **Name** | GoREST |
| **Base URL** | `https://gorest.co.in/public/v2` |
| **Documentation** | [https://gorest.co.in/](https://gorest.co.in/) |
| **Auth** | Bearer token (required for POST, PUT, PATCH, DELETE; GET list/single can work with or without token depending on endpoint) |
| **Get token** | [https://gorest.co.in/my-account/access-tokens](https://gorest.co.in/my-account/access-tokens) (login with GitHub / Google / Microsoft, then copy token) |

---

## Why GoREST Fits All Tests

| Test category | GoREST support |
|---------------|----------------|
| **GET list** | `GET /users` → 200, JSON array; pagination `?page=1&per_page=10`; 401 without token on protected usage |
| **GET single** | `GET /users/{id}` → 200 or 404; invalid ID → 404 |
| **POST create** | `POST /users` → 201 + body; validation → 422 with message; 401 without token; wrong Content-Type → 415/400 |
| **PUT update** | `PUT /users/{id}` → 200 + body; 404 if not exist; 401 without token |
| **PATCH update** | `PATCH /users/{id}` → 200, partial update; 404, 401 |
| **DELETE** | `DELETE /users/{id}` → 204 (or 200); 404 if not exist; 401 without token; GET after DELETE → 404 |
| **Headers** | JSON request/response; Content-Type application/json |
| **4xx/5xx** | 401, 404, 422 with body; client can handle 5xx |
| **Auth** | 401 without/invalid token; 200/201 with valid token |

---

## Exact .env to Use

Copy this into your **`.env`** file (in `java-rest-api-automation/`). Replace `YOUR_TOKEN_HERE` with your token from [gorest.co.in/my-account/access-tokens](https://gorest.co.in/my-account/access-tokens).

```env
BASE_URL=https://gorest.co.in/public/v2
AUTH_TOKEN=YOUR_TOKEN_HERE
PROTECTED_ENDPOINT=/users
```

Optional (for future tests that need explicit list/single/create paths):

```env
LIST_ENDPOINT=/users
SINGLE_ENDPOINT=/users
CREATE_ENDPOINT=/users
```

---

## Endpoint Mapping for Tests

| Test type | Method | Path | Notes |
|-----------|--------|------|--------|
| List | GET | `/users` | Add `?page=1&per_page=10` for pagination |
| Single | GET | `/users/{id}` | Use existing ID from list or create |
| Create | POST | `/users` | Body: `{"name":"...","email":"...@example.com","gender":"male","status":"active"}` |
| Full update | PUT | `/users/{id}` | Same body shape as create |
| Partial update | PATCH | `/users/{id}` | e.g. `{"status":"inactive"}` |
| Delete | DELETE | `/users/{id}` | Returns 204; then GET same id → 404 |

With this single API and the .env above, all current and future tests in `rest-api-tests` can be run against real endpoints.
