package io.amkrosa.backend.api.user;

import io.amkrosa.backend.domain.user.UserException;
import io.amkrosa.backend.domain.user.UserService;
import io.amkrosa.backend.domain.user.UserToken;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.NotImplementedException;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController("/api/users")
@RequiredArgsConstructor
@Validated
class UserRestController {
    private final UserService userService;

    @Operation(summary = "Create guest user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Guest user created",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = UserResponse.class)) }),
            @ApiResponse(responseCode = "400", description = "Validation error",
                    content = @Content) })
    @PostMapping("/guest")
    @ResponseStatus(HttpStatus.CREATED)
    UserResponse registerGuestUser(@RequestBody @Valid UserRequest userRequest) {
        var user = userService.register(userRequest.toGuestUser());
        var token = userService.generateToken(user);
        return UserResponse.map(user, token);
    }

    @PutMapping ("/token")
    @ResponseStatus(HttpStatus.OK)
    JwtDto refreshToken(@RequestBody @Valid RefreshRequest refreshRequest) {
        return userService.retrieveUserFromToken(UserToken.fromToken(refreshRequest.token()))
                .map(userService::generateToken)
                .map(JwtDto::from)
                .orElseThrow(UserException.UserTokenInvalid::new);
    }

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.CREATED)
    JwtDto login(@RequestBody @Valid LoginRequest loginRequest) {
        throw new NotImplementedException();
    }

//    @PostMapping
//    UserResponse registerUser(UserRequest userRequest) {
//        var user = userService.register(userRequest.toRegisteredUser());
//        return UserResponse.map(user);
//    }
}
