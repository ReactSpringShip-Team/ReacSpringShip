import { describe, it, expect, vi, beforeEach } from 'vitest';
import { scoreService } from './score.service';
import { api } from '../../../shared/services/api';

vi.mock('../../../shared/services/api', () => ({
  api: {
    post: vi.fn(),
  },
}));

describe('scoreService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('sendScore', () => {
    it('should successfully send score and timeSecs', async () => {
      const mockResponse = { data: { id: 1, score: 1000, timeSecs: 60 } };
      (api.post as any).mockResolvedValue(mockResponse);

      const result = await scoreService.sendScore(1000, 60);

      expect(api.post).toHaveBeenCalledWith('/api/v1/scores', {
        score: 1000,
        timeSecs: 60,
      });
      expect(result).toEqual(mockResponse.data);
    });

    it('should throw an error when sending score fails', async () => {
      const mockError = new Error('Internal Server Error');
      (api.post as any).mockRejectedValue(mockError);

      await expect(scoreService.sendScore(1000, 60)).rejects.toThrow('Internal Server Error');
    });
  });
});
