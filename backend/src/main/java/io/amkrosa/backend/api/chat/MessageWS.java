package io.amkrosa.backend.api.chat;

import io.amkrosa.backend.domain.chat.BreakoutRoom;
import io.amkrosa.backend.domain.user.User;

import java.util.Collection;
import java.util.List;

class MessageWS {
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

    //FIXME ?? changed from userId to id, remember
    record UserDto(String username, String id){
        static UserDto of(User user) {
            return new UserDto(user.getName(), user.getId().toString());
        }
    }

    record UserSentMessage(UserDto user, String message) {
        static UserSentMessage of(User user, String message) {
            return new UserSentMessage(UserDto.of(user), message);
        }
    }

    record CommandReceived(String command) {}

    record BreakoutRoomCreated(String id, List<UserDto> users) {
        static BreakoutRoomCreated of(BreakoutRoom breakoutRoom) {
            var users = breakoutRoom.getUsers().stream()
                    .map(UserDto::of)
                    .toList();
            return new BreakoutRoomCreated(breakoutRoom.getId().toString(), users);
        }
    }

    enum CommandType {
        CREATE_BREAKOUT_ROOMS
    }
}
