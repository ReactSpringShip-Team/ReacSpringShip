import { describe, it, expect, vi, beforeEach } from 'vitest';
import { authService } from './auth.service';
import { api } from '../../../shared/services/api';

vi.mock('../../../shared/services/api', () => ({
  api: {
    post: vi.fn(),
  },
}));

describe('authService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('register', () => {
    it('should successfully register a user', async () => {
      const mockResponse = { data: { id: 1, username: 'testuser' } };
      (api.post as any).mockResolvedValue(mockResponse);

      const result = await authService.register('testuser', 'test@example.com', 'password123');

      expect(api.post).toHaveBeenCalledWith('/api/v1/auth/register', {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      });
      expect(result).toEqual(mockResponse.data);
    });

    it('should throw an error when registration fails (e.g., 400 Bad Request)', async () => {
      const mockError = new Error('Bad Request');
      (api.post as any).mockRejectedValue(mockError);

      await expect(authService.register('', '', '')).rejects.toThrow('Bad Request');
    });

    it('should throw an error when email/user already exists (e.g., 409 Conflict)', async () => {
      const mockError = { response: { status: 409, data: { message: 'User already exists' } } };
      (api.post as any).mockRejectedValue(mockError);

      try {
        await authService.register('existing', 'existing@test.com', 'pass');
      } catch (error: any) {
        expect(error.response.status).toBe(409);
        expect(error.response.data.message).toBe('User already exists');
      }
    });
  });

  describe('login', () => {
    it('should successfully login a user', async () => {
      const mockResponse = { data: { token: 'fake-token' } };
      (api.post as any).mockResolvedValue(mockResponse);

      const result = await authService.login('testuser', 'password123');

      expect(api.post).toHaveBeenCalledWith('/api/v1/auth/login', {
        username: 'testuser',
        password: 'password123',
      });
      expect(result).toEqual(mockResponse.data);
    });

    it('should throw an error when login fails (e.g., 401 Unauthorized)', async () => {
      const mockError = new Error('Unauthorized');
      (api.post as any).mockRejectedValue(mockError);

      await expect(authService.login('wrong', 'wrong')).rejects.toThrow('Unauthorized');
    });
  });
});
