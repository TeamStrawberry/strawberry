DROP DATABASE IF EXISTS blueocean;

CREATE DATABASE blueocean;

\c blueocean

CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY,username VARCHAR(100) NOT NULL,password VARCHAR(100) NOT NULL,email VARCHAR(100) NOT NULL, avatar_url VARCHAR(300) DEFAULT NULL, date_created DATE DEFAULT current_date);

CREATE TABLE IF NOT EXISTS quizzes (id SERIAL PRIMARY KEY,name VARCHAR(100) DEFAULT NULL,category VARCHAR(50) NOT NULL,difficulty VARCHAR(10) NOT NULL,data_created DATE DEFAULT current_date, id_users INTEGER REFERENCES users (id));

  -- id_user INT REFERENCES user(id),

CREATE TABLE IF NOT EXISTS questions (id SERIAL PRIMARY KEY,category VARCHAR(50) NOT NULL,type VARCHAR(50) NOT NULL,difficulty VARCHAR(10) NOT NULL,question VARCHAR(300) NOT NULL,correct_answer VARCHAR NOT NULL, incorrect_answers TEXT[],date_created DATE DEFAULT current_date, id_quiz INTEGER REFERENCES quizzes (id), id_users INTEGER REFERENCES users (id));



  -- id_users INT REFERENCES users(id),
  -- id_quiz INT REFERENCES quizzes(id)