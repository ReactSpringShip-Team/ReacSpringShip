package com.C2E.ReacSpringShip.ranking.entity;

import com.C2E.ReacSpringShip.user.model.entity.UserEntity;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "rankings")
public class RankingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "ranking_id")
    private UUID id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private UserEntity user;

    @Column(name = "best_score", nullable = false)
    private Integer bestScore = 0;

    @Column(name = "best_time")
    private Integer bestTime;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();

    public RankingEntity() {
    }

    public RankingEntity(UserEntity user, Integer bestScore, Integer bestTime, LocalDateTime updatedAt) {
        this.user = user;
        this.bestScore = bestScore;
        this.bestTime = bestTime;
        this.updatedAt = updatedAt;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUserEntity(UserEntity user) {
        this.user = user;
    }

    public Integer getBestScore() {
        return bestScore;
    }

    public void setBestScore(Integer bestScore) {
        this.bestScore = bestScore;
    }

    public Integer getBestTime() {
        return bestTime;
    }

    public void setBestTime(Integer bestTime) {
        this.bestTime = bestTime;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void updateIfBetter(Integer newScore, Integer newTime) {
        if (newScore > this.bestScore ||
                (newScore.equals(this.bestScore) && betterTime(newTime))) {
            this.bestScore = newScore;
            this.bestTime = newTime;
            this.updatedAt = LocalDateTime.now();
        }
    }

    private boolean betterTime(Integer newTime) {
        return this.bestTime == null || newTime < this.bestTime;
    }

}
