package io.amkrosa.backend.api.user;

import io.amkrosa.backend.domain.user.User;

import java.util.List;

record UserRequest(
        String name,
        String type,
        String password,
        String email,
        List<String> interests
) {
    public User toGuestUser() {
        return User.builder()
                .name(name)
                .role(User.Role.GUEST)
                .build();
    }

    public User toRegisteredUser() {
        return User.builder()
                .name(name)
                .password(password)
                .role(User.Role.REGISTERED)
                .email(email)
                .build();
    }
}
