CREATE TABLE user_scores (
    score_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    score BIGINT NOT NULL DEFAULT 0,
    time_secs INTEGER NOT NULL,
    played_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_user_scores_user_id ON user_scores(user_id);
CREATE INDEX idx_user_scores_score   ON user_scores(score DESC);