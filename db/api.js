/* eslint-disable no-console */
const axios = require('axios').default;
const { pool } = require('./config.js');
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');

let randomUserId = 1;
let quizId = 0;
let quizCount = 0

function getQuizData() {
  axios.all([
    axios.get('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy'),
  ])
  .then(res => {
    res[0].data.results.forEach(q => {
      let difficulty = q.difficulty;
      const shortName = uniqueNamesGenerator({
        dictionaries: [adjectives, animals, colors],
        length: 2
      });

      if (quizId === 0) {
        quizId++
        insertQuiz(q.category, randomUserId, shortName, difficulty);
      }

      if (quizCount === 15) {
        quizId++;
        quizCount = 0;
        insertQuiz(q.category, randomUserId, shortName, difficulty);
      }

      insertQuestion(q, randomUserId, quizId);
      quizCount++
    })
  })
  .catch(err => {
    console.log('ERR: ', err);
  })
}

function insertQuestion(qu, userId, quizId) {

  pool.connect((err, client, done) => {
    if (err) return console.error('connection error: ', err);

    client.query("INSERT INTO questions (category, type, difficulty, question, correct_answer, incorrect_answers, id_users, id_quiz) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", [qu.category, qu.type, qu.difficulty, qu.question, qu.correct_answer, [qu.incorrect_answers.toString()], userId, quizId], (err, res) => {
      done();
      if (err) return console.error('error running question query: ', err);
      console.log(res.rows[0]);
    });
  });
}

function insertQuiz(category, userId, randomName, difficulty) {
  pool.connect((err, client, done) => {
    if (err) return console.error('connection error: ', err);

    client.query("INSERT INTO quizzes (name, category, difficulty, id_users) VALUES ($1, $2, $3, $4) RETURNING *", [`${category} ${randomName}`, category, difficulty, userId], (err, res) => {
      done();
      if (err) return console.error('error running quiz query: ', err);
      console.log(res.rows[0]);
    });
  });
}

getQuizData();

