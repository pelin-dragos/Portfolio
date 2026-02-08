package error_responses.four_xx_responses_include_body_with_error_message_or_code;

import api.BaseApiTest;
import api.config.ApiConfig;
import org.junit.jupiter.api.Assumptions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.greaterThanOrEqualTo;
import static org.hamcrest.Matchers.lessThan;
import static org.hamcrest.Matchers.notNullValue;

/**
 * Test Case API-ERROR-001: 4xx responses include body with error message or code.
 * Objective: Verify that 4xx responses include a body with error message or code for client display/logging.
 * Expected: Status 4xx; body present and contains message/code/error (per API contract).
 */
@DisplayName("4xx responses include body with error message or code")
class FourXxResponsesIncludeBodyWithErrorMessageOrCodeTest extends BaseApiTest {

    public static final String TEST_CASE_SPEC_PATH =
            "rest-api-tests/error-responses/four_xx_responses_include_body_with_error_message_or_code/TEST_CASE.md";

    @Test
    @DisplayName("4xx response has body with message or code")
    void fourXxResponse_includesBodyWithMessageOrCode() {
        Assumptions.assumeTrue(ApiConfig.getBaseUrl().isPresent(), "BASE_URL must be set");
        Assumptions.assumeTrue(ApiConfig.getProtectedEndpoint().isPresent(), "PROTECTED_ENDPOINT must be set");

        String basePath = ApiConfig.getProtectedEndpoint()
                .map(p -> p.startsWith("/") ? p : "/" + p)
                .orElseThrow();
        // Use non-existent ID to trigger 404 (representative 4xx)
        String path = basePath + "/999999999";

        // TEST_CASE Step 1–2: Send request that returns 4xx; capture status and body
        given()
                .spec(baseSpec)
                .when()
                .get(path)
                .then()
                .statusCode(greaterThanOrEqualTo(400))
                .statusCode(lessThan(500))
                .body(notNullValue())
                .body("message", notNullValue()); // GoREST and many APIs use "message"; adapt if API uses "error" or "code"
    }
}
