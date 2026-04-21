ALTER TABLE rooms RENAME COLUMN created_by TO created_by_user;

ALTER TABLE rooms ADD COLUMN created_by_guest UUID;

ALTER TABLE rooms ALTER COLUMN created_by_user DROP NOT NULL;

ALTER TABLE rooms ADD CONSTRAINT chk_rooms_created_by CHECK (
    (created_by_user IS NOT NULL AND created_by_guest IS NULL) OR
    (created_by_user IS NULL AND created_by_guest IS NOT NULL)
);