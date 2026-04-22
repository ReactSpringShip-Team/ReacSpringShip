package com.C2E.ReacSpringShip.ranking.controller;

import com.C2E.ReacSpringShip.ranking.model.dto.RankingEntryResponse;
import com.C2E.ReacSpringShip.ranking.service.RankingService;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/rankings")
@ConditionalOnProperty(name = "features.rankings.enabled", havingValue = "true")
public class RankingController {

    private final RankingService rankingService;

    public RankingController(RankingService rankingService) {
        this.rankingService = rankingService;
    }

    @GetMapping
    public ResponseEntity<List<RankingEntryResponse>> getRankings() {
        return ResponseEntity.ok(rankingService.getRankings());
    }
}
