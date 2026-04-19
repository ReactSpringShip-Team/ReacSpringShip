package com.C2E.ReacSpringShip.room.service;

import com.C2E.ReacSpringShip.room.model.entity.RoomEntity;
import com.C2E.ReacSpringShip.room.model.entity.RoomUserEntity;
import com.C2E.ReacSpringShip.room.model.enumeration.StatusRoomEnum;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.UUID;

public interface RoomService {
    RoomEntity createRoom(int maxPlayers, Jwt jwt);
    RoomUserEntity joinRoom(String code, Jwt jwt);
    RoomEntity changeStatus(UUID roomId, StatusRoomEnum newStatus);
    RoomEntity findById(UUID roomId);
}
