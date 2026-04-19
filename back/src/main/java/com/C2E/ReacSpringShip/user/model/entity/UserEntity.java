package com.C2E.ReacSpringShip.user.model.entity;

import com.C2E.ReacSpringShip.room.model.entity.RoomEntity;
import com.C2E.ReacSpringShip.room.model.entity.RoomUserEntity;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "users")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "user_id")
    private UUID id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(name = "password_hash", nullable = false)
    private String password;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(name = "created_at")
    private final LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "enabled")
    private Boolean enabled = true; //sujeto a cambios para la verificacion de email

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    public List<RoomEntity> rooms;

    @OneToMany(mappedBy = "user", fetch =  FetchType.LAZY)
    public List<RoomUserEntity>  roomUsers;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    public Set<RoleEntity> roles = new HashSet<>();

    public UserEntity(UUID id, String username, String password, String email, Boolean enabled, List<RoomEntity> rooms, List<RoomUserEntity> roomUsers, Set<RoleEntity> roles) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.enabled = enabled;
        this.rooms = rooms;
        this.roomUsers = roomUsers;
        this.roles = roles;
    }

    public UserEntity(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    public UserEntity() {
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    public List<RoomEntity> getRooms() {
        return rooms;
    }

    public void setRooms(List<RoomEntity> rooms) {
        this.rooms = rooms;
    }

    public List<RoomUserEntity> getRoomUsers() {
        return roomUsers;
    }

    public void setRoomUsers(List<RoomUserEntity> roomUsers) {
        this.roomUsers = roomUsers;
    }

    public Set<RoleEntity> getRoles() {
        return roles;
    }

    public void setRoles(Set<RoleEntity> roles) {
        this.roles = roles;
    }
}
