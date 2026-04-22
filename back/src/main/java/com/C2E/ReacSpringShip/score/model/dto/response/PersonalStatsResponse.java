package com.C2E.ReacSpringShip.score.model.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Aggregated statistics for a player")
public record PersonalStatsResponse(

        @Schema(description = "Player's all-time best score", example = "8500")
        Long bestScore,

        @Schema(description = "Player's best recorded time in seconds (lower is better)", example = "97")
        Integer bestTime,

        @Schema(description = "Total number of games played", example = "42")
        int gamesPlayed

) {
}
