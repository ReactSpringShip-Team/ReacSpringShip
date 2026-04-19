package com.C2E.ReacSpringShip.room.model.dto;

import com.C2E.ReacSpringShip.room.model.entity.RoomUserEntity;

import java.util.UUID;

public record JoinedRoomResponse(
        UUID participant,
        UUID room,
        String code
) {
    public static JoinedRoomResponse from(RoomUserEntity roomUserEntity) {
        return new JoinedRoomResponse(
                roomUserEntity.getId(),
                roomUserEntity.getRoom().getId(),
                roomUserEntity.getRoom().getCode()
        );
    }
}
