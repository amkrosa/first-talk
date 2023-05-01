package io.amkrosa.backend.api.chat;

import io.amkrosa.backend.domain.user.User;

import java.util.Collection;
import java.util.List;

public class MessageWS {
    record UserJoinedMessage(String action, String username, String userId){
        static UserJoinedMessage of(User user) {
            return new UserJoinedMessage("JOIN", user.getName(), user.getId().toString());
        }
    }

    record RoomUserUpdateMessage(String action, List<UserDto> users) {
        static RoomUserUpdateMessage of(Collection<User> users) {
            return new RoomUserUpdateMessage("UPDATE", users.stream().map(UserDto::of).toList());
        }
    }

    record UserDto(String username, String userId){
        static UserDto of(User user) {
            return new UserDto(user.getName(), user.getId().toString());
        }
    }

    record UserSentMessage(UserDto user, String message) {
        static UserSentMessage of(User user, String message) {
            return new UserSentMessage(UserDto.of(user), message);
        }
    }
}
