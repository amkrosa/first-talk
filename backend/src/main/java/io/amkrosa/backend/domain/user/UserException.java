package io.amkrosa.backend.domain.user;

import java.util.UUID;

public class UserException extends RuntimeException {

    public static class UserNotFoundException extends RuntimeException {
        public UserNotFoundException(UUID userId) {
            super(String.format("User has not been found [userId=%s]", userId.toString()));
        }

        public UserNotFoundException(String username, UUID userId) {
            super(String.format("User has not been found [username=%s, userId=%s]", username, userId.toString()));
        }
    }
}
