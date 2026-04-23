import { describe, it, expect, vi, beforeEach } from 'vitest';
import { leaderboardService } from './leadearboard.service';
import { api } from '../../../shared/services/api';

vi.mock('../../../shared/services/api', () => ({
  api: {
    get: vi.fn(),
  },
}));

describe('leaderboardService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call getAllScores with default limit of 10', async () => {
    const mockData = [{ username: 'Player1', bestScore: 100, bestTime: 10 }];
    (api.get as any).mockResolvedValue({ data: mockData });

    const result = await leaderboardService.getAllScores();

    expect(api.get).toHaveBeenCalledWith('/api/v1/scores/leaderboard?limit=10');
    expect(result).toEqual(mockData);
  });

  it('should call getAllScores with a custom limit', async () => {
    const mockData = [{ username: 'Player1', bestScore: 100, bestTime: 10 }];
    (api.get as any).mockResolvedValue({ data: mockData });

    const result = await leaderboardService.getAllScores(5);

    expect(api.get).toHaveBeenCalledWith('/api/v1/scores/leaderboard?limit=5');
    expect(result).toEqual(mockData);
  });

  it('should call getMyScores', async () => {
    const mockData = [{ score: 50, timeSecs: 20, playedAt: '2026-04-23' }];
    (api.get as any).mockResolvedValue({ data: mockData });

    const result = await leaderboardService.getMyScores();

    expect(api.get).toHaveBeenCalledWith('/api/v1/scores/me');
    expect(result).toEqual(mockData);
  });
});
