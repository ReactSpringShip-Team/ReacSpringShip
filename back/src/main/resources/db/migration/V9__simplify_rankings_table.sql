ALTER TABLE rankings DROP COLUMN win;
ALTER TABLE rankings DROP COLUMN losses;
ALTER TABLE rankings DROP COLUMN games_played;
ALTER TABLE rankings DROP COLUMN win_rate;
ALTER TABLE rankings RENAME COLUMN total_score TO best_score;