package com.C2E.ReacSpringShip.auth.service;

import java.util.Map;
import java.util.UUID;

public interface JwtService {
    String generateToken(String subject, String role);
    String generateToken(String subject, String role, Map<String, Object> extraClaims);
    String generateUserToken(UUID userId, String nickname, String role);
    String generateGuestToken(UUID guestToken, String nickname);
}
