package com.C2E.ReacSpringShip.score.controller;

import com.C2E.ReacSpringShip.common.dto.ErrorResponse;
import com.C2E.ReacSpringShip.score.model.dto.response.LeaderboardEntryResponse;
import com.C2E.ReacSpringShip.score.model.dto.response.PersonalStatsResponse;
import com.C2E.ReacSpringShip.score.model.dto.request.SaveScoreRequest;
import com.C2E.ReacSpringShip.score.model.dto.response.UserScoreResponse;
import com.C2E.ReacSpringShip.score.service.UserScoreService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/scores")
@Tag(name = "Scores", description = "Player score and game statistics management")
@ConditionalOnProperty(name = "features.score.enabled", havingValue = "true")
public class UserScoreController {

    private final UserScoreService userScoreService;

    public UserScoreController(UserScoreService userScoreService) {
        this.userScoreService = userScoreService;
    }


    @Operation(
            summary = "Save score",
            description = "Records the result of a completed game session for the authenticated user.",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Score saved successfully",
                    content = @Content(schema = @Schema(implementation = UserScoreResponse.class))),
            @ApiResponse(responseCode = "401", description = "Missing or invalid JWT token",
                    content = @Content(schema =  @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "User not found",
                    content = @Content(schema =  @Schema(implementation = ErrorResponse.class))),
    })
    @PostMapping
    public ResponseEntity<UserScoreResponse> saveScore(@AuthenticationPrincipal Jwt jwt, @RequestBody SaveScoreRequest request) {
        UUID userId = UUID.fromString(jwt.getSubject());
        UserScoreResponse response = userScoreService.saveScore(userId, request);
        return ResponseEntity.ok(response);
    }

    @Operation(
            summary = "Personal game history",
            description = "Returns all game sessions for the authenticated user, ordered from most recent to oldest.",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "History retrieved successfully",
                    content = @Content(schema = @Schema(implementation = UserScoreResponse.class))),
            @ApiResponse(responseCode = "401", description = "Missing or invalid JWT token",
                    content = @Content(schema =  @Schema(implementation = ErrorResponse.class))),
    })
    @GetMapping("/me")
    public ResponseEntity<List<UserScoreResponse>> getMyHistory(@AuthenticationPrincipal Jwt jwt) {
        UUID userId = UUID.fromString(jwt.getSubject());
        List<UserScoreResponse> history = userScoreService.getPersonalHistory(userId);
        return ResponseEntity.ok(history);
    }

    @Operation(
            summary = "Personal statistics",
            description = "Returns the best score, best time and total games played for the authenticated user.",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Statistics retrieved successfully",
                    content = @Content(schema = @Schema(implementation = PersonalStatsResponse.class))),
            @ApiResponse(responseCode = "401", description = "Missing or invalid JWT token",
                    content = @Content(schema =  @Schema(implementation = ErrorResponse.class))),
    })
    @GetMapping("/me/stats")
    public ResponseEntity<PersonalStatsResponse> getMyStats(@AuthenticationPrincipal Jwt jwt) {
        UUID userId = UUID.fromString(jwt.getSubject());
        PersonalStatsResponse stats = userScoreService.getPersonalStats(userId);
        return ResponseEntity.ok(stats);
    }

    @Operation(
            summary = "Global leaderboard",
            description = "Returns the top players ranked by best score. Does not require authentication."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Leaderboard retrieved successfully",
                    content = @Content(schema = @Schema(implementation = LeaderboardEntryResponse.class)))
    })
    @GetMapping("/leaderboard")
    public ResponseEntity<List<LeaderboardEntryResponse>> getLeaderboard(@RequestParam(defaultValue = "10") int limit) {
        List<LeaderboardEntryResponse> leaderboard = userScoreService.getLeaderboard(limit);
        return ResponseEntity.ok(leaderboard);
    }

}
