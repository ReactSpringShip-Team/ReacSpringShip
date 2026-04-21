CREATE TABLE game_session (
    session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    room_id UUID NOT NULL REFERENCES rooms(room_id),
    start_at TIMESTAMP NOT NULL DEFAULT NOW(),
    end_at TIMESTAMP
);