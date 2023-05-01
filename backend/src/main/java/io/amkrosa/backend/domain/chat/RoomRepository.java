package io.amkrosa.backend.domain.chat;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface RoomRepository extends JpaRepository<Room, UUID> {
    Optional<Room> findByName(String name);
    Room getRoomById(UUID id);
    boolean existsRoomById(UUID id);
    boolean existsRoomByName(String name);
    @Query("SELECT r FROM Room r JOIN FETCH r.users WHERE r.id = :roomId")
    Optional<Room> findByIdWithUsers(@Param("roomId") UUID roomId);
    default boolean notExistsRoomByName(String name) {
        return !existsRoomByName(name);
    }
}
