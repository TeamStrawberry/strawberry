/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const pool = require('../db/index.js')

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../dist')))
app.use(bodyparser.json())
app.use(
    bodyparser.urlencoded({
        extended:true,
    })
)

// app.get('/createquiz', async (req, res) => {
//     console.log('testing query')
//     try {
//     const test = await pool.query(
//         "SELECT * from quizzes"
//         )

//         // const createQuiz = await pool.query(
//         //     "INSERT INTO quizzes (name, category, difficulty, id_users VALUES ($1, $2, $3, $4) RETURNING *", [name, category, difficulty, id_users]
//         // )
//         res.json(test);

//     } catch(err) {
//         res.status(500).send(err);
//     }
// });

app.post('/createquiz', async (req, res) => {
    try {
        const {
            name,
            category,
            difficulty,
            id_users
        } = req.body;

        const createQuiz = await pool.query(
            "INSERT INTO quizzes (name, category, difficulty, id_users) VALUES ($1, $2, $3, $4) RETURNING *", [name, category, difficulty, id_users]
        )
        res.status(201).send(createQuiz);

    } catch(err) {
        console.log(err);
    }
});

app.post('/createquestion', async (req, res) => {
    try {
        const {
            category,
            type,
            difficulty,
            question,
            correct_answer,
            incorrect_answers
            // id_quiz,
            // id_users
         } = req.body;

        /*incorrect_answers is an array datafield, how can i input data in there? */
        const createQuestion = await pool.query(
            "INSERT INTO questions (category, type, difficulty, question, correct_answer, incorrect_answers) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [category, type, difficulty, question, correct_answer, incorrect_answers]
        )
        res.status(201).json(createQuestion)
    } catch (err) {
        res.status(500).send(err);
    }
})

app.listen(port, () => {
    console.log(`You are listening on port${port}`)
});