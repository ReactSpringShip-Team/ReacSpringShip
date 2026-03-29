package com.C2E.ReacSpringShip.room.model.entity;

import com.C2E.ReacSpringShip.room.model.enumeration.StatusEnum;
import com.C2E.ReacSpringShip.user.entity.UserEntity;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "rooms")
public class RoomEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String code;

    @Column(name = "max_players")
    private int maxPlayers;

    @Enumerated(EnumType.STRING)
    private StatusEnum status;

    @Column(name = "created_at")
    private final LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "ended_at")
    private LocalDateTime endedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by", nullable = true)
    private UserEntity user;

    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY)
    private List<RoomUserEntity> roomUsers;

    public RoomEntity() {
    }

    public RoomEntity(String code, int maxPlayers, StatusEnum status, UserEntity user) {
        this.code = code;
        this.maxPlayers = maxPlayers;
        this.status = status;
        this.user = user;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public int getMaxPlayers() {
        return maxPlayers;
    }

    public void setMaxPlayers(int maxPlayers) {
        this.maxPlayers = maxPlayers;
    }

    public StatusEnum getStatus() {
        return status;
    }

    public void setStatus(StatusEnum status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getEndedAt() {
        return endedAt;
    }

    public void setEndedAt(LocalDateTime endedAt) {
        this.endedAt = endedAt;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }
}
