package io.amkrosa.backend.api.chat;

import io.amkrosa.backend.domain.chat.Room;

import java.util.List;

public record GetRoomsResponse(List<RoomDto> rooms) {
    static GetRoomsResponse from(List<Room> rooms) {
        return new GetRoomsResponse(rooms.stream().map(RoomDto::from).toList());
    }
}
