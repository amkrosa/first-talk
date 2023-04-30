package io.amkrosa.backend.domain.auth;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@ConfigurationProperties(prefix = "jwt")
@Component
@Data
public class JwtProperties {
    private String secretKey;
    private String validityInMillis;
}
