package patch_update.patch_nonexistent_id_returns_404;

import api.BaseApiTest;
import api.config.ApiConfig;
import io.restassured.http.Header;
import org.junit.jupiter.api.Assumptions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

/**
 * Test Case API-PATCH-003: PATCH with non-existent ID returns 404.
 * Objective: Verify PATCH with non-existent resource ID returns 404; no resource created/updated.
 * Expected: Status 404.
 */
@DisplayName("PATCH nonexistent ID returns 404")
class PatchNonexistentIdReturns404Test extends BaseApiTest {

    public static final String TEST_CASE_SPEC_PATH =
            "rest-api-tests/patch-update/patch_nonexistent_id_returns_404/TEST_CASE.md";

    private static final String AUTH_HEADER = "Authorization";
    private static final String BEARER_PREFIX = "Bearer ";
    private static final long NON_EXISTENT_ID = 999999999L;
    private static final String PARTIAL_BODY = "{\"status\":\"inactive\"}";

    @Test
    @DisplayName("PATCH with non-existent ID returns 404")
    void patchNonexistentId_returns404() {
        Assumptions.assumeTrue(ApiConfig.getBaseUrl().isPresent(), "BASE_URL must be set");
        Assumptions.assumeTrue(ApiConfig.getProtectedEndpoint().isPresent(), "PROTECTED_ENDPOINT must be set");
        Assumptions.assumeTrue(ApiConfig.getAuthToken().isPresent(), "AUTH_TOKEN required for PATCH");

        String basePath = ApiConfig.getProtectedEndpoint().map(p -> p.startsWith("/") ? p : "/" + p).orElseThrow();
        String path = basePath + "/" + NON_EXISTENT_ID;
        Header authHeader = new Header(AUTH_HEADER, BEARER_PREFIX + ApiConfig.getAuthToken().orElseThrow());

        given()
                .spec(baseSpec)
                .header(authHeader)
                .body(PARTIAL_BODY)
                .when()
                .patch(path)
                .then()
                .statusCode(equalTo(404));
    }
}
