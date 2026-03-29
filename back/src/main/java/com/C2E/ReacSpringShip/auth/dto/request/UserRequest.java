package com.C2E.ReacSpringShip.auth.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "User data request for registration")
public record UserRequest(
        @Schema(description = "username unique", example = "Einar115")
        String username,
        @Schema(description = "email to verification", example = "einar115@example.com")
        String email,
        @Schema(description = "a secret password", example = "ReacSpringShip")
        String password
) {
}
