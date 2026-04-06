package com.C2E.ReacSpringShip.game.repository;

import com.C2E.ReacSpringShip.game.model.entity.GameSessionEntity;
import com.C2E.ReacSpringShip.game.model.entity.PlayerResultEntity;
import com.C2E.ReacSpringShip.room.model.entity.RoomUserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PlayerResultRepository extends JpaRepository<PlayerResultEntity, UUID> {
    List<PlayerResultEntity> findAllBySession(GameSessionEntity gameSession);
    Optional<PlayerResultEntity> findBySessionAndParticipant(GameSessionEntity gameSession, RoomUserEntity participant);
}
