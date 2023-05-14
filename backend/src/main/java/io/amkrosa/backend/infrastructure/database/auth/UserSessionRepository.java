package io.amkrosa.backend.infrastructure.database.auth;

import io.amkrosa.backend.domain.auth.UserSession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

interface UserSessionRepository extends JpaRepository<UserSession, UUID> {
}
