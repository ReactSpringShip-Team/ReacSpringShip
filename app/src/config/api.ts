
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export const API_ENDPOINTS = {
  LOGIN: `${BASE_URL}/api/v1/auth/login`,
  REGISTER: `${BASE_URL}/api/v1/auth/register`,
  GET_SCORES: `${BASE_URL}/scores`,
  UPDATE_SCORE: `${BASE_URL}/scores/update`,
};