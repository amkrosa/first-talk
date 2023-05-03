package io.amkrosa.backend.domain.chat;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface BreakoutRoomRepository extends JpaRepository<BreakoutRoom, UUID> {
}
