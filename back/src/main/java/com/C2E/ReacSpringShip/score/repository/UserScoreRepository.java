package com.C2E.ReacSpringShip.score.repository;

import com.C2E.ReacSpringShip.score.model.entity.UserScoreEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface UserScoreRepository extends JpaRepository<UserScoreEntity, UUID> {
    List<UserScoreEntity> findByUserIdOrderByPlayedAtDesc(UUID userId);

    @Query("SELECT MAX(s.score) FROM UserScoreEntity s WHERE s.user.id = :userId")
    Long findBestScoreByUserId(@Param("userId") UUID userId);

    @Query("SELECT MIN(s.timeSecs) FROM UserScoreEntity s WHERE s.user.id = :userId")
    Integer findBestTimeByUserId(@Param("userId") UUID userId);

    @EntityGraph(attributePaths = "user")
    @Query("""
        SELECT s FROM UserScoreEntity s
        WHERE s.score = (
            SELECT MAX(s2.score) FROM UserScoreEntity s2
            WHERE s2.user = s.user
        )
        ORDER BY s.score DESC, s.timeSecs ASC
    """)
    List<UserScoreEntity> findTopScorePerUser(Pageable pageable);
}
