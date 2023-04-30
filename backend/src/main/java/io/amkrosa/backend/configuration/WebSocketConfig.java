package io.amkrosa.backend.configuration;

import io.amkrosa.backend.domain.user.UserRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.server.HandshakeInterceptor;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Configuration
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
@Slf4j
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    private final UserRepository userRepository;

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
                .setHandshakeHandler(new CustomHandshakeHandler(userRepository))
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
        private final UserRepository userRepository;
        private static final String USER_ID_KEY = "userId";

        @Override
        protected Principal determineUser(
                ServerHttpRequest request,
                WebSocketHandler wsHandler,
                Map<String, Object> attributes
        ) {
            String token = request.getURI().getQuery().replace("token=", "");
            log.warn("token: {}", token);

//            if (!headers.containsKey(USER_ID_KEY)) {
//                log.warn("Key {} was not found in the headers.", USER_ID_KEY);
//                attributes.put("authorized", "false");
//                return null;
//            }
//            var user = userRepository.findById(UUID.fromString(headers.get(USER_ID_KEY).get(0))).orElse(null);
//
//            if (user == null) {
//                attributes.put("authorized", "false");
//                return null;
//            }

            return null;
        }
    }

    @Data
    @AllArgsConstructor(staticName = "of")
    static class StompPrincipal implements Principal {
        private String name;
    }
}