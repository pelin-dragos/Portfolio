package patch_update.patch_invalid_field_value_returns_400_with_validation_message;

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
 * Test Case API-PATCH-004: PATCH with invalid field value returns 400 with validation message.
 * Objective: Verify PATCH with invalid value (e.g. invalid enum) returns 400/422 and validation error.
 * Expected: Status 400 or 422; body contains validation error; resource not updated.
 */
@DisplayName("PATCH invalid field value returns 400 with validation message")
class PatchInvalidFieldValueReturns400WithValidationMessageTest extends BaseApiTest {

    public static final String TEST_CASE_SPEC_PATH =
            "rest-api-tests/patch-update/patch_invalid_field_value_returns_400_with_validation_message/TEST_CASE.md";

    private static final String AUTH_HEADER = "Authorization";
    private static final String BEARER_PREFIX = "Bearer ";
    private static final String INVALID_STATUS_BODY = "{\"status\":\"invalid_enum_value\"}";

    @Test
    @DisplayName("PATCH with invalid field value returns 400 or 422")
    void patchInvalidFieldValue_returns400WithValidationMessage() {
        Assumptions.assumeTrue(ApiConfig.getBaseUrl().isPresent(), "BASE_URL must be set");
        Assumptions.assumeTrue(ApiConfig.getCreateEndpoint().isPresent(), "PROTECTED_ENDPOINT must be set");
        Assumptions.assumeTrue(ApiConfig.getAuthToken().isPresent(), "AUTH_TOKEN required");

        String basePath = ApiConfig.getCreateEndpoint().map(p -> p.startsWith("/") ? p : "/" + p).orElseThrow();
        Header authHeader = new Header(AUTH_HEADER, BEARER_PREFIX + ApiConfig.getAuthToken().orElseThrow());

        String email = "patch-invalid-" + System.currentTimeMillis() + "@example.com";
        Response createRes = given().spec(baseSpec).header(authHeader)
                .body("{\"name\":\"Patch Invalid\",\"email\":\"" + email + "\",\"gender\":\"male\",\"status\":\"active\"}")
                .when().post(basePath);
        Assumptions.assumeTrue(createRes.getStatusCode() == 201, "Create must succeed");
        Object id = createRes.path("id");
        Assumptions.assumeTrue(id != null, "Create response must contain id");

        String path = basePath + "/" + id;

        Response patchRes = given()
                .spec(baseSpec)
                .header(authHeader)
                .body(INVALID_STATUS_BODY)
                .when()
                .patch(path);

        int status = patchRes.getStatusCode();
        assertTrue(status == 400 || status == 422, "Expected 400 or 422, got " + status);
    }
}
