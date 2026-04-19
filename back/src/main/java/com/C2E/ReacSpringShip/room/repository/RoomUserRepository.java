package com.C2E.ReacSpringShip.room.repository;

import com.C2E.ReacSpringShip.room.model.entity.RoomEntity;
import com.C2E.ReacSpringShip.room.model.entity.RoomUserEntity;
import com.C2E.ReacSpringShip.user.model.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface RoomUserRepository  extends JpaRepository<RoomUserEntity, UUID> {
    Optional<RoomUserEntity> findByRoomAndUser(RoomEntity room, UserEntity user);
    Optional<RoomUserEntity> findByRoomAndGuestToken(RoomEntity room, UUID guestToken);
    List<RoomUserEntity> findAllByRoom(RoomEntity room);
    boolean existsByRoomAndUser(RoomEntity room, UserEntity user);
    boolean existsByRoomAndGuestToken(RoomEntity room, UUID guestToken);
    int countByRoom(RoomEntity room);
}
