package com.C2E.ReacSpringShip.ranking.model.dto;

import java.time.LocalDateTime;

public record RankingEntryResponse(
        Integer position,
        String username,
        Integer bestScore,
        Integer bestTime,
        LocalDateTime updatedAt
) {
}
