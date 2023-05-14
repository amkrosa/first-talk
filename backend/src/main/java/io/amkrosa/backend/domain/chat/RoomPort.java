package io.amkrosa.backend.domain.chat;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface RoomPort {
    Optional<Room> findRoom(UUID id);
    List<Room> findAll();
    Room getRoom(UUID id);
    boolean existsRoom(UUID id);
    boolean existsRoom(String name);
    Optional<Room> findRoomWithUsers(UUID roomId);
    boolean hasNotRoom(String name);
    Room save(Room room);
}
