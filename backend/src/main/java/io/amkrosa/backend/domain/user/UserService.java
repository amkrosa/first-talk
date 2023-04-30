package io.amkrosa.backend.domain.user;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final RegistrationStrategyCollector registrationStrategyCollector;

    public User registerGuestUser(User user) {
        return null;
    }

    public User register(User user) {
        return registrationStrategyCollector.choose(user.getRole())
                .register(user);
    }

}
