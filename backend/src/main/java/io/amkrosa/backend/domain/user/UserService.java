package io.amkrosa.backend.domain.user;

import io.amkrosa.backend.domain.user.registration.RegistrationStrategyCollector;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;
import static io.amkrosa.backend.domain.user.UserException.UserTokenInvalid;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    private final RegistrationStrategyCollector registrationStrategyCollector;
    private final UserTokenPort userTokenPort;
    private final UserPort userPort;
    private final UserSessionPort userSessionPort;

    public User register(User user) {
        return registrationStrategyCollector.choose(user.getRole())
                .register(user);
    }

    public UserToken generateToken(User user) {
        var token = userTokenPort.generateToken(user);
        userSessionPort.find(user)
                .ifPresentOrElse(userSessionPort::delete,
                                 () -> userSessionPort.save(new UserSession(token, user)));
        return token;
    }

    public Optional<User> retrieveUserFromToken(UserToken token) {
        log.debug("Retrieving user from token...");
        var userFromToken = userTokenPort.getUserFromToken(token);
        log.debug("Retrieved user from token [username={}]", userFromToken.getName());
        var user = userPort.findUser(userFromToken.getId());
        if (user.isPresent()) {
            log.debug("Found user in the database [username={}]", user.get().getName());
        } else {
            log.debug("User not found in the database [username={}]", userFromToken.getName());
            return user;
        }

        if (userTokenPort.hasInvalidToken(token, user.get())) {
            return Optional.empty();
        }

        return user;
    }
}
