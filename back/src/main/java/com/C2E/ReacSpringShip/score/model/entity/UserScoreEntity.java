package com.C2E.ReacSpringShip.score.model.entity;

import com.C2E.ReacSpringShip.user.model.entity.UserEntity;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "user_scores")
public class UserScoreEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "score_id", updatable = false, nullable = false)
    private UUID scoreId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @Column(name = "score", nullable = false)
    private Long score;

    @Column(name = "time_secs", nullable = false)
    private Integer timeSecs;

    @Column(name = "played_at", nullable = false, updatable = false)
    private LocalDateTime playedAt;

    public UserScoreEntity() {
    }

    public UserScoreEntity(UserEntity user, Long score, Integer timeSecs, LocalDateTime playedAt) {
        this.user = user;
        this.score = score;
        this.timeSecs = timeSecs;
        this.playedAt = playedAt;
    }

    @PrePersist
    protected void onCreate() {
        if (playedAt == null) {
            playedAt = LocalDateTime.now();
        }
    }


    public UUID getScoreId() { return scoreId; }

    public UserEntity getUser() { return user; }

    public void setUser(UserEntity user) { this.user = user; }

    public Long getScore() { return score; }

    public void setScore(Long score) { this.score = score; }

    public Integer getTimeSecs() { return timeSecs; }

    public void setTimeSecs(Integer timeSecs) { this.timeSecs = timeSecs; }

    public LocalDateTime getPlayedAt() { return playedAt; }

}
