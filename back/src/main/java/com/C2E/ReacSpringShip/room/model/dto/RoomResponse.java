package com.C2E.ReacSpringShip.room.model.dto;

import com.C2E.ReacSpringShip.room.model.entity.RoomEntity;
import com.C2E.ReacSpringShip.room.model.enumeration.StatusEnum;

import java.time.LocalDateTime;
import java.util.UUID;

public record RoomResponse(
        UUID roomId,
        String code,
        int maxPlayers,
        StatusEnum status,
        LocalDateTime createdAt
) {
    public static RoomResponse from(RoomEntity room) {
        return new RoomResponse(
                room.getId(),
                room.getCode(),
                room.getMaxPlayers(),
                room.getStatus(),
                room.getCreatedAt()
        );
    }
}
