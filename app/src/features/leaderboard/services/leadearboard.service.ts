import { api } from "../../../shared/services/api";
import { API_ENDPOINTS } from "../../../config/api";
import type { ScoreResponse, UserScoreResponse } from "../types/leaderboard.types";

export const leaderboardService = {
    getAllScores: async (limit: number = 10): Promise<ScoreResponse[]> => {
        const { data } = await api.get<ScoreResponse[]>(API_ENDPOINTS.GET_LEADERBOARD, {
            params: { limit }
        });
        return data;
    },
    getMyScores: async (): Promise<UserScoreResponse[]> => {
        const { data } = await api.get<UserScoreResponse[]>(API_ENDPOINTS.GET_MY_SCORES);
        return data;
    }
}