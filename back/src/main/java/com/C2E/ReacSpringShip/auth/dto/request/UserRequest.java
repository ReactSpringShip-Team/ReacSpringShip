package com.C2E.ReacSpringShip.auth.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Schema(description = "User data request for registration")
public record UserRequest(
        @Schema(description = "username unique", example = "Einar115")
        @NotBlank(message = "A username is required")
        @Size(min = 3, max = 30, message = "The username must be between 3 and 30 characters long.")
        @Pattern(regexp = "^[a-zA-Z0-9_.-]+$", message = "The username can only contain letters, numbers, periods, hyphens, and underscores.")
        String username,

        @Schema(description = "email to verification", example = "einar115@example.com")
        @NotBlank(message = "Email is required")
        @Email(message = "The email is not in a valid format.")
        @Size(max = 100, message = "The email cannot exceed 100 characters.")
        String email,

        @Schema(description = "a secret password", example = "ReacSpringShip")
        @NotBlank(message = "A password is required.")
        @Size(min = 8, max = 64, message = "The password must be between 8 and 64 characters long")
        @Pattern(
                regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&._-])[A-Za-z\\d@$!%*?&._-]+$",
                message = "The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
        )
        String password
) {
}
