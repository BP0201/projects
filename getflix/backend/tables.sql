CREATE TABLE users (
  username TEXT PRIMARY KEY,
  password TEXT NOT NULL,
  -- first_name TEXT NOT NULL,
  -- last_name TEXT NOT NULL,
  -- email TEXT NOT NULL
  --   CHECK (position('@' IN email) > 1),
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE user_favorites (
  fav_id SERIAL PRIMARY KEY,
  user_id TEXT REFERENCES users (username),
  id INT NOT NULL,
  id_type TEXT NOT NULL
)