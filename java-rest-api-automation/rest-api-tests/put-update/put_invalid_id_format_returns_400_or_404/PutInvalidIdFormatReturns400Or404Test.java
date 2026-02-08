package put_update.put_invalid_id_format_returns_400_or_404;

import api.BaseApiTest;
import api.config.ApiConfig;
import io.restassured.http.Header;
import org.junit.jupiter.api.Assumptions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.anyOf;
import static org.hamcrest.Matchers.equalTo;

/**
 * Test Case API-PUT-004: PUT with invalid ID format returns 400 or 404.
 * Objective: Verify PUT with invalid ID format in path returns 400 or 404; no resource updated.
 * Expected: Status 400 or 404.
 */
@DisplayName("PUT invalid ID format returns 400 or 404")
class PutInvalidIdFormatReturns400Or404Test extends BaseApiTest {

    public static final String TEST_CASE_SPEC_PATH =
            "rest-api-tests/put-update/put_invalid_id_format_returns_400_or_404/TEST_CASE.md";

    private static final String AUTH_HEADER = "Authorization";
    private static final String BEARER_PREFIX = "Bearer ";
    private static final String INVALID_ID = "invalid-id-format";
    private static final String FULL_BODY = "{\"name\":\"Put Invalid Id\",\"email\":\"putinvalid@example.com\",\"gender\":\"male\",\"status\":\"active\"}";

    @Test
    @DisplayName("PUT with invalid ID format returns 400 or 404")
    void putInvalidIdFormat_returns400Or404() {
        Assumptions.assumeTrue(ApiConfig.getBaseUrl().isPresent(), "BASE_URL must be set");
        Assumptions.assumeTrue(ApiConfig.getProtectedEndpoint().isPresent(), "PROTECTED_ENDPOINT must be set");
        Assumptions.assumeTrue(ApiConfig.getAuthToken().isPresent(), "AUTH_TOKEN required");

        String basePath = ApiConfig.getProtectedEndpoint().map(p -> p.startsWith("/") ? p : "/" + p).orElseThrow();
        String path = basePath + "/" + INVALID_ID;
        Header authHeader = new Header(AUTH_HEADER, BEARER_PREFIX + ApiConfig.getAuthToken().orElseThrow());

        given()
                .spec(baseSpec)
                .header(authHeader)
                .body(FULL_BODY)
                .when()
                .put(path)
                .then()
                .statusCode(anyOf(equalTo(400), equalTo(404)));
    }
}
