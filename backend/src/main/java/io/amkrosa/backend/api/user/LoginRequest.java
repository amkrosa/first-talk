package io.amkrosa.backend.api.user;

import jakarta.validation.constraints.NotNull;

record LoginRequest(@NotNull String email, @NotNull String password) {
}
