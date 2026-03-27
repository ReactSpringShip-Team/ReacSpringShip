package com.C2E.ReacSpringShip.auth.service;

import com.C2E.ReacSpringShip.auth.dto.reponse.AuthResponse;
import com.C2E.ReacSpringShip.auth.dto.reponse.RegisterResponse;
import com.C2E.ReacSpringShip.auth.dto.request.LoginRequest;
import com.C2E.ReacSpringShip.auth.dto.request.UserRequest;

public interface AuthService {
    public RegisterResponse register(UserRequest userRequest);
    public AuthResponse login(LoginRequest loginRequest);
    public AuthResponse guest(String nickname);
}
