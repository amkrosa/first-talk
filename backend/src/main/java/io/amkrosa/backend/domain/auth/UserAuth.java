package io.amkrosa.backend.domain.auth;

import io.amkrosa.backend.domain.user.User;
import org.apache.commons.lang3.StringUtils;

import java.util.Map;
import java.util.UUID;

public record UserAuth(UUID userId, String username, String email, String password, String role) {
    public static UserAuth fromUser(User user) {
        return new UserAuth(user.getId(), user.getName(), user.getEmail(), user.getPassword(), user.getRole().toString());
    }
    Map<String, String> toMap() {
        return Map.of(
                "id", userId.toString(),
                "username", username,
                "email", email == null ? StringUtils.EMPTY : email,
                "password", password == null ? StringUtils.EMPTY : password,
                "role", role
                );
    }
}
