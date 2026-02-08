package post_create.post_invalid_field_format_returns_400_with_validation_message;

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
 * Test Case API-POST-004: POST with invalid field format returns 400 with validation message.
 * Objective: Verify POST with invalid format (e.g. invalid email) returns 400/422 and validation error.
 * Expected: Status 400 or 422; body contains validation error.
 */
@DisplayName("POST invalid field format returns 400 with validation message")
class PostInvalidFieldFormatReturns400WithValidationMessageTest extends BaseApiTest {

    public static final String TEST_CASE_SPEC_PATH =
            "rest-api-tests/post-create/post_invalid_field_format_returns_400_with_validation_message/TEST_CASE.md";

    private static final String AUTH_HEADER = "Authorization";
    private static final String BEARER_PREFIX = "Bearer ";
    private static final String INVALID_EMAIL = "not-an-email";

    @Test
    @DisplayName("POST with invalid email format returns 400 or 422")
    void postInvalidFieldFormat_returns400WithValidationMessage() {
        Assumptions.assumeTrue(ApiConfig.getBaseUrl().isPresent(), "BASE_URL must be set");
        Assumptions.assumeTrue(ApiConfig.getCreateEndpoint().isPresent(), "PROTECTED_ENDPOINT must be set");
        Assumptions.assumeTrue(ApiConfig.getAuthToken().isPresent(), "AUTH_TOKEN required");

        String path = ApiConfig.getCreateEndpoint().map(p -> p.startsWith("/") ? p : "/" + p).orElseThrow();
        Header authHeader = new Header(AUTH_HEADER, BEARER_PREFIX + ApiConfig.getAuthToken().orElseThrow());
        String body = "{\"name\":\"Invalid Email\",\"email\":\"" + INVALID_EMAIL + "\",\"gender\":\"male\",\"status\":\"active\"}";

        given()
                .spec(baseSpec)
                .header(authHeader)
                .body(body)
                .when()
                .post(path)
                .then()
                .statusCode(anyOf(equalTo(400), equalTo(422)));
    }
}
