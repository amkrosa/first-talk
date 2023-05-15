package io.amkrosa.backend.domain.user.registration;

import io.amkrosa.backend.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class RegistrationStrategyCollector {
    private final List<RegistrationStrategy> registrationStrategies;

    public RegistrationStrategy choose(User.Role userRole) {
        return registrationStrategies.stream()
                .filter(strategy -> strategy.getUserRole() == userRole)
                .findFirst()
                .orElseThrow(() -> new UnsupportedOperationException("Correct registration strategy could not be found"));
    }
}
