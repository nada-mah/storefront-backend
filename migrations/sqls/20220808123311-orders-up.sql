CREATE TABLE orders (
   id SERIAL primary key,
   user_id INTEGER REFERENCES users(id) NOT NULL,
   completed BOOLEAN Not NULL DEFAULT false
);