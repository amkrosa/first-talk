package io.amkrosa.backend.domain.chat;

import io.amkrosa.backend.domain.user.User;
import jakarta.persistence.*;
import lombok.Data;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

@Data
@Entity
@Table(name = "breakout_rooms")
public class BreakoutRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private Room room;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "breakout_room_id")
    private Set<User> users;

    @Column(nullable = false)
    private Integer userLimit;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private Duration timeout;
}
