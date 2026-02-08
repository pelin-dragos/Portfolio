package get_single.get_by_valid_id_returns_expected_fields_and_types;

import api.BaseApiTest;
import api.config.ApiConfig;
import io.restassured.path.json.JsonPath;
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
 * Test Case API-GET-SINGLE-002: GET by valid ID returns expected fields and types.
 * Objective: Verify response contains required fields with correct types per API contract.
 * Expected: Status 200; required fields present; types match (e.g. id number, name string).
 */
@DisplayName("GET by valid ID returns expected fields and types")
class GetByValidIdReturnsExpectedFieldsAndTypesTest extends BaseApiTest {

    public static final String TEST_CASE_SPEC_PATH =
            "rest-api-tests/get-single/get_by_valid_id_returns_expected_fields_and_types/TEST_CASE.md";

    @Test
    @DisplayName("GET resource by valid ID returns expected fields and types")
    void getByValidId_returnsExpectedFieldsAndTypes() {
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
        Assumptions.assumeTrue(list != null && !list.isEmpty(), "List must have at least one resource");
        Object id = list.get(0).get("id");
        Assumptions.assumeTrue(id != null, "First resource must have id");

        String path = basePath + "/" + id;
        JsonPath jsonPath = given()
                .spec(baseSpec)
                .when()
                .get(path)
                .then()
                .statusCode(equalTo(200))
                .extract()
                .body()
                .jsonPath();

        assertNotNull(jsonPath.get("id"), "id must be present");
        assertTrue(jsonPath.get("id") instanceof Number,
                "id must be number type");
        assertNotNull(jsonPath.get("name"), "name must be present");
        assertTrue(jsonPath.get("name") instanceof String, "name must be string");
        assertNotNull(jsonPath.get("email"), "email must be present");
        assertTrue(jsonPath.get("email") instanceof String, "email must be string");
    }
}
