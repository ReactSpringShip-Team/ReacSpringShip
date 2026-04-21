package com.C2E.ReacSpringShip.room.model.entity;

import com.C2E.ReacSpringShip.game.model.entity.PlayerResultEntity;
import com.C2E.ReacSpringShip.room.model.enumeration.RoleRoomEnum;
import com.C2E.ReacSpringShip.user.model.entity.UserEntity;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "room_users")
public class RoomUserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "player_id")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private RoomEntity room;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @Column(name = "guest_token")
    private UUID guestToken;

    private String nickname;

    @Enumerated(EnumType.STRING)
    @Column(name = "role_room")
    private RoleRoomEnum role;

    @Column(name = "joined_at")
    private LocalDateTime joinedAt;

    @Column(name = "is_connected")
    private boolean isConected;

    @OneToMany(mappedBy = "participant", fetch = FetchType.LAZY)
    private List<PlayerResultEntity> playerResults;

    public RoomUserEntity(RoomEntity room, UserEntity user, UUID guestToken, String nickname, RoleRoomEnum role, LocalDateTime joinedAt, boolean isConected) {
        this.room = room;
        this.user = user;
        this.guestToken = guestToken;
        this.nickname = nickname;
        this.role = role;
        this.joinedAt = joinedAt;
        this.isConected = isConected;
    }

    public RoomUserEntity() {}

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

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public UUID getGuestToken() {
        return guestToken;
    }

    public void setGuestToken(UUID guestToken) {
        this.guestToken = guestToken;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public RoleRoomEnum getRole() {
        return role;
    }

    public void setRole(RoleRoomEnum role) {
        this.role = role;
    }

    public LocalDateTime getJoinedAt() {
        return joinedAt;
    }

    public void setJoinedAt(LocalDateTime joinedAt) {
        this.joinedAt = joinedAt;
    }

    public boolean isConected() {
        return isConected;
    }

    public void setConected(boolean conected) {
        isConected = conected;
    }
}
