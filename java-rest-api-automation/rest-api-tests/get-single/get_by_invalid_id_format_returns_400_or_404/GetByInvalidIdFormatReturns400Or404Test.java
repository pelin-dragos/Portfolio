package get_single.get_by_invalid_id_format_returns_400_or_404;

import api.BaseApiTest;
import api.config.ApiConfig;
import org.junit.jupiter.api.Assumptions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.anyOf;
import static org.hamcrest.Matchers.equalTo;

/**
 * Test Case API-GET-SINGLE-004: GET by invalid ID format returns 400 or 404.
 * Objective: Verify invalid ID format (e.g. "abc" when numeric expected) returns 400 or 404.
 * Expected: Status 400 or 404; no resource body.
 */
@DisplayName("GET by invalid ID format returns 400 or 404")
class GetByInvalidIdFormatReturns400Or404Test extends BaseApiTest {

    public static final String TEST_CASE_SPEC_PATH =
            "rest-api-tests/get-single/get_by_invalid_id_format_returns_400_or_404/TEST_CASE.md";

    private static final String INVALID_ID = "abc";

    @Test
    @DisplayName("GET resource by invalid ID format returns 400 or 404")
    void getByInvalidIdFormat_returns400Or404() {
        Assumptions.assumeTrue(ApiConfig.getBaseUrl().isPresent(), "BASE_URL must be set");
        Assumptions.assumeTrue(ApiConfig.getProtectedEndpoint().isPresent(), "PROTECTED_ENDPOINT must be set");

        String basePath = ApiConfig.getProtectedEndpoint().map(p -> p.startsWith("/") ? p : "/" + p).orElseThrow();
        String path = basePath + "/" + INVALID_ID;

        given()
                .spec(baseSpec)
                .when()
                .get(path)
                .then()
                .statusCode(anyOf(equalTo(400), equalTo(404)));
    }
}
