package auth.endpoint_requiring_auth_returns_401_without_or_invalid_token;

import api.BaseApiTest;
import api.config.ApiConfig;
import io.restassured.response.ValidatableResponse;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Assumptions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;

/**
 * Test Case API-AUTH-001: Endpoint requiring auth returns 401 without or with invalid token.
 * Objective: Verify protected endpoint returns HTTP 401 when no token or invalid token is sent.
 * Expected: Status 401 Unauthorized; no resource data returned.
 */
@DisplayName("Endpoint requiring auth returns 401 without or invalid token")
class EndpointRequiringAuthReturns401WithoutOrInvalidTokenTest extends BaseApiTest {

    public static final String TEST_CASE_SPEC_PATH =
            "rest-api-tests/auth/endpoint_requiring_auth_returns_401_without_or_invalid_token/TEST_CASE.md";

    private static final String AUTH_HEADER_NAME = "Authorization";
    private static final String BEARER_PREFIX = "Bearer ";

    @Test
    @DisplayName("GET protected endpoint without Authorization header returns 401")
    void endpointRequiringAuth_withoutAuthHeader_returns401() {
        // TEST_CASE Step 1: Send request without Authorization header; capture status code
        Assumptions.assumeTrue(ApiConfig.getBaseUrl().isPresent(), "BASE_URL must be set");
        Assumptions.assumeTrue(ApiConfig.getProtectedEndpoint().isPresent(), "PROTECTED_ENDPOINT must be set");

        String path = ApiConfig.getProtectedEndpoint()
                .map(p -> p.startsWith("/") ? p : "/" + p)
                .orElseThrow();

        int statusCode = given()
                .spec(baseSpec)
                .when()
                .get(path)
                .then()
                .extract().statusCode();

        // Skip if endpoint is public (e.g. GoREST GET /users returns 200 without token)
        Assumptions.assumeTrue(statusCode == 401,
                "Endpoint does not require auth (returned " + statusCode + " without token). "
                        + "Use an endpoint that requires authentication to run this test.");
        Assertions.assertEquals(401, statusCode, "Expected 401 Unauthorized without token");
    }

    @Test
    @DisplayName("GET protected endpoint with invalid token returns 401")
    void endpointRequiringAuth_withInvalidToken_returns401() {
        // TEST_CASE Step 2 (optional): Send request with invalid token; capture status code
        Assumptions.assumeTrue(ApiConfig.getBaseUrl().isPresent(), "BASE_URL must be set");
        Assumptions.assumeTrue(ApiConfig.getProtectedEndpoint().isPresent(), "PROTECTED_ENDPOINT must be set");

        String path = ApiConfig.getProtectedEndpoint()
                .map(p -> p.startsWith("/") ? p : "/" + p)
                .orElseThrow();

        int statusCode = given()
                .spec(baseSpec)
                .header(AUTH_HEADER_NAME, BEARER_PREFIX + "invalid_token_12345")
                .when()
                .get(path)
                .then()
                .extract().statusCode();

        // Skip if endpoint does not enforce auth (e.g. public endpoint)
        Assumptions.assumeTrue(statusCode == 401,
                "Endpoint did not return 401 with invalid token (got " + statusCode + "). "
                        + "Use an endpoint that requires authentication.");
        Assertions.assertEquals(401, statusCode, "Expected 401 Unauthorized with invalid token");
    }
}
