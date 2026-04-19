package com.C2E.ReacSpringShip.auth.service;

import com.C2E.ReacSpringShip.auth.dto.reponse.AuthResponse;
import com.C2E.ReacSpringShip.auth.dto.request.LoginRequest;
import com.C2E.ReacSpringShip.auth.dto.request.UserRequest;

public interface AuthService {
    void register(UserRequest userRequest);
    AuthResponse login(LoginRequest loginRequest);
    AuthResponse guest(String nickname);
}
