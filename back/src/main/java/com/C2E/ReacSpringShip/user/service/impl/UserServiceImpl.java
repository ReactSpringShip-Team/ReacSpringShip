package com.C2E.ReacSpringShip.user.service.impl;

import com.C2E.ReacSpringShip.common.exception.DuplicateResourceException;
import com.C2E.ReacSpringShip.common.exception.ResourceNotFoundException;
import com.C2E.ReacSpringShip.user.model.entity.UserEntity;
import com.C2E.ReacSpringShip.user.repository.UserRepository;
import com.C2E.ReacSpringShip.user.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository,  PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void createUser(String username, String email, String password) {
        if (userRepository.existsByUsername(username)) {
            throw new DuplicateResourceException("An account with that username already exists.");
        }
        if (userRepository.existsByEmail(email)) {
            throw new DuplicateResourceException("An account with that email already exists.");
        }

        UserEntity newUser = new UserEntity();
        newUser.setUsername(username);
        newUser.setEmail(email);
        newUser.setPassword(passwordEncoder.encode(password));

        userRepository.save(newUser);
    }

    public UserEntity findById(UUID userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found.", userId.toString()));
    }
    public UserEntity findByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found.", username));
    }

}
