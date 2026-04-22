package com.C2E.ReacSpringShip.score.model.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Global leaderboard entry")
public record LeaderboardEntryResponse(

        @Schema(description = "Player's username", example = "einar42")
        String username,

        @Schema(description = "Player's best score", example = "8500")
        Long bestScore,

        @Schema(description = "Player's best time in seconds", example = "97")
        Integer bestTime

) {
}
