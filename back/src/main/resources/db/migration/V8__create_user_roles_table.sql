CREATE TABLE user_roles(
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    role_id SERIAL NOT NULL REFERENCES roles(role_id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);