const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})

const createQuiz = (data, callback) => {
  pool.query('INSERT INTO quizzes (name, category, difficulty, data_created, id_users) VALUES ($1, $2, $3, $4, $5)', data, (err, quiz) => {
    if (err) callback(err, null)
    else callback(null, quiz)
    }
  )
}

const createQuestion = (data, callback) => {
  pool.query('INSERT INTO questions (category, type, difficulty, question, correct_answer, incorrect_answers, data_created, id_users, id_quiz) VALUES ($1, $2, $3, $4, $5)', data, (err, question) => {
    if (err) callback(err, null)
    else callback(null, question)
    }
  )
}

module.exports = {
  createQuiz,
  createQuestion
}