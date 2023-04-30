package io.amkrosa.backend.api.user;

import io.amkrosa.backend.domain.user.User;

import java.util.List;
import java.util.UUID;

record UserResponse(
        UUID id,
        String name,
        List<String> interests,
        JwtDto auth
) {
    static UserResponse map(User user, String token, String expiration) {
        return new UserResponse(user.getId(), user.getName(), List.of(), new JwtDto(token, expiration));
    }
}
