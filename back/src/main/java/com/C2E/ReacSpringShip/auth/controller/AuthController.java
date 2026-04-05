package com.C2E.ReacSpringShip.auth.controller;

import com.C2E.ReacSpringShip.auth.dto.reponse.AuthResponse;
import com.C2E.ReacSpringShip.auth.dto.reponse.RegisterResponse;
import com.C2E.ReacSpringShip.auth.dto.request.LoginRequest;
import com.C2E.ReacSpringShip.auth.dto.request.UserRequest;
import com.C2E.ReacSpringShip.auth.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Auth", description = "for registration and authentication")
public class AuthController {

    private final AuthService authService;

    public  AuthController(AuthService authService) {
        this.authService = authService;
    }

    @Operation(summary = "Register user")
    @ApiResponse(responseCode = "201", description = "User created successfully")
    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@RequestBody UserRequest userRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.register(userRequest));
    }

    @Operation(summary = "Login registered user")
    @ApiResponse(responseCode = "200", description = "User logged successfully")
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequestRequest) {
        return ResponseEntity.ok(authService.login(loginRequestRequest));
    }

    @Operation(summary = "Get a guest token with a nickname")
    @ApiResponse(responseCode = "200", description = "Guest token successfully obtained")
    @GetMapping("/guest")
    public ResponseEntity<AuthResponse> guest(@RequestParam String nickname) {
        return ResponseEntity.ok(authService.guest(nickname));
    }

}
