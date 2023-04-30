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
@Table(name = "rooms")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private Boolean inProgress;

    @Column(nullable = false)
    private Integer userCount;

    @ManyToOne
    @JoinColumn(name = "moderator_id", nullable = false)
    private User moderator;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "room_id")
    private Set<User> users;

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<BreakoutRoom> breakoutRooms;

    public Room(String name, User moderator) {
        this.name = name;
        this.createdAt = LocalDateTime.now();
        this.moderator = moderator;
        this.userCount = 1;
        this.inProgress = false;
    }

    public void addUserToRoom(User user) {
        users.add(user);
        userCount+=1;
    }

    //TODO is this necessary?
    public void removeUserFromRoom(User user) {
        users.remove(user);
    }
}
