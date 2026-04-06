package com.C2E.ReacSpringShip.room.model.dto;

import com.C2E.ReacSpringShip.room.model.entity.RoomUserEntity;

import java.util.UUID;

public record JoinedRoomResponse(
        boolean success,
        UUID participant,
        UUID room,
        String code,
        String message
) {
    public static JoinedRoomResponse isValid(RoomUserEntity roomUserEntity) {
        return new JoinedRoomResponse(
          true,
          roomUserEntity.getId(),
          roomUserEntity.getRoom().getId(),
          roomUserEntity.getRoom().getCode(),
          "Joined successfully"
        );
    }
}
