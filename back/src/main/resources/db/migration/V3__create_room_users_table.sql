CREATE TABLE room_users (
    player_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    room_id UUID NOT NULL REFERENCES rooms(room_id),
    user_id UUID REFERENCES users(user_id),
    guest_token UUID,
    nickname VARCHAR(50) NOT NULL,
    role_room VARCHAR(20) NOT NULL DEFAULT 'PLAYER',
    is_connected BOOLEAN NOT NULL DEFAULT FALSE,
    joined_at TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT chk_participant CHECK (
        (user_id IS NOT NULL AND guest_token IS NULL) OR
        (user_id IS NULL AND guest_token IS NOT NULL)
    )
);