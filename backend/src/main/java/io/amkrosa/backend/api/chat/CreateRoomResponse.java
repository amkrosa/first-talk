package io.amkrosa.backend.api.chat;

import jakarta.validation.constraints.NotNull;

public record CreateRoomResponse(@NotNull String roomId) {
}
