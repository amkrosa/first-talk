package io.amkrosa.backend.api.chat;

import io.amkrosa.backend.domain.chat.Room;
import jakarta.validation.constraints.NotNull;

public record RoomDto(
        @NotNull
        String name,
        @NotNull
        String roomId,
        @NotNull
        Integer userCount,
        @NotNull
        Boolean inProgress) {
    static RoomDto from(Room room) {
        return new RoomDto(room.getName(), room.getId().toString(), room.getUserCount(), room.getInProgress());
    }
}
