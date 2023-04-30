package io.amkrosa.backend.domain.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByName(String name);
    User getUserById(UUID id);
    boolean existsUserById(UUID id);
}
