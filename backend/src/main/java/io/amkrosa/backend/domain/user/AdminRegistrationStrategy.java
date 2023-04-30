package io.amkrosa.backend.domain.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdminRegistrationStrategy implements RegistrationStrategy{
    private final UserRepository userRepository;

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
        return User.Role.ADMIN;
    }
}
