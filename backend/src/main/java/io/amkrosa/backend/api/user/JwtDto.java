package io.amkrosa.backend.api.user;

import io.amkrosa.backend.domain.user.UserToken;
import jakarta.validation.constraints.NotNull;

record JwtDto(@NotNull String jwt, @NotNull String expiration) {
    static JwtDto from(UserToken userToken) {
        return new JwtDto(userToken.value(), userToken.expirationDate().toString());
    }
}
