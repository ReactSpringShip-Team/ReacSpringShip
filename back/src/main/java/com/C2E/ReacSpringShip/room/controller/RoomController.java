package com.C2E.ReacSpringShip.room.controller;

import com.C2E.ReacSpringShip.common.dto.ErrorResponse;
import com.C2E.ReacSpringShip.room.model.dto.JoinedRoomResponse;
import com.C2E.ReacSpringShip.room.model.dto.RoomResponse;
import com.C2E.ReacSpringShip.room.service.RoomService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/rooms")
@Tag(name = "Rooms", description = "create and join game rooms")
@ConditionalOnProperty(name = "features.rooms.enabled", havingValue = "true")
public class RoomController {

    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @Operation(summary = "Create a room")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Room created successfully",
                    content = @Content(schema = @Schema(implementation = RoomResponse.class))),
            @ApiResponse(responseCode = "403", description = "Access denied",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @PostMapping("/create")
    public ResponseEntity<RoomResponse> create(@RequestParam(defaultValue = "1") int maxPlayers, @AuthenticationPrincipal Jwt jwt) {
        return ResponseEntity.status(HttpStatus.CREATED).body(RoomResponse.from(roomService.createRoom(maxPlayers, jwt)));
    }

    @Operation(summary = "Join a room by code")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Joined successfully",
                    content = @Content(schema = @Schema(implementation = JoinedRoomResponse.class))),
            @ApiResponse(responseCode = "404", description = "Room not found",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
    })
    @PostMapping("/join/{code}")
    public ResponseEntity<JoinedRoomResponse> join(@PathVariable String code, @AuthenticationPrincipal Jwt jwt) {
        return ResponseEntity.ok(JoinedRoomResponse.from(roomService.joinRoom(code, jwt)));
    }

}