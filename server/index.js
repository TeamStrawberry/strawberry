const express = require("express");
const path = require("path");
const { pool } = require("../db/pool.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const nodemailer = require("nodemailer");
const { rankingQueryMaker } = require("../helperFunctions.js");

require("dotenv").config();

const port = 3000;
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "../dist")));
app.use(
  express.urlencoded({
    extended: true,
  })
);

/* authentication */
app.get("/login", async (req, res) => {
  try {
    let idRes = await pool.query(
      `select * from users where username='${req.query.username}'`
    );
    let user = idRes.rows[0];
    bcrypt.compare(req.query.password, user.password, (err, result) => {
      if (err) {
        res.sendStatus(500);
      }
      if (result) {
        res.status(200).send({ user: user });
      } else {
        res.sendStatus(500);
      }
    });
  } catch {
    res.sendStatus(500);
  }
});

app.post("/signup", async (req, res) => {
  try {
    let result = await pool.query(
      `select count (*) from users where username='${req.body.username}' or email='${req.body.email}'`
    );
    if (result.rows[0].count === "0") {
      bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
        if (err) {
          res.sendStatus(500);
        }
        await pool.query(
          `insert into users (username, password, email, date_created) values ('${req.body.username}', '${hash}', '${req.body.email}', CURRENT_DATE)`
        );
        let idRes = await pool.query(
          `select * from users where username='${req.body.username}'`
        );
        let user = idRes.rows[0];
        res.send({ user: user });
      });
    } else {
      res.sendStatus(400);
    }
  } catch {
    res.sendStatus(500);
  }
});

/* Dan and Alex's section */

