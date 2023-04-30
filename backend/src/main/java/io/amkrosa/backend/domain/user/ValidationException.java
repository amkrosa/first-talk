package io.amkrosa.backend.domain.user;

public class ValidationException extends RuntimeException {
    private ValidationException(String message) {
        super(message);
    }

    public static ValidationException userRegistrationValidationFailed(User user) {
        return new ValidationException(String.format("User registration failed for username %s for role %s.",
                user.getName(), user.getRole()));
    }
}
