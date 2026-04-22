package com.C2E.ReacSpringShip.score.model.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Game session data submitted at the end of a match")
public record SaveScoreRequest(

        @Schema(description = "Score achieved during the game session", example = "4200")
        Long score,

        @Schema(description = "Game session duration in seconds", example = "183")
        Integer timeSecs
) {
}