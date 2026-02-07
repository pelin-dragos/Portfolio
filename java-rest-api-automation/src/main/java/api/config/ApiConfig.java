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
}
