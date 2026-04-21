package com.C2E.ReacSpringShip.ranking.repository;

import com.C2E.ReacSpringShip.ranking.model.entity.RankingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface RankingRepository extends JpaRepository<RankingEntity, UUID> {
    @Query("""
        SELECT r FROM RankingEntity r
        JOIN FETCH r.user u
        WHERE r.bestScore > 0
        ORDER BY r.bestScore DESC, r.bestTime ASC NULLS LAST
        """)
    List<RankingEntity> findRankingsOrdered();
    Optional<RankingEntity> findByUserId(UUID userId);
}
