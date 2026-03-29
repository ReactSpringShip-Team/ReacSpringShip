package com.C2E.ReacSpringShip.auth.dto.reponse;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Register user response")
public record RegisterResponse(
        @Schema(description = "Confirm if the registration was successful")
        boolean success,
        @Schema(description = "Message indicating the action")
        String message
) {
}
