package error_responses.five_xx_responses_handled_without_crashing_client;

import api.BaseApiTest;
import api.config.ApiConfig;
import io.restassured.response.Response;
import org.junit.jupiter.api.Assumptions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Test Case API-ERROR-002: 5xx responses handled without crashing client.
 * Objective: Verify that when the API returns 5xx, the client handles it without unhandled exception; can read status and body.
 * Expected: Status in 5xx range; no client crash; optional body readable or empty.
 */
@DisplayName("5xx responses handled without crashing client")
class FiveXxResponsesHandledWithoutCrashingClientTest extends BaseApiTest {

    public static final String TEST_CASE_SPEC_PATH =
            "rest-api-tests/error-responses/five_xx_responses_handled_without_crashing_client/TEST_CASE.md";

    @Test
    @DisplayName("Request to 5xx endpoint returns 5xx and client does not crash")
    void fiveXxResponse_handledWithoutCrashing() {
        Assumptions.assumeTrue(ApiConfig.getBaseUrl().isPresent(), "BASE_URL must be set");
        Assumptions.assumeTrue(ApiConfig.getError5xxEndpoint().isPresent(),
                "ERROR_5XX_ENDPOINT must be set to trigger 5xx (e.g. mock or fault injection). Skip when 5xx cannot be triggered.");

        String path = ApiConfig.getError5xxEndpoint()
                .map(p -> p.startsWith("/") ? p : "/" + p)
                .orElseThrow();

        // TEST_CASE Step 1–2: Send request that results in 5xx; capture status and body without throwing
        Response response = assertDoesNotThrow(() -> given()
                .spec(baseSpec)
                .when()
                .get(path)
                .andReturn());

        int statusCode = response.getStatusCode();
        // TEST_CASE Step 3 & Expected: status in 5xx range
        assertTrue(statusCode >= 500 && statusCode < 600,
                "Expected 5xx, got " + statusCode);
        // Optional: body can be read (or empty)
        assertDoesNotThrow(() -> response.getBody().asString());
    }
}
