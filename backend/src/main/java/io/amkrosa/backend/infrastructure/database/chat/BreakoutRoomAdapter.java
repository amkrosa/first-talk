package io.amkrosa.backend.infrastructure.database.chat;

import io.amkrosa.backend.domain.chat.BreakoutRoom;
import io.amkrosa.backend.domain.chat.BreakoutRoomPort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.List;

@Component
@RequiredArgsConstructor
class BreakoutRoomAdapter implements BreakoutRoomPort {
    private final BreakoutRoomRepository breakoutRoomRepository;

    @Override
    public List<BreakoutRoom> saveAll(Collection<BreakoutRoom> breakoutRooms) {
        return breakoutRoomRepository.saveAll(breakoutRooms);
    }
}
