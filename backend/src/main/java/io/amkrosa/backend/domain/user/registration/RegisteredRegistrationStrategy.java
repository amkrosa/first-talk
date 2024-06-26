package io.amkrosa.backend.domain.user.registration;

import io.amkrosa.backend.domain.user.User;
import io.amkrosa.backend.domain.user.UserPort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
class RegisteredRegistrationStrategy implements RegistrationStrategy{
    private final UserPort userPort;

    @Override
    public User register(User user) {
        return null;
    }

    @Override
    public boolean validate(User user) {
        return false;
    }

    @Override
    public User.Role getUserRole() {
        return User.Role.REGISTERED;
    }
}
