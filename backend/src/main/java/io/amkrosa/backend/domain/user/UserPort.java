package io.amkrosa.backend.domain.user;

import java.util.Optional;
import java.util.UUID;

public interface UserPort {
    Optional<User> findUser(String name);
    Optional<User> findUser(UUID id);
    User getUser(UUID id);
    boolean existsUser(UUID id);
    User saveUser(User user);
}
