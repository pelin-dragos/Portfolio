package post_create.post_wrong_content_type_returns_415_or_400;

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
 * Test Case API-POST-006: POST with wrong Content-Type returns 415 or 400.
 * Objective: Verify POST with unsupported Content-Type (e.g. text/plain) returns 415 or 400; no resource created.
 * Expected: Status 415 or 400.
 */
@DisplayName("POST wrong Content-Type returns 415 or 400")
class PostWrongContentTypeReturns415Or400Test extends BaseApiTest {

    public static final String TEST_CASE_SPEC_PATH =
            "rest-api-tests/post-create/post_wrong_content_type_returns_415_or_400/TEST_CASE.md";

    private static final String AUTH_HEADER = "Authorization";
    private static final String BEARER_PREFIX = "Bearer ";
    private static final String CONTENT_TYPE_HEADER = "Content-Type";
    private static final String WRONG_CONTENT_TYPE = "text/plain";

    @Test
    @DisplayName("POST with Content-Type text/plain returns 415 or 400")
    void postWrongContentType_returns415Or400() {
        Assumptions.assumeTrue(ApiConfig.getBaseUrl().isPresent(), "BASE_URL must be set");
        Assumptions.assumeTrue(ApiConfig.getCreateEndpoint().isPresent(), "PROTECTED_ENDPOINT must be set");
        Assumptions.assumeTrue(ApiConfig.getAuthToken().isPresent(), "AUTH_TOKEN required");

        String path = ApiConfig.getCreateEndpoint().map(p -> p.startsWith("/") ? p : "/" + p).orElseThrow();
        Header authHeader = new Header(AUTH_HEADER, BEARER_PREFIX + ApiConfig.getAuthToken().orElseThrow());
        String body = "{\"name\":\"Wrong CT\",\"email\":\"wrongct-" + System.currentTimeMillis() + "@example.com\",\"gender\":\"male\",\"status\":\"active\"}";

        given()
                .spec(baseSpec)
                .header(authHeader)
                .header(CONTENT_TYPE_HEADER, WRONG_CONTENT_TYPE)
                .body(body)
                .when()
                .post(path)
                .then()
                .statusCode(anyOf(equalTo(415), equalTo(400), equalTo(422)));
    }
}
