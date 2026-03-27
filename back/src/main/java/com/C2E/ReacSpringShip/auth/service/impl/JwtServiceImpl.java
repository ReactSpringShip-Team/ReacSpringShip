package com.C2E.ReacSpringShip.auth.service.impl;

import com.C2E.ReacSpringShip.auth.service.JwtService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;
import java.util.UUID;

@Service
public class JwtServiceImpl implements JwtService {

    @Value("${jwt.expiration}")
    private long expiration;

    @Value("${jwt.issuer}")
    private String jwtIssuer;

    private final JwtEncoder jwtEncoder;

    public JwtServiceImpl(JwtEncoder jwtEncoder) {
        this.jwtEncoder = jwtEncoder;
    }

    // Metodo simplificado
    @Override
    public String generateToken(String subject, String role) {
        return generateToken(subject, role, Map.of());
    }

    // Metodo para agregar mas claims al token
    @Override
    public String generateToken(String subject, String role, Map<String, Object> extraClaims) {
        Instant now = Instant.now();

        JwtClaimsSet.Builder builder = JwtClaimsSet.builder()
                .subject(subject)
                .issuer(jwtIssuer)
                .issuedAt(now)
                .expiresAt(now.plusSeconds(expiration))
                .claim("role", role);

        extraClaims.forEach(builder::claim);

        // Especificar el algoritmo en el header del JWT nota para posibles cambios futuros
        JwsHeader header = JwsHeader.with(MacAlgorithm.HS256).build();

        return jwtEncoder.encode(
                JwtEncoderParameters.from(header, builder.build())
        ).getTokenValue();
    }

    // Para usuarios registrados
    @Override
    public String generateUserToken(UUID userId, String nickname, String role) {
        return generateToken(userId.toString(), role, Map.of("nickname", nickname));
    }

    // Para usuarios temporales
    @Override
    public String generateGuestToken(UUID guestToken, String nickname) {
        return generateToken(
                guestToken.toString(),
                "GUEST",
                Map.of("nickname", nickname)
        );
    }
}
