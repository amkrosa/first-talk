package io.amkrosa.backend.domain.auth;

import io.amkrosa.backend.domain.user.User;
import io.amkrosa.backend.domain.user.UserPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserProvider {
    private final UserPort userPort;
    private final JwtProvider jwtProvider;

    public Optional<User> retrieveUserFromToken(String token) {
        log.debug("Retrieving user from token...");
        var userAuth = jwtProvider.getUserAuthFromToken(token);
        log.debug("Retrieved user from token [username={}]", userAuth.username());
        var user = userPort.findUser(userAuth.userId());
        if (user.isPresent()) {
            log.debug("Found user in the database [username={}]", user.get().getName());
        } else {
            log.debug("User not found in the database [username={}]", userAuth.username());
        }
        return user;
    }
}
