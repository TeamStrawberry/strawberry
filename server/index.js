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
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`You are listening on port${port}`);
});
