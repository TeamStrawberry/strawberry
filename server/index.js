const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const pool = require('../db/index.js');
const { auth } = require ('express-openid-connect');
const cors = require('cors');

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'y5HRjJ1aopIwKqCkzavjaaaJcPUIFpdg2Pc4Ta-elzesr9wtEPE91dnw5TPLXMmR',
    baseURL: 'http://localhost:3000',
    clientID: 'bw7dtMUqUfut6NiwI0mcPSvEyVPSLYD5',
    issuerBaseURL: 'https://dev-hx7wm5ff.us.auth0.com'
  };

const port = 3000;
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "../dist")));
app.use(bodyparser.json());
app.use(
    bodyparser.urlencoded({
        extended:true,
    })
);
//Allow cross headers so redirect to auth0 will not be blocked
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    return next();
  });

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

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
        res.status(500).send(err)
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
            incorrect_answers,
            id_quiz,
            id_users
        } = req.body;

        const createQuestion = await pool.query(
            "INSERT INTO questions (category, type, difficulty, question, correct_answer, incorrect_answers, id_quiz, id_users) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", [category, type, difficulty, question, correct_answer, incorrect_answers, id_quiz, id_users]
        )
        res.status(201).json(createQuestion)
    } catch (err) {
       res.status(500).send(err)
    }
})

app.listen(port, () => {
    console.log(`You are listening on port${port}`)
});