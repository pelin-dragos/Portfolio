package auth.expired_token_returns_401_with_appropriate_message;

import api.BaseApiTest;
import api.config.ApiConfig;
import io.restassured.http.Header;
import io.restassured.response.ValidatableResponse;
import org.junit.jupiter.api.Assumptions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

/**
 * Test Case API-AUTH-004: Expired token returns 401 with appropriate message.
 * Objective: Verify that an expired token yields HTTP 401; body may indicate expiry/invalid.
 * Expected: Status 401; optional message/code for token expired. Skipped when expired token not available.
 */
@DisplayName("Expired token returns 401 with appropriate message")
class ExpiredTokenReturns401WithAppropriateMessageTest extends BaseApiTest {

    public static final String TEST_CASE_SPEC_PATH =
            "rest-api-tests/auth/expired_token_returns_401_with_appropriate_message/TEST_CASE.md";

    private static final String AUTH_HEADER_NAME = "Authorization";
    private static final String BEARER_PREFIX = "Bearer ";

    @Test
    @DisplayName("GET protected endpoint with expired token returns 401")
    void expiredToken_returns401() {
        // TEST_CASE Step 1: Obtain expired token (per environment capability)
        Assumptions.assumeTrue(ApiConfig.getBaseUrl().isPresent(), "BASE_URL must be set");
        Assumptions.assumeTrue(ApiConfig.getExpiredToken().isPresent(),
                "EXPIRED_TOKEN must be set in env/.env to run this test (skip when not available)");
        Assumptions.assumeTrue(ApiConfig.getProtectedEndpoint().isPresent(), "PROTECTED_ENDPOINT must be set");

        String path = ApiConfig.getProtectedEndpoint()
                .map(p -> p.startsWith("/") ? p : "/" + p)
                .orElseThrow();
        Header authHeader = new Header(AUTH_HEADER_NAME, BEARER_PREFIX + ApiConfig.getExpiredToken().orElseThrow());

        // TEST_CASE Step 2–3: Send request with expired token; capture status and body
        ValidatableResponse response = given()
                .spec(baseSpec)
                .header(authHeader)
                .when()
                .get(path)
                .then();

        // TEST_CASE Step 4 & Expected Result: 401 Unauthorized; body may indicate expiry (not asserted for robustness)
        response.statusCode(equalTo(401));
    }
}