app.get("/getcreatedquizzes/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const getCreatedQuizzes = await pool.query(
      `SELECT * from quizzes
        WHERE id_users = ${id}`
    );
    res.send(getCreatedQuizzes);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/getcreatedquizquestions/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const getCreatedQuizQuestions = await pool.query(
      `SELECT * from questions
        WHERE id_quiz = ${id}`
    );
    res.send(getCreatedQuizQuestions);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/questions/:category", async (req, res) => {
  try {
    const { category } = req.params;

    const getQuestionsByCategory = await pool.query(
      `SELECT * from questions
        WHERE category LIKE '${category}%'`
    );
    res.send(getQuestionsByCategory);
  } catch (err) {
    res.status(500).send(err);
  }
});

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
      `INSERT INTO questions
        (category, type, difficulty, question, correct_answer, incorrect_answers, id_quiz, id_users)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
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
    res.status(500).send(err);
  }
});

app.put("/revisequestion/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      category,
      type,
      difficulty,
      question,
      correct_answer,
      incorrect_answers,
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
    res.json([reviseQuestion, id, question, correct_answer, incorrect_answers]);
  } catch (err) {
    console.log(err);
  }
});

app.delete("/deletequiz/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteQuestions = await pool.query(
      `DELETE FROM questions WHERE id_quiz = ${id}`
    );

    const deleteQuiz = await pool.query(`DELETE FROM quizzes WHERE id = ${id}`);
    res.json(deleteQuiz);
  } catch (err) {
    res.status(500).send(err);
  }
});

/* End of Dan and Alex's section */

app.get("/quiz/:id", async (req, res) => {
  try {
    const quizId = req.params.id;
    const retrieveQuiz = await pool.query(
      `SELECT * FROM questions
      WHERE id_quiz = ${quizId}`
    );
    res.send(retrieveQuiz);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get(`/quiz/history/taken/:userId`, async (req, res) => {
  try {
    const userId = req.params.userId;
    const retrieveQuizHistory = await pool.query(
      `SELECT *
      FROM quizzes
      INNER JOIN user_completed_quizzes
      ON (quizzes.id = user_completed_quizzes.id_quiz
      AND user_completed_quizzes.id_users = ${userId})`
    );
    res.send(retrieveQuizHistory);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get(`/quiz/rankings/global/:quizId`, async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const retrieveQuizGlobalRankings = await pool.query(
      `SELECT * FROM user_completed_quizzes
      WHERE id_quiz = ${quizId}`
    );
    res.send(retrieveQuizGlobalRankings);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get(`/quiz/rankings/friends/:quizId/:userId`, async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const userId = req.params.userId;
    const retrieveQuizFriendRankings = await pool.query(
      `SELECT *
      FROM user_completed_quizzes
      WHERE id_quiz = ${quizId}
      AND id_users
      IN
        (SELECT id_user_friend
        FROM user_friend_relationships
        WHERE id_user = ${userId})`
    );
    res.send(retrieveQuizFriendRankings);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/submitquiz", async (req, res) => {
  try {
    const {
      correct_answer_count,
      incorrect_answer_count,
      id_quiz,
      id_users,
    } = req.body;

    const submitQuiz = await pool.query(
      `INSERT INTO user_completed_quizzes (correct_answer_count, incorrect_answer_count, id_quiz, id_users)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [correct_answer_count, incorrect_answer_count, id_quiz, id_users]
    );
    res.status(201).send(submitQuiz);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/quizzes", async (req, res) => {
  try {
    const getLastId = await pool.query(
      "SELECT quizzes.id FROM quizzes JOIN questions ON quizzes.id = questions.id_quiz GROUP BY quizzes.id"
    );
    const quizIds = getLastId.rows;
    let randomQuizList;
    (() => {
      const randomQuizIds = {};
      let iterator = 0;
      while (iterator < 10) {
        let randomNumber = Math.floor(Math.random() * (quizIds.length + 1));
        let id = quizIds[randomNumber].id;
        if (randomQuizIds[id] === undefined) {
          randomQuizIds[id] = 1;
          iterator++;
        }
      }
      randomQuizList = Object.keys(randomQuizIds);
    })();
    const getRandomQuizzes = await pool.query(
      `SELECT * FROM quizzes WHERE id IN (${randomQuizList})`
    );
    res.send(getRandomQuizzes);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/quizzes/:criteria", async (req, res) => {
  try {
    const categories = [
      "General%20Knowledge",
      "Entertainment",
      "Science",
      "Mythology",
      "Sports",
      "Geography",
      "History",
      "Politics",
      "Art",
      "Celebrities",
      "Animals",
      "Vehicles",
    ];
    const difficulties = ["easy", "medium", "hard"];
    if (req.params.criteria === "new") {
      const getNewQuizzes = await pool.query(
        "SELECT * FROM quizzes ORDER BY date_created DESC LIMIT 10"
      );
      res.send(getNewQuizzes);
    } else if (req.params.criteria === "hot") {
      const getHotQuizzes = await pool.query(
        `SELECT q.id, q.name, q.difficulty, q.category, COUNT(c.id) AS taken_count
        FROM user_completed_quizzes c
        JOIN quizzes q ON c.id_quiz = q.id
        GROUP BY q.id ORDER BY taken_count desc
        LIMIT 10`
      );
      res.send(getHotQuizzes.rows);
    } else if (difficulties.indexOf(req.params.criteria) > 0) {
      const getEasyQuizzes = await pool.query(
        `SELECT * FROM quizzes WHERE difficulty = '${req.params.criteria}'`
      );
      res.send(getEasyQuizzes.rows);
    } else if (categories.indexOf(req.params.criteria) > 0) {
      if (req.params.criteria === "General%20Knowledge") {
        req.params.criteria = "General Knowledge";
      }
      const getQuizzesByCategory = await pool.query(
        `SELECT * FROM quizzes WHERE category LIKE '${req.params.criteria}%'`
      );
      res.send(getQuizzesByCategory.rows);
    } else {
      const getQuizzesByName = await pool.query(
        `SELECT * FROM quizzes WHERE lower(name) LIKE '%${req.params.criteria}%'`
      );
      res.send(getQuizzesByName.rows);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/categories", async (req, res) => {
  try {
    const getCategories = await pool.query("SELECT category FROM quizzes");
    const categoryMaster = {};
    for (let i = 0; i < getCategories.rows.length; i++) {
      let current = getCategories.rows[i].category;
      if (current.includes(":")) {
        let temp = current.split(":");
        current = temp[0];
      }
      if (categoryMaster[current] === undefined) {
        categoryMaster[current] = 1;
      }
    }
    res.send(Object.keys(categoryMaster));
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

//deletes friendship
app.delete("/friends/:userId/:friendId", async (req, res) => {
  try {
    const deleteFriend = await pool.query(
      `DELETE FROM user_friend_relationships
          WHERE (id_user = ${req.params.userId} AND id_user_friend = ${req.params.friendId})
          OR (id_user = ${req.params.friendId} AND id_user_friend = ${req.params.userId})`
    );
    res.json(deleteFriend);
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
      WHERE f.id_user = ${req.params.userId}
      ORDER BY u.username ASC;`
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

//get users overall ranking
app.get("/users/ranking/:userId", async (req, res) => {
  let promises = [];
  let results = {};
  let userId = req.params.userId;

  try {
    promises.push(
      pool
        .query(rankingQueryMaker(userId, "friends", "percent_rank"))
        .then((rankings) => {
          results.friendPercentile = rankings.rows[0].rank;
        })
    );

    promises.push(
      pool
        .query(rankingQueryMaker(userId, "friends", "rank"))
        .then((rankings) => {
          results.friendRank = rankings.rows[0].rank;
        })
    );

    promises.push(
      pool
        .query(rankingQueryMaker(userId, "global", "percent_rank"))
        .then((rankings) => {
          results.globalPercentile = rankings.rows[0].rank;
        })
    );

    promises.push(
      pool
        .query(rankingQueryMaker(userId, "global", "rank"))
        .then((rankings) => {
          results.globalRank = rankings.rows[0].rank;
        })
    );

    Promise.all(promises).then(() => res.send(results));
  } catch (err) {
    res.status(500).send(err);
  }
});

//get users stats and avg stats
app.get("/users/stats/:userId", async (req, res) => {
  let promises = [];
  let results = {};
  let userId = req.params.userId;

  try {
    promises.push(
      pool
        .query(
          `select count(distinct id_quiz) as completed_quizzes,
                sum(correct_answer_count) as correct_answers,
                1.*sum(correct_answer_count)/(sum(correct_answer_count) + sum(incorrect_answer_count)) as avg_score
                from user_completed_quizzes
                where id_users = ${userId};`
        )
        .then((stats) => {
          results.completedQuizzes = stats.rows[0].completed_quizzes;
          results.correctAnswers = stats.rows[0].correct_answers;
          results.userAvgScore = stats.rows[0].avg_score;
        })
    );

    promises.push(
      pool
        .query(
          `select avg(completed_quizzes) as avg_quizzes_complete,
                avg(correct_answers) as avg_correct_answers,
                avg(avg_score) as avg_avg_score
                from (select id_users,
                      count(distinct id_quiz) as completed_quizzes,
                      sum(correct_answer_count) as correct_answers,
                      1.*sum(correct_answer_count)/(sum(correct_answer_count) + sum(incorrect_answer_count)) as avg_score
                      from user_completed_quizzes group by 1) user_stats;`
        )
        .then((stats) => {
          results.globalAvgQuizzesComp = stats.rows[0].avg_quizzes_complete;
          results.globalAvgCorrectAnswers = stats.rows[0].avg_correct_answers;
          results.globalAvgScore = stats.rows[0].avg_avg_score;
        })
    );

    Promise.all(promises).then(() => res.send(results));
  } catch (err) {
    res.status(500).send(err);
  }
});

// CHALLENGE FRIEND
app.get("/email/:friend/:user/:friendEmail/:message", (req, res) => {
  let friend = req.params.friend;
  let user = req.params.user;
  let friendEmail = req.params.friendEmail;
  let message = req.params.message;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.MAIL_USER,
    to: `${friendEmail}`,
    subject: `YOU RECEIVED A QUIZ CHALLENGE FROM ${user}!!!`,
    text: `${message}`,
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log("ERROR MAILING: ", err);
    } else {
      console.log("EMAIL SENT");
    }
  });
});

app.listen(port, () => {
  console.log(`You are listening on port${port}`);
});
