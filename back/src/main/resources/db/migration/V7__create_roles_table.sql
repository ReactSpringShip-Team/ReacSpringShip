CREATE table roles(
    role_id SERIAL primary key,
    name VARCHAR(20) NOT NULL UNIQUE
);

INSERT INTO roles (name) VALUES
    ('ADMIN'),
    ('USER'),
    ('GUEST');