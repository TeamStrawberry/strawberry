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

app.get("/quizzes", async (req, res) => {
  try {
    const getLastId = await pool.query(
      'SELECT * FROM quizzes ORDER BY id DESC LIMIT 1'
      );
      const finalId = getLastId.rows[0].id;
      let randomQuizList;
      (() => {
        const randomQuizIds = {};
        const max = 10;
        let iterator = 0;
        while (iterator < max) {
          let temp = Math.floor(Math.random() * (finalId + 1));
          if (randomQuizIds[temp] === undefined) {
            randomQuizIds[temp] = 1;
            iterator++;
          }
        }
        randomQuizList = Object.keys(randomQuizIds);
      })();
    const getRandomQuizzes = await pool.query(
      `SELECT * FROM quizzes WHERE id IN (${randomQuizList})`
    )
    res.send(getRandomQuizzes);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/quizzes/:criteria', async (req, res) => {
  try {
    if (req.params.criteria === 'new') {
      const getNewQuizzes = await pool.query (
        'SELECT * FROM quizzes ORDER BY date_created DESC LIMIT 10'
      );
      res.send(getNewQuizzes);
    } else if (req.params.criteria === 'hot') {
      const getHotQuizzes = await pool.query (
        /* FILL_ME_IN */
      );
    } else if (req.params.criteria === 'easy') {
      const getEasyQuizzes = await pool.query (
        "SELECT * FROM quizzes WHERE difficulty = 'easy'"
      );
      res.send(getEasyQuizzes);
    } else if (req.params.criteria === 'medium') {
      const getMediumQuizzes = await pool.query (
        "SELECT * FROM quizzes WHERE difficulty = 'medium'"
      );
      res.send(getMediumQuizzes);
    } else if (req.params.criteria === 'hard') {
      const getHardQuizzes = await pool.query (
        "SELECT * FROM quizzes WHERE difficulty = 'hard'"
      );
      res.send(getHardQuizzes);
    } else {
      const getQuizByCategory = await pool.query (
        `SELECT * FROM quizzes WHERE category = '${req.params.criteria}'`
      );
      res.send(getQuizByCategory);
    } catch (err) {
      res.status(500).send(err);
    }
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

//get all users who are strangers to a user
app.get("/strangers/:userId", async (req, res) => {
  try {
    const getUsers = await pool.query(
      `SELECT u.*
      FROM users u
      LEFT JOIN (SELECT u.id
            FROM user_friend_relationships f
            JOIN users u
            ON f.id_user_friend = u.id
            WHERE f.id_user = ${req.params.userId}) f
      ON u.id = f.id
      WHERE f.id is null
      AND u.id <> ${req.params.userId}
      ORDER BY u.username ASC;`
    );
    res.status(200).send(getUsers);
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
