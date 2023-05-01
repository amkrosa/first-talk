package io.amkrosa.backend.api.chat;

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

import java.util.*;

@Controller
@RequiredArgsConstructor
@Slf4j
public class ChatWSController {
    private final SimpMessagingTemplate template;
    private final ChatService chatService;

    @EventListener
    public void onWebSocketConnect(SessionConnectEvent event) {
        var message = event.getMessage();
        MessageHeaders headers = message.getHeaders();
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        log.warn("@@@ ACCESSOR {}", accessor);
    }
    //STOMP
//    @EventListener
//    public void onWebSocketDisconnect(SessionDisconnectEvent event) {
//        // Remove the user from the lobby or chat rooms
//        String sessionId = event.getSessionId();
//        lobby.removeIf(user -> user.sessionId().equals(sessionId));
//        chatRooms.values().forEach(users -> users.removeIf(user -> user.sessionId().equals(sessionId)));
//    }

//    //STOMP
//    @MessageMapping("/lobby")
//    public void lobby(User admin) {
//        log.info(String.valueOf(admin));
//        if (!admin.isAdmin()) {
//            return;
//        }
//
//        // Split the users into pairs
//        for (int i = 0; i < lobby.size() - 1; i += 2) {
//            String chatRoomId = UUID.randomUUID().toString();
//            User user1 = lobby.get(i);
//            User user2 = lobby.get(i + 1);
//            chatRooms.put(chatRoomId, Arrays.asList(user1, user2));
//
//            // Send the chat room ID to the users
//            template.convertAndSendToUser(user1.sessionId(), "/queue/chat-room", chatRoomId);
//            template.convertAndSendToUser(user2.sessionId(), "/queue/chat-room", chatRoomId);
//        }
//
//        synchronized(lobby) {
//            lobby.clear();
//        }
//    }
//
//    //STOMP
//    @MessageMapping("/chat/rooms/{chatRoomId}")
//    public void chat(@DestinationVariable String chatRoomId, ChatMessage message) {
//        List<User> users = chatRooms.get(chatRoomId);
//        if (users != null) {
//            users.forEach(user -> template.convertAndSendToUser(user.sessionId(), "/queue/messages", message));
//        }
//    }
//
//    //STOMP
////    @MessageMapping("/chat/rooms/{roomId}")
////    @SendTo("/topic/room/{roomId}")
////    public void joinLobby(SimpMessageHeaderAccessor sha, User user) {
////        var principalName = Optional.ofNullable(sha.getUser()).orElseThrow(RuntimeException::new).getName();
////        log.info("User added: {}, with principal: {}", user, principalName);
////        lobby.add(new User(principalName, user.username(), user.isAdmin()));
////        template.convertAndSend("/topic/lobby", lobby.stream().map(User::username).toList());
////    }
//
    @MessageMapping("/chat/rooms/{roomId}")
    @SendTo("/topic/chat/rooms/{roomId}")
    public MessageWS.RoomUserUpdateMessage joinRoom(@DestinationVariable String roomId, @Payload MessageWS.UserJoinedMessage message) {
        var users = chatService.getRoomWithUsers(UUID.fromString(roomId)).getUsers();
        return MessageWS.RoomUserUpdateMessage.of(users);
    }

    @MessageMapping("/chat/rooms/{roomId}/messages")
    @SendTo("/topic/chat/rooms/{roomId}/messages")
    public MessageWS.UserSentMessage messages(@DestinationVariable String roomId, @Payload MessageWS.UserSentMessage message) {
        return message;
    }

//    //WEBRTC
//    @MessageMapping("/signal/join")
//    public void joinChatWebRtc(SimpMessageHeaderAccessor sha) {
//        var principalName = Optional.ofNullable(sha.getUser()).orElseThrow(RuntimeException::new).getName();
//        String role = webRtcUsers.size() % 2 == 0 ? "initiator" : "receiver";
//        log.info("principal {} joined with role '{}'", principalName, role);
//        webRtcUsers.add(principalName);
//        template.convertAndSendToUser(principalName, "/webrtc/role", role);
//    }
//
//    //WEBRTC
//    @MessageMapping("/signal/{roomId}/{userId}")
//    public void signal(@Payload String signal, @DestinationVariable String roomId, @DestinationVariable String userId) {
//        template.convertAndSend("/webrtc/signal/" + roomId + "/" + userId, signal);
//    }
}
