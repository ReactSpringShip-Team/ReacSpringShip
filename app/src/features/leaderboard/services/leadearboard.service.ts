import { api } from "../../../shared/services/api";

export const leaderboardService = {
    getAllScores: async () => {
        const URL = '';
        const { data } = await api.get(URL);
        return data;
    },
    getMyScores: async () => {
        const URL = '';
        const { data } = await api.get(URL);
        return data;
    }
}