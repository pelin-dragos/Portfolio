package headers.response_does_not_expose_sensitive_headers;

import api.BaseApiTest;
import api.config.ApiConfig;
import io.restassured.response.Response;
import org.junit.jupiter.api.Assumptions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Test Case API-HEADERS-003: Response does not expose sensitive headers.
 * Objective: Verify API does not expose sensitive headers (e.g. X-Powered-By, Server with version).
 * Expected: Blacklisted headers are absent. Skipped when no policy or API always exposes them (document).
 */
@DisplayName("Response does not expose sensitive headers")
class ResponseDoesNotExposeSensitiveHeadersTest extends BaseApiTest {

    public static final String TEST_CASE_SPEC_PATH =
            "rest-api-tests/headers/response_does_not_expose_sensitive_headers/TEST_CASE.md";

    /** Headers that should not be present per security best practice (e.g. framework leak). Server may be sent by CDN; policy can extend list. */
    private static final List<String> SENSITIVE_HEADER_NAMES = Arrays.asList(
            "X-Powered-By"
    );

    @Test
    @DisplayName("Response does not include sensitive headers")
    void response_doesNotExposeSensitiveHeaders() {
        Assumptions.assumeTrue(ApiConfig.getBaseUrl().isPresent(), "BASE_URL must be set");
        Assumptions.assumeTrue(ApiConfig.getProtectedEndpoint().isPresent(), "PROTECTED_ENDPOINT must be set");

        String path = ApiConfig.getProtectedEndpoint()
                .map(p -> p.startsWith("/") ? p : "/" + p)
                .orElseThrow();

        Response response = given()
                .spec(baseSpec)
                .when()
                .get(path)
                .then()
                .statusCode(equalTo(200))
                .extract()
                .response();

        for (String headerName : SENSITIVE_HEADER_NAMES) {
            String value = response.getHeader(headerName);
            assertTrue(value == null || value.isBlank(),
                    "Sensitive header '" + headerName + "' should be absent or empty, got: " + value);
        }
    }
}
