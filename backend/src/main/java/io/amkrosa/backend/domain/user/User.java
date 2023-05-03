package io.amkrosa.backend.domain.user;

import io.amkrosa.backend.domain.chat.BreakoutRoom;
import io.amkrosa.backend.domain.chat.Room;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.util.Pair;

import java.util.Set;
import java.util.UUID;

@Data
@Entity
@NoArgsConstructor
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = true, unique = true)
    private String email;

    @Column(nullable = true)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Builder
    private User(String name, String password, String email, Role role) {
        this.name = name;
        this.password = password;
        this.email = email;
        this.role = role;
    }

    public enum Role {
        ADMIN, GUEST, REGISTERED
    }

    @AllArgsConstructor(staticName = "of")
    @Getter
    public static class Pair {
        private User user1;
        private User user2;

        public Set<User> getUsers() {
            return Set.of(user1, user2);
        }
    }
}
