package com.C2E.ReacSpringShip.room.controller;

import com.C2E.ReacSpringShip.room.model.dto.JoinedRoomResponse;
import com.C2E.ReacSpringShip.room.model.dto.RoomResponse;
import com.C2E.ReacSpringShip.room.model.entity.RoomEntity;
import com.C2E.ReacSpringShip.room.model.entity.RoomUserEntity;
import com.C2E.ReacSpringShip.room.service.RoomService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/rooms")
public class RoomController {

    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @PostMapping("/create")
    public ResponseEntity<RoomResponse> create(@RequestParam(defaultValue = "4") int maxPlayers, @AuthenticationPrincipal Jwt jwt) {
        RoomEntity room = roomService.createRoom(maxPlayers, jwt);
        return ResponseEntity.ok(RoomResponse.from(room));
    }

    @PostMapping("/join/{code}")
    public ResponseEntity<JoinedRoomResponse> join(@PathVariable String code, @AuthenticationPrincipal Jwt jwt) {
        RoomUserEntity user = roomService.joinRoom(code, jwt);
        return ResponseEntity.ok(JoinedRoomResponse.isValid(user));
    }

}