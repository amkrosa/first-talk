package io.amkrosa.backend.infrastructure.security;

import io.amkrosa.backend.configuration.DateProvider;
import io.amkrosa.backend.domain.user.User;
import io.amkrosa.backend.domain.user.UserToken;
import io.amkrosa.backend.domain.user.UserTokenPort;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
class JwtProvider implements UserTokenPort {
    private final DateProvider dateProvider;
    private final JwtProperties jwtProperties;

    @Override
    public UserToken generateToken(User user) {
        var token = createToken(userToMap(user));
        return new UserToken(token, getExpirationDate(token));
    }

    @Override
    public boolean hasInvalidToken(UserToken token, User user) {
        return !hasValidToken(token, user);
    }

    @Override
    public User getUserFromToken(UserToken token) {
        var claims = getAllClaimsFromToken(token.value());
        var user = User.builder()
                .name(claims.get("username", String.class))
                .email(claims.get("email", String.class))
                .password(claims.get("password", String.class))
                .role(User.Role.valueOf(claims.get("role", String.class)))
                .build();
        user.setId(UUID.fromString(claims.get("id", String.class)));
        return user;
    }

    @Override
    public LocalDateTime getExpirationDate(UserToken token) {
        return getExpirationDate(token.value());
    }

    private boolean hasValidToken(UserToken token, User user) {
        return switch (user.getRole()) {
            case ADMIN -> false;
            case GUEST -> validateGuestToken(token, user);
            case REGISTERED -> validateRegisteredUserToken(token, user);
        };
    }

    private boolean validateRegisteredUserToken(UserToken token, User user) {
        var jwt = token.value();
        var username = getUsernameFromToken(jwt);
        var password = getPasswordFromToken(jwt);
        return username.equals(user.getName())
                && password.equals(user.getPassword())
                && isTokenNotExpired(token);
    }

    private boolean validateGuestToken(UserToken token, User user) {
        var username = getUsernameFromToken(token.value());
        return username.equals(user.getName())
                && isTokenNotExpired(token);
    }

    private LocalDateTime getExpirationDate(String token) {
        return dateProvider.convert(getClaimFromToken(token, Claims::getExpiration));
    }

    private String createToken(Map<String, String> claims) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(claims.get("username"))
                .setIssuedAt(new Date(dateProvider.millis()))
                .setExpiration(new Date(dateProvider.millis() + Long.parseLong(jwtProperties.getValidityInMillis())))
                .signWith(getKey())
                .compact();
    }

    private String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    private String getPasswordFromToken(String token) {
        return getClaimFromToken(token, (claims) -> claims.get("password", String.class));
    }

    private <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        var claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private boolean isTokenNotExpired(UserToken token) {
        var expirationDate = getExpirationDate(token);
        return !expirationDate.isBefore(dateProvider.now());
    }

    private Key getKey() {
        byte[] keyBytes = jwtProperties.getSecretKey().getBytes(StandardCharsets.UTF_8);
        return new SecretKeySpec(keyBytes, "HmacSHA256");
    }

    private Map<String, String> userToMap(User user) {
        return Map.of(
                "id", user.getId().toString(),
                "username", user.getName(),
                "email", user.getEmail() == null ? StringUtils.EMPTY : user.getEmail(),
                "password", user.getPassword() == null ? StringUtils.EMPTY : user.getPassword(),
                "role", user.getRole().toString()
        );
    }
}