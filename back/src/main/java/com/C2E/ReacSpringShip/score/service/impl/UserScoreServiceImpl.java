package com.C2E.ReacSpringShip.score.service.impl;

import com.C2E.ReacSpringShip.score.model.dto.response.LeaderboardEntryResponse;
import com.C2E.ReacSpringShip.score.model.dto.response.PersonalStatsResponse;
import com.C2E.ReacSpringShip.score.model.dto.request.SaveScoreRequest;
import com.C2E.ReacSpringShip.score.model.dto.response.UserScoreResponse;
import com.C2E.ReacSpringShip.score.model.entity.UserScoreEntity;
import com.C2E.ReacSpringShip.score.repository.UserScoreRepository;
import com.C2E.ReacSpringShip.score.service.UserScoreService;
import com.C2E.ReacSpringShip.user.model.entity.UserEntity;
import com.C2E.ReacSpringShip.user.service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserScoreServiceImpl implements UserScoreService {
    private final UserScoreRepository userScoreRepository;
    private final UserService userService;

    public UserScoreServiceImpl(UserScoreRepository userScoreRepository, UserService userService) {
        this.userScoreRepository = userScoreRepository;
        this.userService = userService;
    }

    @Override
    @Transactional
    public UserScoreResponse saveScore(UUID userId, SaveScoreRequest request) {
        UserEntity user = userService.findById(userId);

        UserScoreEntity entity = new UserScoreEntity();
        entity.setUser(user);
        entity.setScore(request.score());
        entity.setTimeSecs(request.timeSecs());

        UserScoreEntity saved = userScoreRepository.save(entity);
        return toResponse(saved);
    }

    @Override
    public List<UserScoreResponse> getPersonalHistory(UUID userId) {
        return userScoreRepository
                .findByUserIdOrderByPlayedAtDesc(userId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    public PersonalStatsResponse getPersonalStats(UUID userId) {
        Long bestScore = userScoreRepository.findBestScoreByUserId(userId);
        Integer bestTime = userScoreRepository.findBestTimeByUserId(userId);
        int gamesPlayed = userScoreRepository.findByUserIdOrderByPlayedAtDesc(userId).size();

        return new PersonalStatsResponse(
                bestScore != null ? bestScore : 0L,
                bestTime,
                gamesPlayed
        );
    }

    @Override
    public List<LeaderboardEntryResponse> getLeaderboard(int limit) {
        return userScoreRepository
                .findTopScorePerUser(PageRequest.of(0, limit))
                .stream()
                .map(s -> new LeaderboardEntryResponse(
                        s.getUser().getUsername(),
                        s.getScore(),
                        s.getTimeSecs()
                ))
                .toList();
    }

    private UserScoreResponse toResponse(UserScoreEntity entity) {
        return new UserScoreResponse(
                entity.getScore(),
                entity.getTimeSecs(),
                entity.getPlayedAt()
        );
    }
}
