CREATE TABLE rankings (
    ranking_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES users(user_id),
    win INT NOT NULL DEFAULT 0,
    losses INT NOT NULL DEFAULT 0,
    games_played INT NOT NULL DEFAULT 0,
    total_score BIGINT NOT NULL DEFAULT 0,
    win_rate NUMERIC(5, 2) NOT NULL DEFAULT 0.00,
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);