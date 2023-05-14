package io.amkrosa.backend.infrastructure.database.chat;

import io.amkrosa.backend.domain.chat.BreakoutRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

interface BreakoutRoomRepository extends JpaRepository<BreakoutRoom, UUID> {
}
