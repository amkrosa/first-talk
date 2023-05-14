package io.amkrosa.backend.infrastructure.database.chat;

import io.amkrosa.backend.domain.chat.Room;
import io.amkrosa.backend.domain.chat.RoomPort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
class RoomAdapter implements RoomPort {
    private final RoomRepository roomRepository;

    @Override
    public Optional<Room> findRoom(UUID id) {
        return roomRepository.findById(id);
    }

    @Override
    public List<Room> findAll() {
        return roomRepository.findAll();
    }

    @Override
    public Room getRoom(UUID id) {
        return roomRepository.getRoomById(id);
    }

    @Override
    public boolean existsRoom(UUID id) {
        return roomRepository.existsRoomById(id);
    }

    @Override
    public boolean existsRoom(String name) {
        return roomRepository.existsRoomByName(name);
    }

    @Override
    public Optional<Room> findRoomWithUsers(UUID roomId) {
        return roomRepository.findByIdWithUsers(roomId);
    }

    @Override
    public boolean hasNotRoom(String name) {
        return roomRepository.notExistsRoomByName(name);
    }

    @Override
    public Room save(Room room) {
        return roomRepository.save(room);
    }
}
