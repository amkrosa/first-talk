package io.amkrosa.backend.infrastructure.database.user;

import io.amkrosa.backend.domain.user.User;
import io.amkrosa.backend.domain.user.UserPort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@Component
class UserAdapter implements UserPort {
    private final UserRepository userRepository;

    @Override
    public Optional<User> findUser(String name) {
        return userRepository.findByName(name);
    }

    @Override
    public Optional<User> findUser(UUID id) {
        return userRepository.findById(id);
    }

    @Override
    public User getUser(UUID id) {
        return userRepository.getUserById(id);
    }

    @Override
    public boolean existsUser(UUID id) {
        return userRepository.existsUserById(id);
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }
}
