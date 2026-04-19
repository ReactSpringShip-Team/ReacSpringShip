package com.C2E.ReacSpringShip.ranking.service;

import com.C2E.ReacSpringShip.ranking.model.dto.RankingEntryResponse;

import java.util.List;
import java.util.UUID;

public interface RankingService {
    List<RankingEntryResponse> getRankings();
    void updateRanking(UUID userId, Integer newScore, Integer newTime);
}
