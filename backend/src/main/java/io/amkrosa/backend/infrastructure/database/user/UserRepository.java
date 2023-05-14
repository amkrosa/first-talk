package io.amkrosa.backend.infrastructure.database.user;

import io.amkrosa.backend.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByName(String name);
    User getUserById(UUID id);
    boolean existsUserById(UUID id);
}
