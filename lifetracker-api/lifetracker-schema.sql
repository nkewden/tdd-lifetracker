CREATE TABLE users (
id          SERIAL PRIMARY KEY,
username    TEXT NOT NULL,
password    TEXT NOT NULL,
first_name  TEXT NOT NULL,
last_name   TEXT NOT NULL,
email       TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN EMAIL) > 1),
created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
updated_at  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE nutrition (
id          SERIAL PRIMARY KEY,
name        TEXT NOT NULL,
category    TEXT NOT NULL,
quantity    INTEGER NOT NULL DEFAULT 1,
calories    INTEGER NOT NULL,
image_url   TEXT NOT NULL,
user_id     INTEGER,
created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
FOREIGN KEY (user_id) REFERENCES users(id)
);
