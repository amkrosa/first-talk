package io.amkrosa.backend.api.chat;

import io.amkrosa.backend.domain.user.User;

public class MessageWS {
    record UserMessage(String name, String userId, String role){
        static UserMessage fromUser(User user) {
            return new UserMessage(user.getName(), user.getId().toString(), user.getRole().toString());
        }
    }
}
