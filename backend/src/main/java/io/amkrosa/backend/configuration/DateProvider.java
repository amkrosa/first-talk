package io.amkrosa.backend.configuration;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Service;

import java.time.Clock;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.TemporalAccessor;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class DateProvider {
    private final Clock clock;

    public LocalDateTime convert(Date date) {
        return date.toInstant()
                .atZone(clock.getZone())
                .toLocalDateTime();
    }

    public LocalDateTime now() {
        return clock.instant()
                .atZone(clock.getZone())
                .toLocalDateTime();
    }

    public long millis() {
        return clock.millis();
    }

    @Configuration
    static class ClockConfiguration {
        @Bean
        public Clock clock() {
            return Clock.systemUTC();
        }
    }
}
