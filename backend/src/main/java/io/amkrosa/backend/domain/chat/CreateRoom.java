package io.amkrosa.backend.domain.chat;

import io.amkrosa.backend.domain.user.User;

import java.util.UUID;

public record CreateRoom(UUID userId, String roomName) {
    Room toRoom(User moderator) {
        return new Room(roomName, moderator);
    }
}
