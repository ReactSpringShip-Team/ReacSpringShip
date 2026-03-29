package com.C2E.ReacSpringShip.ranking.entity;

import com.C2E.ReacSpringShip.user.entity.UserEntity;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "rankings")
public class RankingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;

    @Column(name = "total_score")
    private Long totalScore;

    private Long win;

    private Long losses;

    @Column(name = "win_rate")
    private float winRate;

    @Column(name = "games_played")
    private Long gamesPlayed;

    @Column(name = "update_at")
    private LocalDateTime updateAt;

    public RankingEntity(LocalDateTime updateAt, Long gamesPlayed, float winRate, Long losses, Long win, Long totalScore, UserEntity userEntity) {
        this.updateAt = updateAt;
        this.gamesPlayed = gamesPlayed;
        this.winRate = winRate;
        this.losses = losses;
        this.win = win;
        this.totalScore = totalScore;
        this.userEntity = userEntity;
    }


    public RankingEntity() {
    }

    public UserEntity getUserEntity() {
        return userEntity;
    }

    public void setUserEntity(UserEntity userEntity) {
        this.userEntity = userEntity;
    }

    public Long getTotalScore() {
        return totalScore;
    }

    public void setTotalScore(Long totalScore) {
        this.totalScore = totalScore;
    }

    public Long getWin() {
        return win;
    }

    public void setWin(Long win) {
        this.win = win;
    }

    public Long getLosses() {
        return losses;
    }

    public void setLosses(Long losses) {
        this.losses = losses;
    }

    public float getWinRate() {
        return winRate;
    }

    public void setWinRate(float winRate) {
        this.winRate = winRate;
    }

    public Long getGamesPlayed() {
        return gamesPlayed;
    }

    public void setGamesPlayed(Long gamesPlayed) {
        this.gamesPlayed = gamesPlayed;
    }

    public LocalDateTime getUpdateAt() {
        return updateAt;
    }

    public void setUpdateAt(LocalDateTime updateAt) {
        this.updateAt = updateAt;
    }
}
