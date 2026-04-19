package com.C2E.ReacSpringShip.auth.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

@Schema(description = "Login request")
public record LoginRequest(
        @Schema(description = "username of registered user", example = "Einar115")
        @NotBlank(message = "The username is required.")
        String username,

        @Schema(description = "password of registered user", example = "ReacSpringShip-123")
        @NotBlank(message = "A password is required.")
        String password
) {
}
