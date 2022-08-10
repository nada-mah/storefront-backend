CREATE TABLE users (
   id serial primary key,
   firstname varchar ,
   lastname varchar ,
   email VARCHAR Not NULL UNIQUE,
   password VARCHAR(255) NOT NULL
);