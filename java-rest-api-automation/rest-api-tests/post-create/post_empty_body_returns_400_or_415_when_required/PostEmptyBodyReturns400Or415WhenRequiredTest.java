package post_create.post_empty_body_returns_400_or_415_when_required;

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
 * Test Case API-POST-005: POST with empty body returns 400 or 415 when body is required.
 * Objective: Verify POST with empty body {} returns 400 or 415; no resource created.
 * Expected: Status 400 or 415.
 */
@DisplayName("POST empty body returns 400 or 415 when required")
class PostEmptyBodyReturns400Or415WhenRequiredTest extends BaseApiTest {

    public static final String TEST_CASE_SPEC_PATH =
            "rest-api-tests/post-create/post_empty_body_returns_400_or_415_when_required/TEST_CASE.md";

    private static final String AUTH_HEADER = "Authorization";
    private static final String BEARER_PREFIX = "Bearer ";
    private static final String EMPTY_BODY = "{}";

    @Test
    @DisplayName("POST with empty body returns 400 or 415")
    void postEmptyBody_returns400Or415WhenRequired() {
        Assumptions.assumeTrue(ApiConfig.getBaseUrl().isPresent(), "BASE_URL must be set");
        Assumptions.assumeTrue(ApiConfig.getCreateEndpoint().isPresent(), "PROTECTED_ENDPOINT must be set");
        Assumptions.assumeTrue(ApiConfig.getAuthToken().isPresent(), "AUTH_TOKEN required");

        String path = ApiConfig.getCreateEndpoint().map(p -> p.startsWith("/") ? p : "/" + p).orElseThrow();
        Header authHeader = new Header(AUTH_HEADER, BEARER_PREFIX + ApiConfig.getAuthToken().orElseThrow());

        given()
                .spec(baseSpec)
                .header(authHeader)
                .body(EMPTY_BODY)
                .when()
                .post(path)
                .then()
                .statusCode(anyOf(equalTo(400), equalTo(415), equalTo(422)));
    }
}
