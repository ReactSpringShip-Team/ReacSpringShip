package com.C2E.ReacSpringShip.user.service.impl;

import com.C2E.ReacSpringShip.user.model.MainUser;
import com.C2E.ReacSpringShip.user.model.entity.UserEntity;
import com.C2E.ReacSpringShip.user.repository.UserRepository;
import org.jspecify.annotations.NonNull;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @SuppressWarnings("NullableProblems")
    public UserDetails loadUserByUsername(@NonNull String username) throws UsernameNotFoundException {
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(
                        "Account not registered or invalid credentials"
                ));

        return new MainUser(user);
    }

}
