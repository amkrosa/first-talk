package io.amkrosa.backend.domain.chat;

import io.amkrosa.backend.configuration.DateProvider;
import io.amkrosa.backend.domain.user.User;
import io.amkrosa.backend.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BreakoutRoomsService {
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;
    private final BreakoutRoomRepository breakoutRoomRepository;
    private final DateProvider dateProvider;

    @Transactional
    public List<BreakoutRoom> createBreakoutRooms(UUID roomId) {
        //TODO better exception
        var room = roomRepository.findById(roomId).orElseThrow(() -> new UnsupportedOperationException("room not found"));
        if (room.getUsers().size() % 2 != 0) {
            //TODO better exception
            throw new UnsupportedOperationException("odd user number");
        }

        var pairs = room.splitUsersToPairs();
        var breakoutRooms = pairs.stream()
                .map(pair -> new BreakoutRoom(room, pair, dateProvider.now()))
                .collect(Collectors.toSet());
        return breakoutRoomRepository.saveAll(breakoutRooms);
    }
}
