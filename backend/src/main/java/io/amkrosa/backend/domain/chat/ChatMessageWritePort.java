package io.amkrosa.backend.domain.chat;

import java.util.UUID;

public interface ChatMessageWritePort {
    ChatMessage save(ChatMessage chatMessage);
    ChatMessage remove(ChatMessage chatMessage);
}
