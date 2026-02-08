package error_responses.response_time_for_success_within_configured_timeout;

import api.BaseApiTest;
import api.config.ApiConfig;
import io.restassured.response.Response;
import org.junit.jupiter.api.Assumptions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Test Case API-ERROR-003: Response time for success within configured timeout.
 * Objective: Verify successful request completes within configured max response time.
 * Expected: Status 200; response time ≤ configured threshold.
 */
@DisplayName("Response time for success within configured timeout")
class ResponseTimeForSuccessWithinConfiguredTimeoutTest extends BaseApiTest {

    public static final String TEST_CASE_SPEC_PATH =
            "rest-api-tests/error-responses/response_time_for_success_within_configured_timeout/TEST_CASE.md";

    private static final long DEFAULT_TIMEOUT_MS = 10000L;

    @Test
    @DisplayName("Success endpoint responds within configured timeout")
    void successResponse_withinConfiguredTimeout() {
        Assumptions.assumeTrue(ApiConfig.getBaseUrl().isPresent(), "BASE_URL must be set");
        Assumptions.assumeTrue(ApiConfig.getProtectedEndpoint().isPresent(), "PROTECTED_ENDPOINT must be set (success endpoint)");

        long timeoutMs = ApiConfig.getResponseTimeoutMs().orElse(DEFAULT_TIMEOUT_MS);
        String path = ApiConfig.getProtectedEndpoint()
                .map(p -> p.startsWith("/") ? p : "/" + p)
                .orElseThrow();

        // TEST_CASE Step 1–2: Send request; measure response time
        Response response = given()
                .spec(baseSpec)
                .when()
                .get(path)
                .then()
                .statusCode(equalTo(200))
                .extract()
                .response();

        long responseTimeMs = response.getTime();
        // TEST_CASE Step 3–4 & Expected: response time ≤ threshold, status 200
        assertTrue(responseTimeMs <= timeoutMs,
                "Response time " + responseTimeMs + " ms exceeded threshold " + timeoutMs + " ms");
    }
}
