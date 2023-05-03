package io.amkrosa.backend.domain.chat;

import io.amkrosa.backend.domain.user.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

@Data
@Entity
@NoArgsConstructor
@Table(name = "chat_messages")
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;

    @ManyToOne
    @JoinColumn(name = "sender_id", nullable = false)
    private User sender;

    @ManyToOne
    @JoinColumn(name = "receiver_id", nullable = true)
    private User receiver;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Type type;
    @Embedded
    private Payload payload;
    private LocalDateTime timestamp;

    @Embeddable
    @Data
    @NoArgsConstructor
    public static class Payload {
        private String message;
    }

    public enum Type {
        ROOM, BREAKOUT_ROOM
    }
}
