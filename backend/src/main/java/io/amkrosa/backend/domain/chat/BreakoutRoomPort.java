package io.amkrosa.backend.domain.chat;

import java.util.Collection;
import java.util.List;

public interface BreakoutRoomPort {
    List<BreakoutRoom> saveAll(Collection<BreakoutRoom> breakoutRooms);
}
