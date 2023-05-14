package io.amkrosa.backend.api.user;

import io.amkrosa.backend.domain.auth.JwtProvider;
import io.amkrosa.backend.domain.auth.UserAuth;
import io.amkrosa.backend.domain.user.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController("/api/users")
@RequiredArgsConstructor
class UserRestController {
    private final UserService userService;
    private final JwtProvider jwtProvider;

    @Operation(summary = "Create guest user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Guest user created",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = UserResponse.class)) }),
            @ApiResponse(responseCode = "400", description = "Validation error",
                    content = @Content) })
    @PostMapping("/guest")
    @ResponseStatus(HttpStatus.CREATED)
    UserResponse registerGuestUser(@RequestBody UserRequest userRequest) {
        var user = userService.register(userRequest.toGuestUser());
        var token = jwtProvider.generateToken(UserAuth.fromUser(user));
        return UserResponse.map(user, token, jwtProvider.getExpirationDateFromToken(token).toString());
    }

//    @PostMapping
//    UserResponse registerUser(UserRequest userRequest) {
//        var user = userService.register(userRequest.toRegisteredUser());
//        return UserResponse.map(user);
//    }
}
