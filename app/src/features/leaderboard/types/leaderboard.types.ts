export interface ScoreResponse {
  username: string;
  bestScore: number;
  bestTime: number;
}

export interface UserScoreResponse {
  score: number;
  timeSecs: number;
  playedAt: string;
}
