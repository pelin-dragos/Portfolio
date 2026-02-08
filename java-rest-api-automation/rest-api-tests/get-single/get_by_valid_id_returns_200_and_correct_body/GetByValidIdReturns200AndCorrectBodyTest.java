package get_single.get_by_valid_id_returns_200_and_correct_body;

import api.BaseApiTest;
import api.config.ApiConfig;
import io.restassured.response.Response;
import org.junit.jupiter.api.Assumptions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Map;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Test Case API-GET-SINGLE-001: GET by valid ID returns 200 and correct body.
 * Objective: Verify GET resource-by-ID with valid existing ID returns 200 and single resource with matching ID.
 * Expected: Status 200; body is single object; ID in path matches ID in body.
 */
@DisplayName("GET by valid ID returns 200 and correct body")
class GetByValidIdReturns200AndCorrectBodyTest extends BaseApiTest {

    public static final String TEST_CASE_SPEC_PATH =
            "rest-api-tests/get-single/get_by_valid_id_returns_200_and_correct_body/TEST_CASE.md";

    @Test
    @DisplayName("GET resource by valid ID returns 200 and correct body")
    void getByValidId_returns200AndCorrectBody() {
        Assumptions.assumeTrue(ApiConfig.getBaseUrl().isPresent(), "BASE_URL must be set");
        Assumptions.assumeTrue(ApiConfig.getProtectedEndpoint().isPresent(), "PROTECTED_ENDPOINT must be set");

        String basePath = ApiConfig.getProtectedEndpoint().map(p -> p.startsWith("/") ? p : "/" + p).orElseThrow();
        List<Map<String, Object>> list = given()
                .spec(baseSpec)
                .when()
                .get(basePath)
                .then()
                .extract()
                .body()
                .jsonPath()
                .getList("$");
        Assumptions.assumeTrue(list != null && !list.isEmpty(), "List must have at least one resource to get by ID");
        Object id = list.get(0).get("id");
        Assumptions.assumeTrue(id != null, "First resource must have id");

        String path = basePath + "/" + id;

        Response response = given()
                .spec(baseSpec)
                .when()
                .get(path)
                .then()
                .statusCode(equalTo(200))
                .extract()
                .response();

        Map<String, Object> body = response.jsonPath().getMap("$");
        assertNotNull(body, "Response must be single resource object");
        assertTrue(body.containsKey("id"), "Body must contain id");
        assertTrue(String.valueOf(id).equals(String.valueOf(body.get("id"))),
                "ID in body must match requested ID");
    }
}
