package io.amkrosa.backend.infrastructure.database.user;

import io.amkrosa.backend.domain.user.User;
import io.amkrosa.backend.domain.user.UserSession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

interface UserSessionRepository extends JpaRepository<UserSession, UUID> {
    Optional<UserSession> findUserSessionByUser(User user);
}
