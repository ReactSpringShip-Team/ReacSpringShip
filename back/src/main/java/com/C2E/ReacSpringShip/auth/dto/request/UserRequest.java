package com.C2E.ReacSpringShip.auth.dto.request;

public record UserRequest(
        String username,
        String email,
        String password
) {
}
