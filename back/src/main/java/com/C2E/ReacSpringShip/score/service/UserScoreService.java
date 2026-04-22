package com.C2E.ReacSpringShip.score.service;

import com.C2E.ReacSpringShip.score.model.dto.response.LeaderboardEntryResponse;
import com.C2E.ReacSpringShip.score.model.dto.response.PersonalStatsResponse;
import com.C2E.ReacSpringShip.score.model.dto.request.SaveScoreRequest;
import com.C2E.ReacSpringShip.score.model.dto.response.UserScoreResponse;

import java.util.List;
import java.util.UUID;

public interface UserScoreService {
    UserScoreResponse saveScore(UUID userId, SaveScoreRequest request);
    List<UserScoreResponse> getPersonalHistory(UUID userId);
    PersonalStatsResponse getPersonalStats(UUID userId);
    List<LeaderboardEntryResponse> getLeaderboard(int limit);
}
