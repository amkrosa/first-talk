package io.amkrosa.backend.domain.chat;

import io.amkrosa.backend.domain.user.User;
import io.amkrosa.backend.domain.user.UserPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatService {
    private final RoomPort roomPort;
    private final UserPort userPort;

    @Transactional
    public UUID createRoom(CreateRoom createRoom) {
        if (roomPort.hasNotRoom(createRoom.roomName())) {
            log.debug("Looking for user designed as moderator of room [userId={}, roomName={}]", createRoom.userId(), createRoom.roomName());
            var roomModerator = userPort.findUser(createRoom.userId())
                    .orElseThrow(() -> new UnsupportedOperationException(String.format("Could not find user by id [userId=%s]", createRoom.userId())));
            log.debug("Found user designed as moderator of room [userId={}, roomName={}, name={}]", createRoom.userId(), createRoom.roomName(), roomModerator.getName());

            var room = roomPort.save(createRoom.toRoom(roomModerator));
            log.debug("Saved room to database [roomName={}, roomId={}]", room.getName(), room.getId());
            return room.getId();
        }

        throw new UnsupportedOperationException(String.format("Duplicated room name [roomName=%s]", createRoom.roomName()));
    }

    public List<Room> getRooms() {
        return roomPort.findAll();
    }

    @Transactional
    public User joinRoom(JoinRoom joinRoom) {
        //TODO security measures - check if user has session token
        if (canJoinRoom(joinRoom)) {
            var user = userPort.getUser(joinRoom.userId());
            var room = roomPort.getRoom(joinRoom.roomId());
            room.addUserToRoom(user);
            log.debug("User added to the room [userName={}, roomName={}, roomId={}, userId={}]", user.getName(), room.getName(), room.getId(), user.getId());
            return user;
        }
        throw new UnsupportedOperationException(String.format("User cannot join room [roomId=%s, userId=%s]", joinRoom.roomId(), joinRoom.userId()));
    }

    public Room getRoom(UUID roomId) {
        return roomPort.findRoom(roomId).orElseThrow(() -> new UnsupportedOperationException("room not found"));
    }

    public Room getRoomWithUsers(UUID roomId) {
        return roomPort.findRoomWithUsers(roomId).orElseThrow(() -> new UnsupportedOperationException("room not found"));
    }

    private boolean canJoinRoom(JoinRoom joinRoom) {
        var room = roomPort.findRoom(joinRoom.roomId());
        return room.isPresent()
                && room.get().getUsers().stream().noneMatch(user -> user.getId().equals(joinRoom.userId()))
                && userPort.existsUser(joinRoom.userId());
    }
}
