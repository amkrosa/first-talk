package io.amkrosa.backend.api.chat;

import io.amkrosa.backend.domain.chat.ChatService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController("/api/chat")
@RequiredArgsConstructor
class ChatRestController {
    private final ChatService chatService;
    private final SimpMessagingTemplate template;

    @Operation(summary = "Create room")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Room created",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = CreateRoomResponse.class))}),
            @ApiResponse(responseCode = "400", description = "Validation error",
                    content = @Content)})
    @PostMapping("/rooms")
    @ResponseStatus(HttpStatus.CREATED)
    CreateRoomResponse createRoom(@RequestBody @Validated CreateRoomRequest createRoomRequest) {
        var roomId = chatService.createRoom(createRoomRequest.toCreateRoom());
        return new CreateRoomResponse(roomId.toString());
    }

    @Operation(summary = "Join room as a user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Room joined",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = CreateRoomResponse.class))}),
            @ApiResponse(responseCode = "400", description = "Validation error",
                    content = @Content)})
    @PutMapping("/rooms/{roomId}")
    @ResponseStatus(HttpStatus.OK)
    void joinRoom(@RequestBody @Validated JoinRoomRequest joinRoomRequest, @PathVariable String roomId) {
        var user = chatService.joinRoom(joinRoomRequest.toJoinRoom(roomId));
        template.convertAndSend(String.format("/topic/chat/rooms/%s", roomId), MessageWS.UserJoinedMessage.of(user));
    }

    @Operation(summary = "Get all available rooms")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Room successfully retrieved",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = GetRoomsResponse.class))})
    })
    @GetMapping("/rooms")
    @ResponseStatus(HttpStatus.OK)
    GetRoomsResponse getRooms() {
        var rooms = chatService.getRooms();
        return GetRoomsResponse.from(rooms);
    }
}
