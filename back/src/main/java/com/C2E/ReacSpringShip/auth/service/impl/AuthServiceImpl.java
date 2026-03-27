package com.C2E.ReacSpringShip.auth.service.impl;

import com.C2E.ReacSpringShip.auth.dto.reponse.AuthResponse;
import com.C2E.ReacSpringShip.auth.dto.reponse.RegisterResponse;
import com.C2E.ReacSpringShip.auth.dto.request.LoginRequest;
import com.C2E.ReacSpringShip.auth.dto.request.UserRequest;
import com.C2E.ReacSpringShip.auth.service.AuthService;
import com.C2E.ReacSpringShip.auth.service.JwtService;
import com.C2E.ReacSpringShip.user.entity.UserEntity;
import com.C2E.ReacSpringShip.user.service.UserService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AuthServiceImpl implements AuthService {
    private final JwtService jwtService;
    private final UserService userService;
    private final AuthenticationManager authenticationManager;

    public AuthServiceImpl(JwtService jwtService,  UserService userService,  AuthenticationManager authenticationManager) {
        this.jwtService = jwtService;
        this.userService = userService;
        this.authenticationManager = authenticationManager;
    }


    @Override
    public RegisterResponse register(UserRequest userRequest) {
        userService.createUser(userRequest.username(), userRequest.email(), userRequest.password());
        return new RegisterResponse(true, "Register success.");
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.username(),
                        request.password()
                )
        );

        UserEntity user = userService.findByUsername(request.username());
        String token = jwtService.generateUserToken(user.getId(), request.username(), "USER");
        return new AuthResponse(token);
    }

    @Override
    public AuthResponse guest(String nickname) {
        UUID guestToken = UUID.randomUUID();
        String token = jwtService.generateGuestToken(guestToken, nickname);
        return new AuthResponse(token);
    }
}
