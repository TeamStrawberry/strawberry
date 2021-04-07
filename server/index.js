// Does this fix your formatting?
const express = require("express");
const path = require("path");
const { pool } = require("../db/pool.js");

const port = 3000;
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "../dist")));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.post("/createquiz", async (req, res) => {
  try {
    const { name, category, difficulty, id_users } = req.body;

    const createQuiz = await pool.query(
      "INSERT INTO quizzes (name, category, difficulty, id_users) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, category, difficulty, id_users]
    );
    res.status(201).send(createQuiz);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/createquestion", async (req, res) => {
  try {
    const {
      category,
      type,
      difficulty,
      question,
      correct_answer,
      incorrect_answers,
      id_quiz,
      id_users,
    } = req.body;

    const createQuestion = await pool.query(
      "INSERT INTO questions (category, type, difficulty, question, correct_answer, incorrect_answers, id_quiz, id_users) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        category,
        type,
        difficulty,
        question,
        correct_answer,
        incorrect_answers,
        id_quiz,
        id_users,
      ]
    );
    res.status(201).json(createQuestion);
  } catch (err) {
    res.status(500).send(err);
  }
});

//creates both sides of a friend relationship
app.post("/friends/:userId/:friendId", async (req, res) => {
  try {
    const addFriend = await pool.query(
      `INSERT INTO user_friend_relationships (id_user, id_user_friend, date_created)
      VALUES ($1, $2, to_timestamp(${Date.now()} / 1000.0)), ($2, $1, to_timestamp(${Date.now()} / 1000.0))
        RETURNING *`,
      [req.params.userId, req.params.friendId]
    );
    res.status(201).send(addFriend);
  } catch (err) {
    res.status(500).send(err);
  }
});

//gets a list of friends for a user
app.get("/friends/:userId", async (req, res) => {
  try {
    const getFriends = await pool.query(
      `SELECT u.*
      FROM user_friend_relationships f
      JOIN users u
      ON f.id_user_friend = u.id
      WHERE f.id_user = ${req.params.userId};`
    );
    res.status(200).send(getFriends);
  } catch (err) {
    res.status(500).send(err);
  }
});

//get all users
app.get("/users", async (req, res) => {
  try {
    const getUsers = await pool.query(
      `SELECT *
      FROM users
      ORDER BY username ASC;`
    );
    res.status(200).send(getUsers);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`You are listening on port${port}`);
});
