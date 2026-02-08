package api.config;

import java.util.Optional;

/**
 * API configuration from environment variables and optional .env file.
 * Values are read in this order: 1) system environment, 2) .env file (if present in project root).
 * No secrets or URLs are hardcoded.
 */
public final class ApiConfig {

    private static final String BASE_URL_KEY = "BASE_URL";
    private static final String AUTH_TOKEN_KEY = "AUTH_TOKEN";
    private static final String PROTECTED_ENDPOINT_KEY = "PROTECTED_ENDPOINT";
    private static final String USER_TOKEN_KEY = "USER_TOKEN";
    private static final String ADMIN_ENDPOINT_KEY = "ADMIN_ENDPOINT";
    private static final String EXPIRED_TOKEN_KEY = "EXPIRED_TOKEN";
    private static final String CREATE_ENDPOINT_KEY = "CREATE_ENDPOINT";
    private static final String CONFLICT_RESOURCE_ID_KEY = "CONFLICT_RESOURCE_ID";
    private static final String RESPONSE_TIMEOUT_MS_KEY = "RESPONSE_TIMEOUT_MS";
    private static final String ERROR_5XX_ENDPOINT_KEY = "ERROR_5XX_ENDPOINT";

    private ApiConfig() {
    }

    private static String get(String key) {
        String fromEnv = System.getenv(key);
        if (fromEnv != null && !fromEnv.isBlank()) {
            return fromEnv.trim();
        }
        String fromDotEnv = EnvLoader.getEnvMap().get(key);
        return fromDotEnv != null && !fromDotEnv.isBlank() ? fromDotEnv.trim() : null;
    }

    /**
     * Base URL of the API (e.g. https://api.example.com). No trailing slash.
     */
    public static Optional<String> getBaseUrl() {
        return Optional.ofNullable(get(BASE_URL_KEY)).filter(s -> !s.isEmpty());
    }

    /**
     * Bearer token for authenticated requests. Never logged or exposed.
     */
    public static Optional<String> getAuthToken() {
        return Optional.ofNullable(get(AUTH_TOKEN_KEY)).filter(s -> !s.isEmpty());
    }

    /**
     * Path of a protected endpoint used in auth tests (e.g. /api/users). Leading slash optional.
     */
    public static Optional<String> getProtectedEndpoint() {
        return Optional.ofNullable(get(PROTECTED_ENDPOINT_KEY)).filter(s -> !s.isEmpty());
    }

    /**
     * Optional token with lower privileges (e.g. user role) for 403 role tests.
     */
    public static Optional<String> getUserToken() {
        return Optional.ofNullable(get(USER_TOKEN_KEY)).filter(s -> !s.isEmpty());
    }

    /**
     * Optional endpoint that requires higher privileges (e.g. admin). Used with USER_TOKEN for 403 tests.
     */
    public static Optional<String> getAdminEndpoint() {
        return Optional.ofNullable(get(ADMIN_ENDPOINT_KEY)).filter(s -> !s.isEmpty());
    }

    /**
     * Optional expired token for testing 401 expiry behaviour. When not set, expired-token test is skipped.
     */
    public static Optional<String> getExpiredToken() {
        return Optional.ofNullable(get(EXPIRED_TOKEN_KEY)).filter(s -> !s.isEmpty());
    }

    /**
     * Endpoint for creating a resource (POST). Used by delete tests to create then delete.
     * When not set, falls back to PROTECTED_ENDPOINT (e.g. /users).
     */
    public static Optional<String> getCreateEndpoint() {
        Optional<String> create = Optional.ofNullable(get(CREATE_ENDPOINT_KEY)).filter(s -> !s.isEmpty());
        return create.isPresent() ? create : getProtectedEndpoint();
    }

    /**
     * Optional resource ID that cannot be deleted (e.g. has dependencies). Used for 409 conflict test. When not set, test is skipped.
     */
    public static Optional<String> getConflictResourceId() {
        return Optional.ofNullable(get(CONFLICT_RESOURCE_ID_KEY)).filter(s -> !s.isEmpty());
    }

    /**
     * Maximum allowed response time in milliseconds for success endpoint (performance test). When not set, test uses default or skips.
     */
    public static Optional<Long> getResponseTimeoutMs() {
        String v = get(RESPONSE_TIMEOUT_MS_KEY);
        if (v == null || v.isBlank()) return Optional.empty();
        try {
            return Optional.of(Long.parseLong(v.trim()));
        } catch (NumberFormatException e) {
            return Optional.empty();
        }
    }

    /**
     * Optional endpoint that returns 5xx (e.g. for fault injection). When not set, 5xx test is skipped.
     */
    public static Optional<String> getError5xxEndpoint() {
        return Optional.ofNullable(get(ERROR_5XX_ENDPOINT_KEY)).filter(s -> !s.isEmpty());
    }
}
