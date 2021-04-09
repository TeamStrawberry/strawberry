import React, { useState, useEffect } from 'react';
import QuizOptions from './QuizOptions.jsx';
import QuizQuestionsAndAnswers from './QuizQuestionsAndAnswers.jsx';
import QuizSubmit from './QuizSubmit.jsx';
import QuizBank from './QuizBank.jsx';
// import CreatedQuizHistory from '../quizeditor/CreatedQuizHistory.jsx';
const { createQuiz, createQuestion, getUserQuizHistory } = require('../../../api_master.js');
import axios from 'axios';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.pallete.text.secondary
  }
}))


// TIER 3 - ALLOW USERS TO SUBMIT PHOTOS AND VIDEOS
// TIER 2 - ENTERED DATA SHOULD PERSIST IF USER LEAVES CREATE QUIZ PAGE
//pass in userid as prop in here
const QuizCreator = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [quizOptionsLoaded, setQuizOptionsLoaded] = useState(false);
  const [quizTrackerCount, setQuizTrackerCount] = useState(0);

  let tempUserId = 1; //this will be removed when the user_id is passed down
  var dailyQuizCount = 0;

  //will trigger when track counter changes
  useEffect(() => {
    getUserQuizHistory(tempUserId)
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
    setQuizOptionsLoaded(true);
  }

  const handleQuestionBankClick = (question) => {
    // take question and prefill form
    console.log(question);
  }

  // rerender page on submit or go to another page
  // form validators only have either 2 or 4 answers no 3
  // Quiz submit becomes clickable 'enabled' once all 3 options are entered
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
      // user id <-- AWAITING
      if (singleQnA.question.length) {
        allQuizQuestions.push(singleQnA);
      }
    }
    let errors = false

    allQuizQuestions.forEach((question) => {
      if (!question.corect_answer) {
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

    createQuiz({name, category, difficulty, id_users: 1})
      .then(res => {
        let quizId = res.data.rows[0].id;
        setQuizTrackerCount(quizTrackerCount + 1)
        return quizId
      })
      .then(quizId => {
        allQuizQuestions.forEach(quizQuestion => {
          quizQuestion.id_quiz = quizId;
          quizQuestion.id_users = 1;
          createQuestion(quizQuestion)
            .then (res => {
              console.log('Quiz question saved!')
            })
            .catch(err => console.error('Error. Cannot create questions', err))
          })
      })
      .catch(err => console.error('Error. Cannot create quiz', err))
  }

  let errorMessage = null;
  let quizCreator = null;

  quizTrackerCount >= 50
    ? errorMessage = <h2 style = {{color: 'red'}}>DAILY LIMIT REACHED. CANNOT CREATE ANYMORE QUIZZES </h2>
    : quizCreator =
      <div className = 'quiz-creator'>
        <QuizOptions
          handleCategoryChange={handleCategoryChange}
          handleDifficultyChange={handleDifficultyChange}
          handleNameChange={handleNameChange}
          category={category}
          difficulty={difficulty}
          name={name}
        />
        {quizOptionsLoaded ?
          <div>
            <QuizSubmit handleSubmit={handleSubmit}/>
              <p>
                Insert Directions Here
              </p>
            <QuizBank
              category = {category}
              handleQuestionBankClick = {handleQuestionBankClick}
            />
            <QuizQuestionsAndAnswers />
          </div> :
          <div>
            Please Select Quiz Options
          </div>
        }
      </div>

  return (
    <div className = 'quiz-creator-container'>
      <h2 className = 'quiz-count'>Total Quizzes Created Today: {quizTrackerCount}</h2>
      {errorMessage}
      {quizCreator}
        {/* <CreatedQuizHistory /> */}
    </div>
  )
}

export default QuizCreator;
