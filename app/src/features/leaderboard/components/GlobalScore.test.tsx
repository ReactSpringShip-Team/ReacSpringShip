import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { GlobalScore } from './GlobalScore';
import { leaderboardService } from '../services/leadearboard.service';

// Mocks
vi.mock('../services/leadearboard.service', () => ({
  leaderboardService: {
    getAllScores: vi.fn(),
  },
}));

// We mock the shared components to simplify testing the logic
vi.mock('../../../shared/components/LoadingScreen', () => ({
  LoadingScreen: () => <div data-testid="loading">Loading...</div>
}));

vi.mock('../../../shared/components/ErrorMessage', () => ({
  ErrorMessage: ({ message }: { message: string }) => <div data-testid="error">{message}</div>
}));

describe('GlobalScore', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loading state initially', () => {
    (leaderboardService.getAllScores as any).mockReturnValue(new Promise(() => {}));
    render(<GlobalScore />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('renders scores after successful fetch', async () => {
    const mockScores = [
      { username: 'Player1', bestScore: 1000, bestTime: 60 },
      { username: 'Player2', bestScore: 800, bestTime: 70 }
    ];
    (leaderboardService.getAllScores as any).mockResolvedValue(mockScores);

    render(<GlobalScore />);

    await waitFor(() => {
      expect(screen.getByText('Player1')).toBeInTheDocument();
      expect(screen.getByText('1000 pts')).toBeInTheDocument();
      expect(screen.getByText('Player2')).toBeInTheDocument();
      expect(screen.getByText('800 pts')).toBeInTheDocument();
    });
  });

  it('shows error message on fetch failure', async () => {
    (leaderboardService.getAllScores as any).mockRejectedValue(new Error('Fetch failed'));

    render(<GlobalScore />);

    await waitFor(() => {
      expect(screen.getByTestId('error')).toHaveTextContent('Failed to load global scores');
    });
  });

  it('shows empty message when no scores are returned', async () => {
    (leaderboardService.getAllScores as any).mockResolvedValue([]);

    render(<GlobalScore />);

    await waitFor(() => {
      expect(screen.getByText('No scores recorded yet.')).toBeInTheDocument();
    });
  });
});
