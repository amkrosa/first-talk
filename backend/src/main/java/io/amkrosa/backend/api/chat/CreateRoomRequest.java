package io.amkrosa.backend.api.chat;

import io.amkrosa.backend.domain.chat.CreateRoom;

import java.util.UUID;

record CreateRoomRequest(
    String userId,
    String name
) {
    CreateRoom toCreateRoom() {
        return new CreateRoom(UUID.fromString(userId), name);
    }
}
