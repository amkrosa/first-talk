package io.amkrosa.backend.domain.chat;

import io.amkrosa.backend.domain.user.User;

import java.time.LocalDateTime;
import java.util.UUID;

public record ChatMessage(
        Destination destination,
        Room room,
        User sender,
        User receiver,
        Payload payload,
        LocalDateTime timestamp
) {
    public record Payload(String message) {}
}
