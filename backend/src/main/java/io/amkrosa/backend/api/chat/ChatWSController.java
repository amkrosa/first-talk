package io.amkrosa.backend.api.chat;

import io.amkrosa.backend.domain.chat.BreakoutRoom;
import io.amkrosa.backend.domain.chat.BreakoutRoomsService;
import io.amkrosa.backend.domain.chat.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionConnectEvent;

import java.util.UUID;

@Controller
@RequiredArgsConstructor
@Slf4j
class ChatWSController {
    private final SimpMessagingTemplate template;
    private final ChatService chatService;
    private final BreakoutRoomsService breakoutRoomsService;

    @MessageMapping("/chat/rooms/{roomId}")
    @SendTo("/topic/chat/rooms/{roomId}")
    public MessageWS.RoomUserUpdateMessage joinRoom(@DestinationVariable String roomId, @Payload MessageWS.UserJoinedMessage message) {
        var users = chatService.getRoomWithUsers(UUID.fromString(roomId)).getUsers();
        return MessageWS.RoomUserUpdateMessage.of(users);
    }

    @MessageMapping("/chat/rooms/{roomId}/messages")
    @SendTo("/topic/chat/rooms/{roomId}/messages")
    public MessageWS.UserSentMessage messages(@DestinationVariable String roomId, @Payload MessageWS.UserSentMessage message) {
        //TODO caching to redis
        return message;
    }

    @MessageMapping("/chat/rooms/{roomId}/split")
    public void splitRoom(@DestinationVariable String roomId, @Payload MessageWS.CommandReceived command) {
        if (!command.command().equals(MessageWS.CommandType.CREATE_BREAKOUT_ROOMS.toString())) {
            return;
        }
        var breakoutRooms = breakoutRoomsService.createBreakoutRooms(UUID.fromString(roomId));
        breakoutRooms.forEach(breakoutRoom -> sendSplitToBreakoutRoom(roomId, breakoutRoom));
    }

    @MessageMapping("/chat/rooms/{roomId}/{breakoutRoomId}/messages")
    @SendTo("/topic/chat/rooms/{roomId}/{breakoutRoomId}/messages")
    public MessageWS.UserSentMessage breakoutRoomMessages(@DestinationVariable String roomId, @DestinationVariable String breakoutRoomId, @Payload MessageWS.UserSentMessage message) {
        return message;
    }

    private void sendSplitToBreakoutRoom(String roomId, BreakoutRoom breakoutRoom) {
        breakoutRoom.getUsers()
                .forEach(user -> template.convertAndSendToUser(
                        user.getId().toString(),
                        String.format("/queue/chat/rooms/%s/split", roomId),
                        MessageWS.BreakoutRoomCreated.of(breakoutRoom)
                ));
    }
}
