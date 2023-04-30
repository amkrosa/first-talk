package io.amkrosa.backend.api.chat;

import io.amkrosa.backend.domain.chat.Room;

public record RoomDto(String name, String roomId, Integer userCount) {
    static RoomDto from(Room room) {
        return new RoomDto(room.getName(), room.getId().toString(), room.getUserCount());
    }
}
