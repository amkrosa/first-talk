package io.amkrosa.backend.api.chat;

import io.amkrosa.backend.domain.chat.Room;
import jakarta.validation.constraints.NotNull;
import org.springframework.validation.annotation.Validated;

import java.util.List;

record GetRoomsResponse(@Validated @NotNull List<RoomDto> rooms) {
    static GetRoomsResponse from(List<Room> rooms) {
        return new GetRoomsResponse(rooms.stream().map(RoomDto::from).toList());
    }
}
