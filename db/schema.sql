DROP DATABASE IF EXISTS blueocean;

CREATE DATABASE blueocean;

\c blueocean

DROP TABLE users, quizzes, questions, user_friend_relationships, user_completed_quizzes;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  id_auth VARCHAR(100) NOT NULL,
  username VARCHAR(100) UNIQUE,
  password VARCHAR(100) DEFAULT 'seed password',
  email VARCHAR(100) DEFAULT 'seeded@data',
  avatar_url VARCHAR(300) DEFAULT NULL,
  date_created DATE DEFAULT current_date
);


CREATE TABLE quizzes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  difficulty VARCHAR(10) NOT NULL,
  date_created DATE DEFAULT current_date,
  id_users INT REFERENCES users(id)
);


CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  category VARCHAR(50) NOT NULL,
  type VARCHAR(50) NOT NULL,
  difficulty VARCHAR(10) NOT NULL,
  question VARCHAR(300)  NOT NULL,
  correct_answer VARCHAR NOT NULL,
  incorrect_answers TEXT[],
  date_created DATE DEFAULT current_date,
  id_users INT REFERENCES users(id),
  id_quiz INT REFERENCES quizzes(id)
);

CREATE TABLE user_friend_relationships (
  id SERIAL PRIMARY KEY,
  date_created DATE DEFAULT current_date,
  id_user INT REFERENCES users(id),
  id_user_friend INT REFERENCES users(id)
);

CREATE TABLE user_completed_quizzes (
  id SERIAL PRIMARY KEY,
  correct_answer_count INT,
  incorrect_answer_count INT,
  date_created DATE DEFAULT current_date,
  id_quiz INT REFERENCES quizzes(id),
  id_users INT REFERENCES users(id)
);

INSERT INTO users (id_auth, username)
VALUES ('admin', 'admin');