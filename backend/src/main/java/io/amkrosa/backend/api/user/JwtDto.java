package io.amkrosa.backend.api.user;

import jakarta.validation.constraints.NotNull;

record JwtDto(@NotNull String jwt, @NotNull String expiration) {
}
