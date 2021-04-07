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
      `INSERT INTO quizzes
        (name, category, difficulty, id_users)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
      [name, category, difficulty, id_users]
    );
    res.status(201).send(createQuiz);
  } catch (err) {
   console.log(err);
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
      `INSERT INTO questions
        (category, type, difficulty, question, correct_answer, incorrect_answers, id_quiz, id_users) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *`,
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
    console.log(err);
  }
});

app.put('/revisequiz/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const {
            name,
            category,
            difficulty
        } = req.body;

        const reviseQuiz = await pool.query(
            `UPDATE quizzes
                SET
                    name = $1,
                    category = $2,
                    difficulty = $3
                WHERE ID = ${id}`,
            [name, category, difficulty]
        );
        res.status(200).json(reviseQuiz);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.put('/revisequestion/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const {
            category,
            type,
            difficulty,
            question,
            correct_answer,
            incorrect_answers
        } = req.body;

        const reviseQuestion = await pool.query(
            `UPDATE questions
                SET
                    category = $1,
                    type = $2,
                    difficulty = $3,
                    question = $4,
                    correct_answer = $5,
                    incorrect_answers = $6
                WHERE ID = ${id}`,
            [category, type, difficulty, question, correct_answer, incorrect_answers]
        );
        res.status(200).json(reviseQuestion);
    } catch (err) {
        console.log(err);
    }
});

app.delete('/delete/:id', async (req, res) => {
    try{
        const {id} = req.params;

        const deleteQuestions = await pool.query(
            `DELETE FROM questions WHERE id_quiz = ${id}`
        )

        const deleteQuiz = await pool.query(
            `DELETE FROM quizzes WHERE id = ${id}`
        )
        res.status(200).json(deleteQuiz);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(port, () => {
  console.log(`You are listening on port${port}`);
});
