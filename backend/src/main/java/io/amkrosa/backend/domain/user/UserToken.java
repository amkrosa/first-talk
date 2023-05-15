package io.amkrosa.backend.domain.user;

import java.time.LocalDateTime;

public record UserToken(String value, LocalDateTime expirationDate) {
    public static UserToken fromToken(String token) {
        return new UserToken(token, null);
    }
}
