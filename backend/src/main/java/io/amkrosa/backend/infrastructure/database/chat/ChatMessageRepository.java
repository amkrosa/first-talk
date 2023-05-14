package io.amkrosa.backend.infrastructure.database.chat;

import io.amkrosa.backend.domain.chat.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

interface ChatMessageRepository extends JpaRepository<ChatMessage, UUID> {
}
