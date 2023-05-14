package io.amkrosa.backend.domain.chat;

import io.amkrosa.backend.configuration.DateProvider;
import io.amkrosa.backend.domain.user.UserPort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BreakoutRoomsService {
    private final RoomPort roomPort;
    private final BreakoutRoomPort breakoutRoomPort;
    private final DateProvider dateProvider;

    @Transactional
    public List<BreakoutRoom> createBreakoutRooms(UUID roomId) {
        //TODO better exception
        var room = roomPort.findRoom(roomId).orElseThrow(() -> new UnsupportedOperationException("room not found"));
        if (room.getUsers().size() % 2 != 0) {
            //TODO better exception
            throw new UnsupportedOperationException("odd user number");
        }

        var pairs = room.splitUsersToPairs();
        var breakoutRooms = pairs.stream()
                .map(pair -> new BreakoutRoom(room, pair, dateProvider.now()))
                .collect(Collectors.toSet());
        return breakoutRoomPort.saveAll(breakoutRooms);
    }
}
