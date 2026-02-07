package auth.endpoint_requiring_role_returns_403_with_insufficient_permissions;

import api.BaseApiTest;
import api.config.ApiConfig;
import io.restassured.http.Header;
import io.restassured.response.ValidatableResponse;
import org.junit.jupiter.api.Assumptions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

/**
 * Test Case API-AUTH-003: Endpoint requiring role returns 403 with insufficient permissions.
 * Objective: Verify that a valid token without the required role returns HTTP 403 Forbidden.
 * Expected: Status 403; no protected data. Skipped when API does not enforce role-based access.
 */
@DisplayName("Endpoint requiring role returns 403 with insufficient permissions")
class EndpointRequiringRoleReturns403WithInsufficientPermissionsTest extends BaseApiTest {

    public static final String TEST_CASE_SPEC_PATH =
            "rest-api-tests/auth/endpoint_requiring_role_returns_403_with_insufficient_permissions/TEST_CASE.md";

    private static final String AUTH_HEADER_NAME = "Authorization";
    private static final String BEARER_PREFIX = "Bearer ";

    @Test
    @DisplayName("GET role-protected endpoint with user token returns 403")
    void endpointRequiringRole_withUserToken_returns403() {
        // TEST_CASE Step 1: Obtain valid token that does not have the required role (e.g. user token)
        Assumptions.assumeTrue(ApiConfig.getBaseUrl().isPresent(), "BASE_URL must be set");
        Assumptions.assumeTrue(ApiConfig.getUserToken().isPresent(),
                "USER_TOKEN (low-privilege token) must be set for this test");
        String roleEndpoint = ApiConfig.getAdminEndpoint()
                .or(() -> ApiConfig.getProtectedEndpoint())
                .map(p -> p.startsWith("/") ? p : "/" + p)
                .orElse(null);
        Assumptions.assumeTrue(roleEndpoint != null, "ADMIN_ENDPOINT or PROTECTED_ENDPOINT must be set");

        Header authHeader = new Header(AUTH_HEADER_NAME, BEARER_PREFIX + ApiConfig.getUserToken().orElseThrow());

        // TEST_CASE Step 2–3: Send request to endpoint that requires higher privileges; capture response
        ValidatableResponse response = given()
                .spec(baseSpec)
                .header(authHeader)
                .when()
                .get(roleEndpoint)
                .then();

        // TEST_CASE Expected Result: 403 Forbidden when API enforces roles
        response.statusCode(equalTo(403));
    }
}
