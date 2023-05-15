package io.amkrosa.backend.domain.user;

import java.time.LocalDateTime;

public interface UserTokenPort {
    UserToken generateToken(User user);
    boolean hasInvalidToken(UserToken token, User user);
    User getUserFromToken(UserToken token);
    LocalDateTime getExpirationDate(UserToken token);
}
