# Postman API Test Collection

Structured **Postman** (or **Bruno**) collection for REST API testing: requests, environments, and automated assertions.  
Independent from Playwright; used for manual and collection-runner execution.

## Purpose

- Demonstrate **API testing** with **Postman** (or Bruno) as per industry preference.
- Reusable collection with tests (status codes, response body, schema) and variables.
- Easy to export, share, and run in CI (Newman/Bruno CLI) if needed.

## Suggested structure (to be implemented)

```
postman-api-collection/
├── collection/                   # Postman collection(s)
│   └── REST-API-Tests.postman_collection.json
├── environments/                 # Environment variables (no secrets)
│   ├── demo.postman_environment.json
│   └── .env.example
├── docs/                         # Optional: scope, endpoints, how to run
│   └── API-Scope.md
└── README.md
```

## Contents (suggested)

- **Collection:** Folders by resource or flow (e.g. Users, Posts, Auth). Each request with:
  - Pre-request script if needed (e.g. token, timestamp).
  - Tests tab: `pm.test()` for status, `pm.expect()` for body, optional schema validation.
- **Environments:** `base_url`, `api_key` (placeholder); real secrets via Postman env or `.env` (not committed).
- **README:** How to import, set environment, run collection/Newman.

## Running (after implementation)

- **Postman:** Import collection + environment → Run collection.
- **CLI (Newman):** `newman run collection/REST-API-Tests.postman_collection.json -e environments/demo.postman_environment.json`

---

*Add your API endpoints, tests, and environment files as needed.*
