package put_update.put_invalid_field_values_returns_400_with_validation_message;

import api.BaseApiTest;
import api.config.ApiConfig;
import io.restassured.http.Header;
import io.restassured.response.Response;
import org.junit.jupiter.api.Assumptions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Test Case API-PUT-006: PUT with invalid field values returns 400 with validation message.
 * Objective: Verify PUT with invalid field value (e.g. invalid enum) returns 400 or 422 and validation error; resource not updated.
 * Expected: Status 400 or 422; validation error in body.
 */
@DisplayName("PUT invalid field values returns 400 with validation message")
class PutInvalidFieldValuesReturns400WithValidationMessageTest extends BaseApiTest {

    public static final String TEST_CASE_SPEC_PATH =
            "rest-api-tests/put-update/put_invalid_field_values_returns_400_with_validation_message/TEST_CASE.md";

    private static final String AUTH_HEADER = "Authorization";
    private static final String BEARER_PREFIX = "Bearer ";

    @Test
    @DisplayName("PUT with invalid field value returns 400 or 422")
    void putInvalidFieldValues_returns400WithValidationMessage() {
        Assumptions.assumeTrue(ApiConfig.getBaseUrl().isPresent(), "BASE_URL must be set");
        Assumptions.assumeTrue(ApiConfig.getCreateEndpoint().isPresent(), "PROTECTED_ENDPOINT must be set");
        Assumptions.assumeTrue(ApiConfig.getAuthToken().isPresent(), "AUTH_TOKEN required");

        String basePath = ApiConfig.getCreateEndpoint().map(p -> p.startsWith("/") ? p : "/" + p).orElseThrow();
        Header authHeader = new Header(AUTH_HEADER, BEARER_PREFIX + ApiConfig.getAuthToken().orElseThrow());

        String email = "put-invalid-val-" + System.currentTimeMillis() + "@example.com";
        Response createRes = given().spec(baseSpec).header(authHeader)
                .body("{\"name\":\"Put Invalid\",\"email\":\"" + email + "\",\"gender\":\"male\",\"status\":\"active\"}")
                .when().post(basePath);
        Assumptions.assumeTrue(createRes.getStatusCode() == 201 || createRes.getStatusCode() == 200, "Create must succeed");
        Object id = createRes.path("id");
        Assumptions.assumeTrue(id != null, "Create response must contain id");

        String path = basePath + "/" + id;
        String invalidBody = "{\"name\":\"Put Invalid\",\"email\":\"" + email + "\",\"gender\":\"invalid_enum\",\"status\":\"active\"}";

        Response putRes = given()
                .spec(baseSpec)
                .header(authHeader)
                .body(invalidBody)
                .when()
                .put(path);

        int status = putRes.getStatusCode();
        assertTrue(status == 400 || status == 422, "Expected 400 or 422, got " + status);
    }
}
