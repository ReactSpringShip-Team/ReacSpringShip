package com.C2E.ReacSpringShip.auth.dto.request;

public record LoginRequest(
        String username,
        String password
) {
}
