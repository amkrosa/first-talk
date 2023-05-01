package io.amkrosa.backend.domain.auth;

import io.amkrosa.backend.configuration.DateProvider;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
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
public class JwtProvider {
    private final DateProvider dateProvider;
    private final JwtProperties jwtProperties;

    public String generateToken(UserAuth userAuth) {
        return createToken(userAuth.toMap(), userAuth);
    }

    private String createToken(Map<String, String> claims, UserAuth userAuth) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userAuth.username())
                .setIssuedAt(new Date(dateProvider.millis()))
                .setExpiration(new Date(dateProvider.millis() + Long.parseLong(jwtProperties.getValidityInMillis())))
                .signWith(getKey())
                .compact();
    }

    public boolean validateRegisteredUserToken(String token, UserAuth userAuth) {
        var username = getUsernameFromToken(token);
        var password = getPasswordFromToken(token);
        return username.equals(userAuth.username())
                && password.equals(userAuth.password())
                && isTokenNotExpired(token);
    }

    public boolean validateGuestToken(String token, UserAuth userAuth) {
        var username = getUsernameFromToken(token);
        return username.equals(userAuth.username())
                && isTokenNotExpired(token);
    }

    public UserAuth getUserAuthFromToken(String token) {
        var claims = getAllClaimsFromToken(token);
        return new UserAuth(UUID.fromString(claims.get("id", String.class)),
                claims.get("username", String.class),
                claims.get("email", String.class),
                claims.get("password", String.class),
                claims.get("role", String.class));
    }

    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    public String getPasswordFromToken(String token) {
        return getClaimFromToken(token, (claims) -> claims.get("password", String.class));
    }

    public String getUserIdFromToken(String token) {
        return getClaimFromToken(token, (claims) -> claims.get("id", String.class));
    }

    public String getEmailFromToken(String token) {
        return getClaimFromToken(token, (claims) -> claims.get("email", String.class));
    }

    public String getRoleFromToken(String token) {
        return getClaimFromToken(token, (claims) -> claims.get("role", String.class));
    }

    public LocalDateTime getExpirationDateFromToken(String token) {
        return dateProvider.convert(getClaimFromToken(token, Claims::getExpiration));
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

    private boolean isTokenNotExpired(String token) {
        var expirationDate = getExpirationDateFromToken(token);
        return !expirationDate.isBefore(dateProvider.now());
    }

    private Key getKey() {
        byte[] keyBytes = jwtProperties.getSecretKey().getBytes(StandardCharsets.UTF_8);
        return new SecretKeySpec(keyBytes, "HmacSHA256");
    }
}