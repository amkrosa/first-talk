package io.amkrosa.backend.api.chat;

import io.amkrosa.backend.domain.chat.JoinRoom;

import java.util.UUID;

record JoinRoomRequest(String userId) {
    JoinRoom toJoinRoom(String roomId) {
        return new JoinRoom(UUID.fromString(userId), UUID.fromString(roomId));
    }
}
