package com.C2E.ReacSpringShip.common.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;
import java.util.Map;

@Schema(description = "Standard error response")
public record ErrorResponse(
        @Schema(description = "HTTP status code", example = "404")
        int status,

        @Schema(description = "Short error name", example = "Not Found")
        String error,

        @Schema(description = "Detailed error message", example = "Room with code ABC123 not found")
        String message,

        @Schema(description = "Request path that caused the error", example = "/api/v1/rooms/join/ABC123")
        String path,

        @Schema(description = "Timestamp of the error")
        LocalDateTime timestamp,

        @Schema(description = "Field-level validation errors, null when not a validation error")
        Map<String, String> validationErrors
) {
    public static ErrorResponse of(int status, String error, String message, String path) {
        return new ErrorResponse(status, error, message, path, LocalDateTime.now(), null);
    }

    public static ErrorResponse ofValidation(String path, Map<String, String> validationErrors) {
        return new ErrorResponse(400, "Bad Request", "The request contains invalid fields.", path, LocalDateTime.now(), validationErrors);
    }
}
