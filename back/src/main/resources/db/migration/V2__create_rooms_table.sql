CREATE TABLE rooms (
    room_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(10) NOT NULL UNIQUE,
    status VARCHAR(20) NOT NULL DEFAULT 'WAITING',
    max_players INT NOT NULL DEFAULT 4,
    created_by UUID NOT NULL REFERENCES users(user_id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    ended_at TIMESTAMP
);