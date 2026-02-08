package post_create.post_valid_body_returns_201_and_location_header;

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
 * Test Case API-POST-001: POST with valid body returns 201 and Location header.
 * Objective: Verify POST with valid body returns 201 Created and, when supported, Location header.
 * Expected: Status 201 (or 200); Location header present when supported.
 */
@DisplayName("POST valid body returns 201 and Location header")
class PostValidBodyReturns201AndLocationHeaderTest extends BaseApiTest {

    public static final String TEST_CASE_SPEC_PATH =
            "rest-api-tests/post-create/post_valid_body_returns_201_and_location_header/TEST_CASE.md";

    private static final String AUTH_HEADER = "Authorization";
    private static final String BEARER_PREFIX = "Bearer ";
    private static final String LOCATION_HEADER = "Location";

    @Test
    @DisplayName("POST with valid body returns 201 and optionally Location header")
    void postValidBody_returns201AndLocationHeader() {
        Assumptions.assumeTrue(ApiConfig.getBaseUrl().isPresent(), "BASE_URL must be set");
        Assumptions.assumeTrue(ApiConfig.getCreateEndpoint().isPresent(), "PROTECTED_ENDPOINT/CREATE_ENDPOINT must be set");
        Assumptions.assumeTrue(ApiConfig.getAuthToken().isPresent(), "AUTH_TOKEN required");

        String path = ApiConfig.getCreateEndpoint().map(p -> p.startsWith("/") ? p : "/" + p).orElseThrow();
        Header authHeader = new Header(AUTH_HEADER, BEARER_PREFIX + ApiConfig.getAuthToken().orElseThrow());
        String email = "post-201-" + System.currentTimeMillis() + "@example.com";
        String body = "{\"name\":\"Post 201 Test\",\"email\":\"" + email + "\",\"gender\":\"male\",\"status\":\"active\"}";

        Response response = given()
                .spec(baseSpec)
                .header(authHeader)
                .body(body)
                .when()
                .post(path)
                .then()
                .statusCode(anyOf(equalTo(201), equalTo(200)))
                .extract()
                .response();

        String location = response.getHeader(LOCATION_HEADER);
        if (location != null && !location.isBlank()) {
            assertTrue(location.startsWith("http") || location.startsWith("/"), "Location should be valid URI");
        }
    }
}
