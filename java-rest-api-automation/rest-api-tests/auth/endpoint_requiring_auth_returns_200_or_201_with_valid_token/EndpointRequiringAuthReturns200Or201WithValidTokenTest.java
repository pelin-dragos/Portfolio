package auth.endpoint_requiring_auth_returns_200_or_201_with_valid_token;

import api.BaseApiTest;
import api.config.ApiConfig;
import io.restassured.http.Header;
import io.restassured.response.ValidatableResponse;
import org.junit.jupiter.api.Assumptions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.anyOf;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.notNullValue;

/**
 * Automated implementation of test case <b>API-AUTH-002</b>.
 * <p>
 * <b>Source of verification (test case spec):</b><br>
 * {@link #TEST_CASE_SPEC_PATH}
 * <p>
 * <b>Objective (from spec):</b> Verify that an endpoint requiring authentication returns
 * a success status (200 or 201) and the expected data when the request includes a valid
 * authentication token.
 * <p>
 * <b>Expected result (from spec):</b> Response status 200 or 201; body contains expected
 * data; no 401 or 403.
 *
 * Traceability: see {@link #TEST_CASE_SPEC_PATH} for the test case document path (TEST_CASE.md in this folder).
 */
@DisplayName("Endpoint requiring auth returns 200 or 201 with valid token")
class EndpointRequiringAuthReturns200Or201WithValidTokenTest extends BaseApiTest {

    /** Path to the test case specification (relative to project root). Use for traceability. */
    public static final String TEST_CASE_SPEC_PATH =
            "rest-api-tests/auth/endpoint_requiring_auth_returns_200_or_201_with_valid_token/TEST_CASE.md";

    private static final String AUTH_HEADER_NAME = "Authorization";
    private static final String BEARER_PREFIX = "Bearer ";

    @Test
    @DisplayName("GET protected endpoint with valid token returns success and data")
    void endpointRequiringAuth_withValidToken_returns200Or201AndData() {
        // TEST_CASE Step 1: Obtain valid auth from config/env
        Assumptions.assumeTrue(ApiConfig.getBaseUrl().isPresent(),
                "BASE_URL must be set (e.g. from .env or environment)");
        Assumptions.assumeTrue(ApiConfig.getAuthToken().isPresent(),
                "AUTH_TOKEN must be set for this test");

        String path = ApiConfig.getProtectedEndpoint()
                .map(p -> p.startsWith("/") ? p : "/" + p)
                .orElse("/api/protected/resource");
        Header authHeader = new Header(AUTH_HEADER_NAME, BEARER_PREFIX + ApiConfig.getAuthToken().orElseThrow());

        // TEST_CASE Step 2–3: Send request to protected endpoint with valid auth; capture response
        ValidatableResponse response = given()
                .spec(baseSpec)
                .header(authHeader)
                .when()
                .get(path)
                .then();

        // TEST_CASE Step 4 & Expected Result: Verify success status and that data is returned
        response.statusCode(anyOf(equalTo(200), equalTo(201)));
        response.body(notNullValue());
    }
}
