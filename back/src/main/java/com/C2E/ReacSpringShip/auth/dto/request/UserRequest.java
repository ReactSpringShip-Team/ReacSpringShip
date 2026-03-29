package com.C2E.ReacSpringShip.auth.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "User data request for registration")
public record UserRequest(
        @Schema(description = "username unique")
        String username,
        @Schema(description = "email to verification")
        String email,
        @Schema(description = "a secret password")
        String password
) {
}
