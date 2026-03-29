package com.C2E.ReacSpringShip.auth.dto.reponse;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Authentication response")
public record AuthResponse(
        @Schema(description = "Return the token of a register user or guest user")
        String token
) {
}
