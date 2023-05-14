package io.amkrosa.backend.infrastructure.database.chat;

import io.amkrosa.backend.domain.chat.ChatMessage;
import io.amkrosa.backend.domain.chat.ChatMessagePort;
import io.amkrosa.backend.domain.user.User;

import java.util.List;

class ChatMessageAdapter implements ChatMessagePort {
    @Override
    public List<ChatMessage> findBetween(User firstUser, User secondUser) {
        return null;
    }

    @Override
    public ChatMessage save(ChatMessage chatMessage) {
        return null;
    }

    @Override
    public ChatMessage remove(ChatMessage chatMessage) {
        return null;
    }
}
