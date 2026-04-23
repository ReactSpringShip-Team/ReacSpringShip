import { api } from "../../../shared/services/api";

export const scoreService = {
    sendScore: async (score: number, timeSecs: number) => {
        const URL = '/api/v1/scores';
        const { data } = await api.post(URL, {score, timeSecs});
        return data;
    },
}