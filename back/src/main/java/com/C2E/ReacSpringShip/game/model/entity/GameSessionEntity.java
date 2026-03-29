package com.C2E.ReacSpringShip.game.model.entity;

import com.C2E.ReacSpringShip.room.model.entity.RoomEntity;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "game_session")
public class GameSessionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "session_id")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private RoomEntity room;

    /*@Column(name = "result_data")
    private Object resultData; */ // Not defined yet

    @Column(name = "start_at")
    private LocalDateTime startAt;

    @Column(name = "end_at")
    private LocalDateTime endAt;

    @OneToMany(mappedBy = "session", fetch = FetchType.LAZY)
    private List<PlayerResultEntity> playerResults;

    public GameSessionEntity(RoomEntity room, LocalDateTime startAt, LocalDateTime endAt) {
        this.room = room;
        this.startAt = startAt;
        this.endAt = endAt;
    }

    public GameSessionEntity() {}

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public RoomEntity getRoom() {
        return room;
    }

    public void setRoom(RoomEntity room) {
        this.room = room;
    }

    public LocalDateTime getStartAt() {
        return startAt;
    }

    public void setStartAt(LocalDateTime startAt) {
        this.startAt = startAt;
    }

    public LocalDateTime getEndAt() {
        return endAt;
    }

    public void setEndAt(LocalDateTime endAt) {
        this.endAt = endAt;
    }
}
