package com.C2E.ReacSpringShip.ranking.repository;

import com.C2E.ReacSpringShip.ranking.entity.RankingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface RankingRepository extends JpaRepository<RankingEntity, UUID> {
}
