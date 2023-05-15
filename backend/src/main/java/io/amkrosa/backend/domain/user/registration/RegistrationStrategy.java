package io.amkrosa.backend.domain.user.registration;

import io.amkrosa.backend.domain.user.User;

public interface RegistrationStrategy {
    User register(User user);
    boolean validate(User user);
    User.Role getUserRole();
}
