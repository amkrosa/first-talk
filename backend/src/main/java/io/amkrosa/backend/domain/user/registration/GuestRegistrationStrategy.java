package io.amkrosa.backend.domain.user.registration;

import io.amkrosa.backend.domain.user.User;
import io.amkrosa.backend.domain.user.UserPort;
import io.amkrosa.backend.domain.user.ValidationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
class GuestRegistrationStrategy implements RegistrationStrategy {
    private final UserPort userPort;

    @Override
    public User register(User user) {
        if (validate(user)) {
            log.debug("Validation successful! [name={}, role={}]", user.getName(), user.getRole());
            return userPort.saveUser(user);
        }
        throw ValidationException.userRegistrationValidationFailed(user);
    }

    @Override
    public boolean validate(User user) {
        log.debug("Validating user... [name={}, role={}]", user.getName(), user.getRole());
        return userPort.findUser(user.getName())
                .isEmpty();
    }

    @Override
    public User.Role getUserRole() {
        return User.Role.GUEST;
    }
}
