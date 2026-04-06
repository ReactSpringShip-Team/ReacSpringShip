package com.C2E.ReacSpringShip.room.repository;

import com.C2E.ReacSpringShip.room.model.entity.RoomEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface RoomRepository extends JpaRepository<RoomEntity, UUID> {
    Optional<RoomEntity> findByCode(String code);
    boolean existsByCode(String code);
}
