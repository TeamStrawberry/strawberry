/* eslint-disable no-console */
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})

pool.connect();


const createQuiz = (data, callback) => {

  const sqlQuery =
  `INSERT INTO quizzes
    (name, category, difficulty, id_users)
    VALUES (?, ?, ?, ?)`

  pool.query(sqlQuery, [data.users_id], (err, quiz) => {
    if (err) callback(err, null)
    else callback(null, quiz)
    }
  )
}

const createQuestion = (data, callback) => {

  const sqlQuery =
    `INSERT INTO questions
      (category, type, difficulty, question, correct_answer, incorrect_answers, data_created, id_users, id_quiz) VALUES (?, ?, ?, ?, ?, {incorrect_answers, incorrect_answers, incorrect_answers}), id_users, id_quiz)`

  pool.query(sqlQuery, [data.users_id, data.quiz_id], (err, question) => {
    if (err) callback(err, null)
    else callback(null, question)
    }
  )
}

module.exports = {
  createQuiz,
  createQuestion
}