import { describe, it, expect } from 'vitest';
import { getRankStyles } from './getRankStyles';

describe('getRankStyles', () => {
  it('should return gold styles for rank 1', () => {
    const styles = getRankStyles(1);
    expect(styles.suffix).toBe('st');
    expect(styles.rankText).toContain('text-yellow-400');
  });

  it('should return silver styles for rank 2', () => {
    const styles = getRankStyles(2);
    expect(styles.suffix).toBe('nd');
    expect(styles.rankText).toContain('text-gray-100');
  });

  it('should return bronze styles for rank 3', () => {
    const styles = getRankStyles(3);
    expect(styles.suffix).toBe('rd');
    expect(styles.rankText).toContain('text-orange-400');
  });

  it('should return default styles for rank 4 and above', () => {
    const styles = getRankStyles(4);
    expect(styles.suffix).toBe('th');
    expect(styles.rankText).toContain('text-slate-500');
    
    const styles10 = getRankStyles(10);
    expect(styles10.suffix).toBe('th');
  });
});
