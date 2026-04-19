CREATE TABLE player_results (
    result_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES game_session(session_id),
    participant_id UUID NOT NULL REFERENCES room_users(player_id),
    score BIGINT NOT NULL DEFAULT 0,
    placement INT
);