import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ScoreRow } from './ScoreRow';

describe('ScoreRow', () => {
  const defaultProps = {
    rank: 1,
    username: 'TestPlayer',
    score: 1000,
    time: '1m 20s',
    date: '23 Apr 2026'
  };

  it('renders correctly with all props', () => {
    render(<ScoreRow {...defaultProps} />);
    
    expect(screen.getByText('1st')).toBeInTheDocument();
    expect(screen.getByText('TestPlayer')).toBeInTheDocument();
    expect(screen.getByText('1000 pts')).toBeInTheDocument();
    expect(screen.getByText('1m 20s')).toBeInTheDocument();
    expect(screen.getByText('23 Apr 2026')).toBeInTheDocument();
  });

  it('hides the date if not provided', () => {
    render(<ScoreRow {...defaultProps} date="" />);
    
    expect(screen.getByText('1st')).toBeInTheDocument();
    expect(screen.queryByText('23 Apr 2026')).not.toBeInTheDocument();
  });

  it('applies rank-specific styles for first place', () => {
    const { container } = render(<ScoreRow {...defaultProps} rank={1} />);
    // Check if it contains some gold-related class
    expect(container.firstChild).toHaveClass('from-yellow-600/20');
  });
});
