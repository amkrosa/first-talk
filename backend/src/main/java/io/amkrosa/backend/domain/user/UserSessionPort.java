package io.amkrosa.backend.domain.user;

import java.util.Optional;

public interface UserSessionPort {
    UserSession save(UserSession userSession);
    Optional<UserSession> find(User user);
    void delete(UserSession userSession);
}
