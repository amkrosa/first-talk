package io.amkrosa.backend.domain.chat;

import java.util.UUID;

public record JoinRoom(UUID userId, UUID roomId) {
}
