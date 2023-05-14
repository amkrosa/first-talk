package io.amkrosa.backend.api.chat;

import jakarta.validation.constraints.NotNull;

record CreateRoomResponse(@NotNull String roomId) {
}
