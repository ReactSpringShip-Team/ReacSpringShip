package com.C2E.ReacSpringShip.auth.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Login request")
public record LoginRequest(
        @Schema(description = "username of registered user")
        String username,
        @Schema(description = "password of registered user")
        String password
) {
}
