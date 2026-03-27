package com.C2E.ReacSpringShip.user.service;

import com.C2E.ReacSpringShip.user.entity.UserEntity;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.UUID;

public interface UserService extends UserDetailsService {
    UserEntity createUser(String username, String email, String password);
    UserEntity findById(UUID userId);
    UserEntity findByUsername(String username);
}
