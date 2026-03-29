package com.C2E.ReacSpringShip.game.model.entity;

import com.C2E.ReacSpringShip.room.model.entity.RoomUserEntity;
import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "player_results")
public class PlayerResultEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "result_id")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "session_id")
    private GameSessionEntity session;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "participant_id")
    private RoomUserEntity user;

    private Long score;

    private int placement;

    public PlayerResultEntity(GameSessionEntity session, RoomUserEntity user, Long score, int placement) {
        this.session = session;
        this.user = user;
        this.score = score;
        this.placement = placement;
    }

    public PlayerResultEntity() {
    }

    public GameSessionEntity getSession() {
        return session;
    }

    public void setSession(GameSessionEntity session) {
        this.session = session;
    }

    public RoomUserEntity getUser() {
        return user;
    }

    public void setUser(RoomUserEntity user) {
        this.user = user;
    }

    public Long getScore() {
        return score;
    }

    public void setScore(Long score) {
        this.score = score;
    }

    public int getPlacement() {
        return placement;
    }

    public void setPlacement(int placement) {
        this.placement = placement;
    }
}
