package post_create.post_duplicate_returns_409_or_400_when_applicable;

import api.BaseApiTest;
import api.config.ApiConfig;
import io.restassured.http.Header;
import io.restassured.response.Response;
import org.junit.jupiter.api.Assumptions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.anyOf;
import static org.hamcrest.Matchers.equalTo;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Test Case API-POST-009: POST duplicate returns 409 or 400 when applicable.
 * Objective: Verify second POST with same unique field (e.g. email) returns 409 or 400; no duplicate created.
 * Expected: First POST 201; second POST 409 or 400.
 */
@DisplayName("POST duplicate returns 409 or 400 when applicable")
class PostDuplicateReturns409Or400WhenApplicableTest extends BaseApiTest {

    public static final String TEST_CASE_SPEC_PATH =
            "rest-api-tests/post-create/post_duplicate_returns_409_or_400_when_applicable/TEST_CASE.md";

    private static final String AUTH_HEADER = "Authorization";
    private static final String BEARER_PREFIX = "Bearer ";

    @Test
    @DisplayName("Second POST with same email returns 409 or 400")
    void postDuplicate_returns409Or400WhenApplicable() {
        Assumptions.assumeTrue(ApiConfig.getBaseUrl().isPresent(), "BASE_URL must be set");
        Assumptions.assumeTrue(ApiConfig.getCreateEndpoint().isPresent(), "PROTECTED_ENDPOINT must be set");
        Assumptions.assumeTrue(ApiConfig.getAuthToken().isPresent(), "AUTH_TOKEN required");

        String path = ApiConfig.getCreateEndpoint().map(p -> p.startsWith("/") ? p : "/" + p).orElseThrow();
        Header authHeader = new Header(AUTH_HEADER, BEARER_PREFIX + ApiConfig.getAuthToken().orElseThrow());
        String email = "post-dup-" + System.currentTimeMillis() + "@example.com";
        String body = "{\"name\":\"Post Duplicate\",\"email\":\"" + email + "\",\"gender\":\"male\",\"status\":\"active\"}";

        Response first = given().spec(baseSpec).header(authHeader).body(body).when().post(path);
        Assumptions.assumeTrue(first.getStatusCode() == 201 || first.getStatusCode() == 200, "First POST must succeed");

        int secondStatus = given()
                .spec(baseSpec)
                .header(authHeader)
                .body(body)
                .when()
                .post(path)
                .then()
                .extract()
                .statusCode();

        assertTrue(secondStatus == 409 || secondStatus == 400 || secondStatus == 422,
                "Duplicate POST should return 409, 400 or 422 (client error), got " + secondStatus);
    }
}
