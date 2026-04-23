
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const API_ENDPOINTS = {
  LOGIN: `/api/v1/auth/login`,
  REGISTER: `/api/v1/auth/register`,
  GET_LEADERBOARD: `/api/v1/scores/leaderboard`,
  GET_MY_SCORES: `/api/v1/scores/me`,
  UPDATE_SCORE: `/api/v1/scores/update`,
};