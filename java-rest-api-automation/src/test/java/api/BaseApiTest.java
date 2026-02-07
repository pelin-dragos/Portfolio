package api;

import api.config.ApiConfig;
import io.restassured.RestAssured;
import io.restassured.builder.RequestSpecBuilder;
import io.restassured.http.ContentType;
import io.restassured.specification.RequestSpecification;
import org.junit.jupiter.api.BeforeEach;

import java.util.Optional;

/**
 * Base class for REST API tests. Sets base URI and default request spec from config.
 * Tests that require auth or a specific endpoint obtain them via ApiConfig (env).
 */
public abstract class BaseApiTest {

    protected RequestSpecification baseSpec;

    @BeforeEach
    void setUpBaseApi() {
        Optional<String> baseUrl = ApiConfig.getBaseUrl();
        RequestSpecBuilder builder = new RequestSpecBuilder();
        baseUrl.ifPresent(url -> {
            RestAssured.baseURI = url.endsWith("/") ? url.substring(0, url.length() - 1) : url;
            builder.setBaseUri(RestAssured.baseURI);
        });
        builder.setContentType(ContentType.JSON);
        builder.setAccept(ContentType.JSON);
        baseSpec = builder.build();
    }
}
