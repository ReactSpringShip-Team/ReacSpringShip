package com.C2E.ReacSpringShip.score.model.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;

@Schema(description = "Saved game session result")
public record UserScoreResponse(

        @Schema(description = "Score achieved in the session", example = "4200")
        Long score,

        @Schema(description = "Session duration in seconds", example = "183")
        Integer timeSecs,

        @Schema(description = "Date and time when the game was played")
        LocalDateTime playedAt

) {
}
