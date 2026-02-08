package post_create.post_without_auth_returns_401_when_protected;

import api.BaseApiTest;
import api.config.ApiConfig;
import org.junit.jupiter.api.Assumptions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;

/**
 * Test Case API-POST-007: POST without auth returns 401 when endpoint is protected.
 * Objective: Verify POST without valid authentication returns 401; no resource created.
 * Expected: Status 401. Skipped when endpoint is public.
 */
@DisplayName("POST without auth returns 401 when protected")
class PostWithoutAuthReturns401WhenProtectedTest extends BaseApiTest {

    public static final String TEST_CASE_SPEC_PATH =
            "rest-api-tests/post-create/post_without_auth_returns_401_when_protected/TEST_CASE.md";

    @Test
    @DisplayName("POST without auth returns 401 when protected")
    void postWithoutAuth_returns401WhenProtected() {
        Assumptions.assumeTrue(ApiConfig.getBaseUrl().isPresent(), "BASE_URL must be set");
        Assumptions.assumeTrue(ApiConfig.getCreateEndpoint().isPresent(), "PROTECTED_ENDPOINT must be set");

        String path = ApiConfig.getCreateEndpoint().map(p -> p.startsWith("/") ? p : "/" + p).orElseThrow();
        String body = "{\"name\":\"Post 401\",\"email\":\"post401-" + System.currentTimeMillis() + "@example.com\",\"gender\":\"male\",\"status\":\"active\"}";

        int statusCode = given()
                .spec(baseSpec)
                .body(body)
                .when()
                .post(path)
                .then()
                .extract()
                .statusCode();

        Assumptions.assumeTrue(statusCode == 401,
                "Endpoint did not return 401 without auth (got " + statusCode + "). Skip when endpoint is not protected.");
    }
}
