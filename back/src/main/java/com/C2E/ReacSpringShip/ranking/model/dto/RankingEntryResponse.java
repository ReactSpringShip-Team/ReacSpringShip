package com.C2E.ReacSpringShip.ranking.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;

@Schema(description = "A single entry in the global leaderboard")
public record RankingEntryResponse(

        @Schema(description = "Player's rank position in the leaderboard", example = "1")
        Integer position,

        @Schema(description = "Player's display name", example = "StarPilot99")
        String username,

        @Schema(description = "Highest score achieved by the player", example = "15400")
        Integer bestScore,

        @Schema(description = "Best survival time in seconds", example = "312")
        Integer bestTime,

        @Schema(description = "When this ranking entry was last updated", example = "2025-04-20T18:30:00")
        LocalDateTime updatedAt
) {
}
