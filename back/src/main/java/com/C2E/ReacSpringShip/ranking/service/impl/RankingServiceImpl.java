package com.C2E.ReacSpringShip.ranking.service.impl;

import com.C2E.ReacSpringShip.ranking.model.dto.RankingEntryResponse;
import com.C2E.ReacSpringShip.ranking.model.entity.RankingEntity;
import com.C2E.ReacSpringShip.ranking.repository.RankingRepository;
import com.C2E.ReacSpringShip.ranking.service.RankingService;
import com.C2E.ReacSpringShip.user.model.entity.UserEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class RankingServiceImpl implements RankingService {
    private final RankingRepository rankingRepository;

    public RankingServiceImpl(RankingRepository rankingRepository) {
        this.rankingRepository = rankingRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<RankingEntryResponse> getRankings() {
        List<RankingEntity> rankings = rankingRepository.findRankingsOrdered();

        var position = new AtomicInteger(1);
        return rankings.stream()
                .map(r -> new RankingEntryResponse(
                        position.getAndIncrement(),
                        r.getUser().getUsername(),
                        r.getBestScore(),
                        r.getBestTime(),
                        r.getUpdatedAt()
                ))
                .toList();
    }

    @Override
    @Transactional
    public void updateRanking(UUID userId, Integer newScore, Integer newTime) {
        RankingEntity ranking = rankingRepository.findByUserId(userId)
                .orElseGet(() -> createEmptyRanking(userId));

        if (isBetter(ranking, newScore, newTime)) {
            ranking.setBestScore(newScore);
            ranking.setBestTime(newTime);
            ranking.setUpdatedAt(LocalDateTime.now());
            rankingRepository.save(ranking);
        }
    }

    private boolean isBetter(RankingEntity ranking, Integer newScore, Integer newTime) {
        if (newScore > ranking.getBestScore()) return true;
        if (newScore.equals(ranking.getBestScore())) {
            return ranking.getBestTime() == null || newTime < ranking.getBestTime();
        }
        return false;
    }

    private RankingEntity createEmptyRanking(UUID userId) {
        UserEntity user = new UserEntity();
        user.setId(userId);

        RankingEntity ranking = new RankingEntity();
        ranking.setUser(user);
        ranking.setBestScore(0);
        return ranking;
    }

}
