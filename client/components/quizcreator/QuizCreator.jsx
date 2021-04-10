import React, { useState, useEffect } from 'react';
import QuizOptions from './QuizOptions.jsx';
import QuizQuestionsAndAnswers from './QuizQuestionsAndAnswers.jsx';
import QuizSubmit from './QuizSubmit.jsx';
import QuizBank from './QuizBank.jsx';
import axios from 'axios';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../../theme.js';
const { createQuiz, createQuestion, getUserQuizHistory } = require('../../../api_master.js');

const useStyles = makeStyles((theme) => ({
  paper: {
    textAlign: 'center',
    color: theme.palette.text,
    backgroundColor: theme.palette.background.paper,
    border: '3px solid',
    borderColor: theme.palette.text,
    padding: '5px',
    marginBottom: '16px'
  }
}))

//pass in userid as prop in here
const QuizCreator = ({ user }) => {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [quizOptionsLoaded, setQuizOptionsLoaded] = useState(false);
  const [quizTrackerCount, setQuizTrackerCount] = useState(0);
  const [questionGrabbed, setQuestionGrabbed] = useState({});

  let id_users = user.id; //this will be removed when the user_id is passed down
  var dailyQuizCount = 0;

  //will trigger when track counter changes
  useEffect(() => {
    getUserQuizHistory(id_users)
      .then(res => {
        let today = new Date().toISOString().slice(0, 10);
        for (let i  = 0; i < res.data.rows.length; i++) {
          let createdDate = res.data.rows[i]['date_created'].slice(0,10);
          if (createdDate === today) dailyQuizCount++;
        }
        setQuizTrackerCount(dailyQuizCount);
      })
      .catch(err => console.err('Error retrieving quiz count', err))
  }, [quizTrackerCount])

  const handleNameChange = (name) => {
    setName(name);
  }

  const handleCategoryChange = (categoryName) => {
    setCategory(categoryName);
  }

  const handleDifficultyChange = (difficulty) => {
    setDifficulty(difficulty);
  }

  const handleQuestionGrab = (question) => {
    console.log(question);
    setQuestionGrabbed(question);
  }

  const handleSubmit = () => {
    let allQuizQuestions = [];

    for (let i = 1; i < 16; i++) {
      let singleQnA = {};
      let question = document.getElementById(`question-${i}`).value;
      let correctAnswer = document.getElementById(`correct-answer-${i}`).value;
      let incorrectAnswerA = document.getElementById(`incorrect-answer-a-${i}`).value;
      let incorrectAnswerB = document.getElementById(`incorrect-answer-b-${i}`).value;
      let incorrectAnswerC = document.getElementById(`incorrect-answer-c-${i}`).value;

      singleQnA.name = name;
      singleQnA.category = category;
      singleQnA.difficulty = difficulty;
      singleQnA.question = question;
      singleQnA.id_users = id_users;
      singleQnA.correct_answer = correctAnswer;
      singleQnA.incorrect_answers = [incorrectAnswerA, incorrectAnswerB, incorrectAnswerC];
      let filteredAnswers = singleQnA.incorrect_answers.filter((answer) => {
        return answer.length
      })
      if (filteredAnswers.length === 1) {
        if (filteredAnswers[0] === 'True' || filteredAnswers[0] === 'False' || filteredAnswers[0] === 'false' || filteredAnswers[0] === 'true') {
          singleQnA.type = 'boolean';
        }
      } else {
        singleQnA.type = 'multiple';
      }
      singleQnA.incorrect_answers = filteredAnswers;
      if (singleQnA.question.length) {
        allQuizQuestions.push(singleQnA);
      }
    }
    let errors = false

    allQuizQuestions.forEach((question) => {
      if (!question.correct_answer.length) {
        errors = true
      }
      if (question.incorrect_answers.length === 2) {
        errors = true
      }
    })
    if (errors) {
      alert('Please ensure multiple choice questions have four answer choices and that each question has a correct answer.')
      return
    }

    if (allQuizQuestions.length < 3) {
      alert('Please create at least 3 questions.');
      return
    }

    createQuiz({ name, category, difficulty, id_users })
      .then(res => {
        let quizId = res.data.rows[0].id;
        setQuizTrackerCount(quizTrackerCount + 1)
        return quizId
      })
      .then(quizId => {
        allQuizQuestions.forEach(quizQuestion => {
          quizQuestion.id_quiz = quizId;
          //quizQuestion.id_users = 1;
          createQuestion(quizQuestion)
            .then (res => {
              console.log('Quiz question saved!')
            })
            .catch(err => console.error('Error. Cannot create questions', err))
          })
        location.reload();
        alert('Quiz Submitted!');
      })
      .catch(err => console.error('Error. Cannot create quiz', err))
  }

  let errorMessage = null;
  let quizCreator = null;

  quizTrackerCount >= 50
    ? errorMessage = <h2 style = {{color: 'red'}}>DAILY LIMIT REACHED. CANNOT CREATE ANYMORE QUIZZES </h2>
    : quizCreator =
      <div className = 'quiz-creator'>
        <h2>Quiz Creator</h2>
        <h4 className = 'quiz-count'>Total Quizzes Created Today: {quizTrackerCount}</h4>
        <Grid
          container
          spacing={4}
          justify='center'
          alignItems='flex-start'
        >
          <Grid
            item
            xs={4}
          >
            <Paper className={classes.paper} >
              <h3>Select Quiz Options</h3>
              <QuizOptions
                handleCategoryChange={handleCategoryChange}
                handleDifficultyChange={handleDifficultyChange}
                handleNameChange={handleNameChange}
                category={category}
                difficulty={difficulty}
                name={name}
              />
              <QuizSubmit
                handleSubmit={handleSubmit}
                name={name}
                category={category}
                difficulty={difficulty}
              />
            </Paper>
            <Paper
              className={classes.paper}
              style={{ maxHeight: "34.90vh", overflowX: "auto", overflowY: "scroll" }}
            >
              <h4>Questions Bank</h4>
              <QuizBank
                category = {category}
                handleQuestionGrab={handleQuestionGrab}
              />
            </Paper>
          </Grid>
          <Grid
            item
            xs={8}
          >
            <Paper
              className={classes.paper}
              style={{ maxHeight: "70vh", overflowX: "auto", overflowY: "scroll" }}
            >
              <QuizQuestionsAndAnswers />
            </Paper>
          </Grid>
        </Grid>
      </div>

  return (
    <div className = 'quiz-creator-container'>
      {errorMessage}
      {quizCreator}
    </div>
  )
}

export default QuizCreator;
