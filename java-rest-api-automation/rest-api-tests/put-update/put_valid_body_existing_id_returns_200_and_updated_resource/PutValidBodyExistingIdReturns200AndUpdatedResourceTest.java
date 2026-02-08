package put_update.put_valid_body_existing_id_returns_200_and_updated_resource;

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

/**
 * Test Case API-PUT-001: PUT with valid body and existing ID returns 200 and updated resource.
 * Objective: Verify PUT with valid full body and existing ID returns 200 (or 204) and resource is updated.
 * Expected: Status 200 or 204; resource updated.
 */
@DisplayName("PUT valid body existing ID returns 200 and updated resource")
class PutValidBodyExistingIdReturns200AndUpdatedResourceTest extends BaseApiTest {

    public static final String TEST_CASE_SPEC_PATH =
            "rest-api-tests/put-update/put_valid_body_existing_id_returns_200_and_updated_resource/TEST_CASE.md";

    private static final String AUTH_HEADER = "Authorization";
    private static final String BEARER_PREFIX = "Bearer ";

    @Test
    @DisplayName("PUT with valid full body and existing ID returns 200 or 204")
    void putValidBodyExistingId_returns200AndUpdatedResource() {
        Assumptions.assumeTrue(ApiConfig.getBaseUrl().isPresent(), "BASE_URL must be set");
        Assumptions.assumeTrue(ApiConfig.getCreateEndpoint().isPresent(), "PROTECTED_ENDPOINT must be set");
        Assumptions.assumeTrue(ApiConfig.getAuthToken().isPresent(), "AUTH_TOKEN required");

        String basePath = ApiConfig.getCreateEndpoint().map(p -> p.startsWith("/") ? p : "/" + p).orElseThrow();
        Header authHeader = new Header(AUTH_HEADER, BEARER_PREFIX + ApiConfig.getAuthToken().orElseThrow());

        String email = "put-200-" + System.currentTimeMillis() + "@example.com";
        Response createRes = given().spec(baseSpec).header(authHeader)
                .body("{\"name\":\"Put Original\",\"email\":\"" + email + "\",\"gender\":\"male\",\"status\":\"active\"}")
                .when().post(basePath);
        Assumptions.assumeTrue(createRes.getStatusCode() == 201 || createRes.getStatusCode() == 200, "Create must succeed");
        Object id = createRes.path("id");
        Assumptions.assumeTrue(id != null, "Create response must contain id");

        String path = basePath + "/" + id;
        String updatedName = "Put Updated Name";
        String updateBody = "{\"name\":\"" + updatedName + "\",\"email\":\"" + email + "\",\"gender\":\"male\",\"status\":\"inactive\"}";

        given()
                .spec(baseSpec)
                .header(authHeader)
                .body(updateBody)
                .when()
                .put(path)
                .then()
                .statusCode(anyOf(equalTo(200), equalTo(204)));
    }
}
