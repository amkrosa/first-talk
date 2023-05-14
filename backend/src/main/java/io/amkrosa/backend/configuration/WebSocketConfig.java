package io.amkrosa.backend.configuration;

import io.amkrosa.backend.domain.auth.UserProvider;
import io.amkrosa.backend.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;

import java.security.Principal;
import java.util.Map;
import java.util.Optional;

@Configuration
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
@Slf4j
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    private final UserProvider userProvider;

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic", "/queue");
        config.setUserDestinationPrefix("/user");
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
                .setAllowedOrigins("http://localhost:3000")
                .setHandshakeHandler(new CustomHandshakeHandler(userProvider))
                .withSockJS();
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(new LoggingChannelInterceptor(), new RmeSessionChannelInterceptor()); // Register the interceptor for inbound channels
    }

    @Override
    public void configureClientOutboundChannel(ChannelRegistration registration) {
        registration.interceptors(new LoggingChannelInterceptor()); // Register the interceptor for outbound channels
    }

    @Slf4j
    static class LoggingChannelInterceptor implements ChannelInterceptor {
        @Override
        public Message<?> preSend(Message<?> message, MessageChannel channel) {
            log.info("Pre send: {}", message);
            return message;
        }

        // You can also override other methods like postSend, afterSendCompletion, etc., for more logging
    }

    @Slf4j
    static class RmeSessionChannelInterceptor implements ChannelInterceptor {

        @Override
        public Message<?> preSend(Message<?> message, MessageChannel channel) {

            return message;
        }
    }

    @RequiredArgsConstructor
    @Slf4j
    static class CustomHandshakeHandler extends DefaultHandshakeHandler {
        private final UserProvider userProvider;

        @Override
        protected Principal determineUser(
                ServerHttpRequest request,
                WebSocketHandler wsHandler,
                Map<String, Object> attributes
        ) {
            String token = request.getURI().getQuery().replace("token=", "");
            Optional<User> user = userProvider.retrieveUserFromToken(token);

            if (user.isEmpty()) {
                log.warn("Could not verify user during handshake.");
                attributes.put("authorized", "false");
                return null;
            }

            return StompPrincipal.of(user.get().getId().toString());
        }
    }

    @Data
    @AllArgsConstructor(staticName = "of")
    static class StompPrincipal implements Principal {
        private String name;
    }
}