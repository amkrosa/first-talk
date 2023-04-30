package io.amkrosa.backend.domain.auth;

import io.amkrosa.backend.domain.user.User;
import org.apache.commons.lang3.StringUtils;

import java.util.Map;

public record UserAuth(String username, String email, String password, String role) {
    public static UserAuth fromUser(User user) {
        return new UserAuth(user.getName(), user.getEmail(), user.getPassword(), user.getRole().toString());
    }
    Map<String, String> toMap() {
        return Map.of(
                "username", username,
                "email", email == null ? StringUtils.EMPTY : email,
                "password", password == null ? StringUtils.EMPTY : password,
                "role", role
                );
    }
}
