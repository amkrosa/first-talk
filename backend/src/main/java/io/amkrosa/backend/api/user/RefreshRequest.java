package io.amkrosa.backend.api.user;

import jakarta.validation.constraints.NotNull;

public record RefreshRequest(@NotNull String token) {
}
