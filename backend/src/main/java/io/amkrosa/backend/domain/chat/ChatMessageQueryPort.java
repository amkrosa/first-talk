package io.amkrosa.backend.domain.chat;

import io.amkrosa.backend.domain.user.User;

import java.util.List;

public interface ChatMessageQueryPort {
    List<ChatMessage> findBetween(User firstUser, User secondUser);
}
