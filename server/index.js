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

app.get('/quiz/:id', async (req, res) => {
  try {
    const quizId = req.params.id;
    const retrieveQuiz = await pool.query(
      `SELECT * FROM questions WHERE questions.id_quiz = ${quizId}`
    )
    console.log()
    res.status(200).send(retrieveQuiz);
  } catch (err) {
    res.status(500).send(err);
  }
})

app.post('/submitquiz', async (req, res) => {
  try {
    const {
      correct_answer_count,
      incorrect_answer_count,
      id_quiz,
      id_users
    } = req.body;

    const submitQuiz = await pool.query(
      "INSERT INTO user_completed_quizzes (correct_answer_count, incorrect_answer_count, id_quiz, id_users) VALUES ($1, $2, $3, $4) RETURNING *", [correct_answer_count, incorrect_answer_count, id_quiz, id_users]
    )
    res.status(201).send(submitQuiz);
  } catch (err) {
    res.status(500).send(err);
  }
})

app.listen(port, () => {
  console.log(`You are listening on port${port}`);
});
