package com.C2E.ReacSpringShip.auth.controller;

import com.C2E.ReacSpringShip.auth.dto.reponse.AuthResponse;
import com.C2E.ReacSpringShip.auth.dto.reponse.RegisterResponse;
import com.C2E.ReacSpringShip.auth.dto.request.LoginRequest;
import com.C2E.ReacSpringShip.auth.dto.request.UserRequest;
import com.C2E.ReacSpringShip.auth.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public  AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@RequestBody UserRequest userRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.register(userRequest));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequestRequest) {
        return ResponseEntity.ok(authService.login(loginRequestRequest));
    }

    @PostMapping("/guest")
    public ResponseEntity<AuthResponse> guest(@RequestParam String nickname) {
        return ResponseEntity.ok(authService.guest(nickname));
    }

}
