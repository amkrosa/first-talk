package io.amkrosa.backend.domain.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final RegistrationStrategyCollector registrationStrategyCollector;

    public User register(User user) {
        return registrationStrategyCollector.choose(user.getRole())
                .register(user);
    }
}
