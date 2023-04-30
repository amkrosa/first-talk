package io.amkrosa.backend.domain.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class GuestRegistrationStrategy implements RegistrationStrategy {
    private final UserRepository userRepository;

    @Override
    public User register(User user) {
        if (validate(user)) {
            log.debug("Validation successful! [name={}, role={}]", user.getName(), user.getRole());
            return userRepository.save(user);
        }
        throw ValidationException.userRegistrationValidationFailed(user);
    }

    @Override
    public boolean validate(User user) {
        log.debug("Validating user... [name={}, role={}]", user.getName(), user.getRole());
        return userRepository.findByName(user.getName())
                .isEmpty();
    }

    @Override
    public User.Role getUserRole() {
        return User.Role.GUEST;
    }
}
