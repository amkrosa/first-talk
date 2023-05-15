package io.amkrosa.backend.infrastructure.database.user;

import io.amkrosa.backend.domain.user.User;
import io.amkrosa.backend.domain.user.UserSession;
import io.amkrosa.backend.domain.user.UserSessionPort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
class UserSessionAdapter implements UserSessionPort {
    private final UserSessionRepository userSessionRepository;

    @Override
    public UserSession save(UserSession userSession) {
        return userSessionRepository.save(userSession);
    }

    @Override
    public Optional<UserSession> find(User user) {
        return userSessionRepository.findUserSessionByUser(user);
    }

    @Override
    public void delete(UserSession userSession) {
        userSessionRepository.delete(userSession);
    }
}
