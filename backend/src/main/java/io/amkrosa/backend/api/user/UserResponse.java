package io.amkrosa.backend.api.user;

import io.amkrosa.backend.domain.user.User;
import jakarta.validation.constraints.NotNull;
import org.springframework.validation.annotation.Validated;

import java.util.List;
import java.util.UUID;

record UserResponse(
        @NotNull
        UUID id,
        @NotNull
        String name,
        List<String> interests,
        @NotNull
        @Validated
        JwtDto auth
) {
    static UserResponse map(User user, String token, String expiration) {
        return new UserResponse(user.getId(), user.getName(), List.of(), new JwtDto(token, expiration));
    }
}
