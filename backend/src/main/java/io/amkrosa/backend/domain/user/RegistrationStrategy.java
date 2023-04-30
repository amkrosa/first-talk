package io.amkrosa.backend.domain.user;

public interface RegistrationStrategy {
    User register(User user);
    boolean validate(User user);
    User.Role getUserRole();
}
