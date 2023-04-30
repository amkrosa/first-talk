package io.amkrosa.backend.domain.chat;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface RoomRepository extends JpaRepository<Room, UUID> {
    Optional<Room> findByName(String name);
    Room getRoomById(UUID id);
    boolean existsRoomById(UUID id);
    boolean existsRoomByName(String name);
    default boolean notExistsRoomByName(String name) {
        return !existsRoomByName(name);
    }
}
