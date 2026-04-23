import { api } from "../../../shared/services/api";
import type { ScoreResponse, UserScoreResponse } from "../types/leaderboard.types";

export const leaderboardService = {
    getAllScores: async (limit: number = 10): Promise<ScoreResponse[]> => {
        const URL = `/api/v1/scores/leaderboard?limit=${limit}`;
        const { data } = await api.get<ScoreResponse[]>(URL);
        return data;
    },
    getMyScores: async (): Promise<UserScoreResponse[]> => {
        const URL = '/api/v1/scores/me';
        const { data } = await api.get<UserScoreResponse[]>(URL);
        return data;
    }
}