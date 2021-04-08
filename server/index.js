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

/* Dan and Alex's section */

app.get("/getcreatedquizzes/:id", async (req, res) => {
  try {
    const {id} = req.params;

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
    const {id} = req.params;

    const getCreatedQuizQuestions = await pool.query(
      `SELECT * from questions
        WHERE id_quiz = ${id}`
    );
    res.send(getCreatedQuizQuestions);
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
      res.json([reviseQuestion, id, question, correct_answer, incorrect_answers]);
  } catch (err) {
      console.log(err);
  }
});

app.delete('/deletequiz/:id', async (req, res) => {
  try{
      const {id} = req.params;

      const deleteQuestions = await pool.query(
          `DELETE FROM questions WHERE id_quiz = ${id}`
      )

      const deleteQuiz = await pool.query(
          `DELETE FROM quizzes WHERE id = ${id}`
      )
      res.json(deleteQuiz);
  } catch (err) {
      res.status(500).send(err);
  }
});

/* End of Dan and Alex's section */

app.get('/quiz/:id', async (req, res) => {
  try {
    const quizId = req.params.id;
    const retrieveQuiz = await pool.query(
      `SELECT * FROM questions
      WHERE id_quiz = ${quizId}`
    )
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
      `INSERT INTO user_completed_quizzes (correct_answer_count, incorrect_answer_count, id_quiz, id_users)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [
        correct_answer_count,
        incorrect_answer_count,
        id_quiz,
        id_users
      ]
    )
    res.status(201).send(submitQuiz);
  } catch (err) {
    res.status(500).send(err);
  }
})
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

app.get('/categories', async (req, res) => {
  try{
    const getCategories = await pool.query (
      'SELECT category FROM quizzes'
    )
    const categoryMaster = {};
    for (let i = 0; i < getCategories.rows.length; i++) {
      let current = getCategories.rows[i].category;
      if (current.includes(':')) {
        let temp = current.split(':');
        current = temp[0];
      }
      if (categoryMaster[current] === undefined){
        categoryMaster[current] = 1;
      }
    }
    res.send(Object.keys(categoryMaster));
  } catch (err) {
    res.status(500).send(err);
  }
})

app.get('/quizzes/:criteria', async (req, res) => {
  try {
    if (req.params.criteria === 'new') {
      const getNewQuizzes = await pool.query (
        'SELECT * FROM quizzes ORDER BY date_created DESC'
      );
      res.send(getNewQuizzes);
    } else if (req.params.criteria === 'hot') {
      const getHotQuizzes = await pool.query (
        'SELECT q.id, q.name, COUNT(c.id) as taken_count ' +
        'from user_completed_quizzes c ' +
        'join quizzes q on c.id_quiz = q.id ' +
        /* This does Hot n' New, to make it just hot, remove the line below */
        'where c.date_created > CURRENT_DATE - 1 ' +
        'group by q.id order by taken_count desc limit 10'
      );
    } else if (req.params.criteria === 'easy') {
      const getEasyQuizzes = await pool.query (
        "SELECT * FROM quizzes WHERE difficulty = 'easy'"
      );
      res.send(getEasyQuizzes.rows);
    } else if (req.params.criteria === 'medium') {
      const getMediumQuizzes = await pool.query (
        "SELECT * FROM quizzes WHERE difficulty = 'medium'"
      );
      res.send(getMediumQuizzes.rows);
    } else if (req.params.criteria === 'hard') {
      const getHardQuizzes = await pool.query (
        "SELECT * FROM quizzes WHERE difficulty = 'hard'"
      );
      res.send(getHardQuizzes.rows);
    } else {
      const getQuizByCategory = await pool.query (
        `SELECT * FROM quizzes WHERE category LIKE '${req.params.criteria}%'`
      );
      res.send(getQuizByCategory.rows);
    }
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