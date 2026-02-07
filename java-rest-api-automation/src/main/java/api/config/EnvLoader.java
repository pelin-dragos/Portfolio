package api.config;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Stream;

/**
 * Loads key=value pairs from a .env file into a map. Used by {@link ApiConfig} so that
 * variables can be set in .env (project root) without exporting them in the shell.
 * Values from .env are overridden by real environment variables if both are set.
 */
final class EnvLoader {

    private static final String ENV_FILE = ".env";
    private static final Map<String, String> LOADED = loadEnvFile();

    static Map<String, String> getEnvMap() {
        return LOADED;
    }

    private static Map<String, String> loadEnvFile() {
        Path projectRoot = Paths.get(System.getProperty("user.dir"));
        Path envPath = projectRoot.resolve(ENV_FILE);
        if (!Files.isRegularFile(envPath)) {
            return Collections.emptyMap();
        }
        Map<String, String> map = new HashMap<>();
        try (Stream<String> lines = Files.lines(envPath)) {
            lines.forEach(line -> {
                String trimmed = line.trim();
                if (trimmed.isEmpty() || trimmed.startsWith("#")) {
                    return;
                }
                int eq = trimmed.indexOf('=');
                if (eq <= 0) {
                    return;
                }
                String key = trimmed.substring(0, eq).trim();
                String value = trimmed.substring(eq + 1).trim();
                if (value.startsWith("\"") && value.endsWith("\"") && value.length() >= 2) {
                    value = value.substring(1, value.length() - 1);
                }
                if (!key.isEmpty()) {
                    map.put(key, value);
                }
            });
        } catch (IOException ignored) {
            // .env not readable; fall back to System.getenv only
        }
        return Collections.unmodifiableMap(map);
    }

    private EnvLoader() {
    }
}
