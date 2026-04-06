package com.C2E.ReacSpringShip.game.repository;

import com.C2E.ReacSpringShip.game.model.entity.GameSessionEntity;
import com.C2E.ReacSpringShip.room.model.entity.RoomEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface GameSessionRepository extends JpaRepository<GameSessionEntity, UUID> {
    Optional<GameSessionEntity> findTopByRoomOrderByStartAtDesc(RoomEntity room);
    List<GameSessionEntity> findAllByRoom(RoomEntity room);
}
