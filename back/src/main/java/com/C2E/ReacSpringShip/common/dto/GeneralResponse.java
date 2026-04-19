package com.C2E.ReacSpringShip.common.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Standard successful response wrapper")
public record GeneralResponse<T>(
        @Schema(description = "Indicates if the request was successful", example = "true")
        boolean success,

        @Schema(description = "Human readable message", example = "User registered successfully.")
        String message,

        @Schema(description = "Response payload, null when there is no data to return")
        T data
) {
    public static <T> GeneralResponse<T> ok(T data, String message) {
        return new GeneralResponse<>(true, message, data);
    }

    public static <T> GeneralResponse<T> ok(String message) {
        return new GeneralResponse<>(true, message, null);
    }
}
