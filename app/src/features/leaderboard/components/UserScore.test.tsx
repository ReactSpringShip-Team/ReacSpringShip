import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { UserScore } from './UserScore';
import { leaderboardService } from '../services/leadearboard.service';
import { useAuth } from '../../auth';
import { MemoryRouter } from 'react-router-dom';

// Mocks
vi.mock('../services/leadearboard.service', () => ({
  leaderboardService: {
    getMyScores: vi.fn(),
  },
}));

vi.mock('../../auth', () => ({
  useAuth: vi.fn(),
}));

// Mock shared components
vi.mock('../../../shared/components/LoadingScreen', () => ({
  LoadingScreen: () => <div data-testid="loading">Loading...</div>
}));

vi.mock('../../../shared/components/ErrorMessage', () => ({
  ErrorMessage: ({ message }: { message: string }) => <div data-testid="error">{message}</div>
}));

describe('UserScore', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows lock message when not authenticated', () => {
    (useAuth as any).mockReturnValue({ isAuthenticated: false });
    
    render(
      <MemoryRouter>
        <UserScore />
      </MemoryRouter>
    );
    
    expect(screen.getByText('SQUAD DATA ENCRYPTED')).toBeInTheDocument();
    expect(screen.getByText('Access Terminal')).toBeInTheDocument();
  });

  it('renders user scores when authenticated', async () => {
    (useAuth as any).mockReturnValue({ isAuthenticated: true });
    const mockScores = [
      { score: 500, timeSecs: 45, playedAt: '2026-04-23T14:00:00Z' }
    ];
    (leaderboardService.getMyScores as any).mockResolvedValue(mockScores);

    render(
      <MemoryRouter>
        <UserScore />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('500 pts')).toBeInTheDocument();
      expect(screen.getByText('45s')).toBeInTheDocument();
      expect(screen.getByText('YOU')).toBeInTheDocument();
    });
  });

  it('shows empty message when authenticated but no scores found', async () => {
    (useAuth as any).mockReturnValue({ isAuthenticated: true });
    (leaderboardService.getMyScores as any).mockResolvedValue([]);

    render(
      <MemoryRouter>
        <UserScore />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("You haven't recorded any scores yet.")).toBeInTheDocument();
    });
  });
});
