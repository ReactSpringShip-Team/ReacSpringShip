import { api } from "../../../shared/services/api";

export const scoreService = {
    sendScore: async (username: string, score: number, time: number) => {
        const URL = '';
        const { data } = await api.post(URL, {username, score, time});
        return data;
    },
}