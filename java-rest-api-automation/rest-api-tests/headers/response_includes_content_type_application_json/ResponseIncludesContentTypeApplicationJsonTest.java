package headers.response_includes_content_type_application_json;

import api.BaseApiTest;
import api.config.ApiConfig;
import org.junit.jupiter.api.Assumptions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.notNullValue;

/**
 * Test Case API-HEADERS-002: Response includes Content-Type application/json.
 * Objective: Verify endpoints that return JSON include Content-Type header set to application/json.
 * Expected: Content-Type header present and value contains application/json.
 */
@DisplayName("Response includes Content-Type application/json")
class ResponseIncludesContentTypeApplicationJsonTest extends BaseApiTest {

    public static final String TEST_CASE_SPEC_PATH =
            "rest-api-tests/headers/response_includes_content_type_application_json/TEST_CASE.md";

    private static final String CONTENT_TYPE_HEADER = "Content-Type";

    @Test
    @DisplayName("Response has Content-Type containing application/json")
    void response_includesContentTypeApplicationJson() {
        Assumptions.assumeTrue(ApiConfig.getBaseUrl().isPresent(), "BASE_URL must be set");
        Assumptions.assumeTrue(ApiConfig.getProtectedEndpoint().isPresent(), "PROTECTED_ENDPOINT must be set");

        String path = ApiConfig.getProtectedEndpoint()
                .map(p -> p.startsWith("/") ? p : "/" + p)
                .orElseThrow();

        given()
                .spec(baseSpec)
                .when()
                .get(path)
                .then()
                .statusCode(equalTo(200))
                .header(CONTENT_TYPE_HEADER, containsString("application/json"))
                .body(notNullValue());
    }
}
