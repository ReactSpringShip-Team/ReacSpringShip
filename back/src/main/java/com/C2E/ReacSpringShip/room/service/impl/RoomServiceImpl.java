package com.C2E.ReacSpringShip.room.service.impl;

import com.C2E.ReacSpringShip.room.model.entity.RoomEntity;
import com.C2E.ReacSpringShip.room.model.entity.RoomUserEntity;
import com.C2E.ReacSpringShip.room.model.enumeration.RoleEnum;
import com.C2E.ReacSpringShip.room.model.enumeration.StatusEnum;
import com.C2E.ReacSpringShip.room.repository.RoomRepository;
import com.C2E.ReacSpringShip.room.repository.RoomUserRepository;
import com.C2E.ReacSpringShip.room.service.RoomService;
import com.C2E.ReacSpringShip.user.entity.UserEntity;
import com.C2E.ReacSpringShip.user.service.UserService;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class RoomServiceImpl implements RoomService {
    private final RoomRepository roomRepository;
    private final RoomUserRepository roomUserRepository;
    private final UserService userService;

    public RoomServiceImpl(RoomRepository roomRepository, RoomUserRepository roomUserRepository, UserService userService) {
        this.roomRepository = roomRepository;
        this.roomUserRepository = roomUserRepository;
        this.userService = userService;
    }

    @Override
    public RoomEntity createRoom(int maxPlayers, Jwt jwt) {
        RoomEntity room = new RoomEntity();
        room.setCode(generateUniqueCode());
        room.setMaxPlayers(maxPlayers);
        room.setStatus(StatusEnum.WAITING);

        String userRole = jwt.getClaimAsString("role");
        if (!"GUEST".equals(userRole)) {
            UUID userId = UUID.fromString(jwt.getSubject());
            UserEntity user = userService.findById(userId);
            room.setUser(user);
        }

        RoomEntity savedRoom = roomRepository.save(room);
        addParticipant(savedRoom, jwt, RoleEnum.HOST);
        return savedRoom;
    }

    @Override
    public RoomUserEntity joinRoom(String code, Jwt jwt) {
        RoomEntity room = roomRepository.findByCode(code)
                .orElseThrow(() -> new RuntimeException("Sala no encontrada"));

        if (room.getStatus() != StatusEnum.WAITING) {
            throw new RuntimeException("La sala no está disponible");
        }

        int currentCount = roomUserRepository.countByRoom(room);
        if (currentCount >= room.getMaxPlayers()) {
            throw new RuntimeException("La sala está llena");
        }

        // Verificar si ya está en la sala
        if (isAlreadyInRoom(room, jwt)) {
            throw new RuntimeException("Ya estás en esta sala");
        }

        return addParticipant(room, jwt, RoleEnum.PLAYER);
    }

    @Override
    public RoomEntity changeStatus(UUID roomId, StatusEnum newStatus) {
        RoomEntity room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Sala no encontrada"));
        room.setStatus(newStatus);
        return roomRepository.save(room);
    }

    @Override
    public RoomEntity findById(UUID roomId) {
        return roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Sala no encontrada"));
    }

    // private methods

    private RoomUserEntity addParticipant(RoomEntity room, Jwt jwt, RoleEnum role) {
        RoomUserEntity participant = new RoomUserEntity();
        participant.setRoom(room);
        participant.setRole(role);
        participant.setJoinedAt(LocalDateTime.now());
        participant.setConected(true);

        String userRole = jwt.getClaimAsString("role");
        String nickname = jwt.getClaimAsString("nickname");
        participant.setNickname(nickname);

        if ("GUEST".equals(userRole)) {
            // sub es el guest_token
            participant.setGuestToken(UUID.fromString(jwt.getSubject()));
        } else {
            // sub es el user_id
            UUID userId = UUID.fromString(jwt.getSubject());
            UserEntity user = userService.findById(userId);
            participant.setUser(user);
        }

        return roomUserRepository.save(participant);
    }

    private boolean isAlreadyInRoom(RoomEntity room, Jwt jwt) {
        String userRole = jwt.getClaimAsString("role");
        if ("GUEST".equals(userRole)) {
            return roomUserRepository.existsByRoomAndGuestToken(room, UUID.fromString(jwt.getSubject()));
        }
        UUID userId = UUID.fromString(jwt.getSubject());
        UserEntity user = userService.findById(userId);
        return roomUserRepository.existsByRoomAndUser(room, user);
    }


    private String generateUniqueCode() {
        String code;
        do {
            code = UUID.randomUUID().toString().substring(0, 6).toUpperCase();
        } while (roomRepository.existsByCode(code));
        return code;
    }
}
