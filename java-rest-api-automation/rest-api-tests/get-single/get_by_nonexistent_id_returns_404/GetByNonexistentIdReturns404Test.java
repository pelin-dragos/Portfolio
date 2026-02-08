package get_single.get_by_nonexistent_id_returns_404;

import api.BaseApiTest;
import api.config.ApiConfig;
import org.junit.jupiter.api.Assumptions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

/**
 * Test Case API-GET-SINGLE-003: GET by non-existent ID returns 404.
 * Objective: Verify GET resource-by-ID with non-existent ID returns 404 Not Found.
 * Expected: Status 404; no successful resource body.
 */
@DisplayName("GET by non-existent ID returns 404")
class GetByNonexistentIdReturns404Test extends BaseApiTest {

    public static final String TEST_CASE_SPEC_PATH =
            "rest-api-tests/get-single/get_by_nonexistent_id_returns_404/TEST_CASE.md";

    private static final long NON_EXISTENT_ID = 999999999L;

    @Test
    @DisplayName("GET resource by non-existent ID returns 404")
    void getByNonexistentId_returns404() {
        Assumptions.assumeTrue(ApiConfig.getBaseUrl().isPresent(), "BASE_URL must be set");
        Assumptions.assumeTrue(ApiConfig.getProtectedEndpoint().isPresent(), "PROTECTED_ENDPOINT must be set");

        String basePath = ApiConfig.getProtectedEndpoint().map(p -> p.startsWith("/") ? p : "/" + p).orElseThrow();
        String path = basePath + "/" + NON_EXISTENT_ID;

        given()
                .spec(baseSpec)
                .when()
                .get(path)
                .then()
                .statusCode(equalTo(404));
    }
}
