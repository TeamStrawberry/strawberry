import React, { useState } from 'react';
import QuizOptions from './QuizOptions.jsx';
import QuizQuestionsAndAnswers from './QuizQuestionsAndAnswers.jsx';
import QuizSubmit from './QuizSubmit.jsx';
import QuizBank from './QuizBank.jsx';
import QuizzesPerDayTracker from './QuizzesPerDayTracker.jsx';
import CreatedQuizHistory from '../quizeditor/CreatedQuizHistory.jsx';
const { createQuiz, createQuestion } = require('../../../api_master.js');
import axios from 'axios';


// TIER 3 - ALLOW USERS TO SUBMIT PHOTOS AND VIDEOS
// TIER 2 - ENTERED DATA SHOULD PERSIST IF USER LEAVES CREATE QUIZ PAGE
//pass in userid as prop in here
const QuizCreator = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [quizOptionsLoaded, setQuizOptionsLoaded] = useState(false);

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
      singleQnA.incorrect_answers = filteredAnswers;

      if (filteredAnswers.length === 1) {
        singleQnA.type = 'boolean';
      } else {
        singleQnA.type = 'multiple';
      }
      // user id <-- AWAITING
      if (singleQnA.question.length) {
        allQuizQuestions.push(singleQnA);
      }
    }
    if (allQuizQuestions.length < 3) alert('Please create at least 3 questions.');

    createQuiz({name, category, difficulty, id_users: 1})
      .then(res => {
        let quizId = res.data.rows[0].id;
        console.log(res.data)
        return quizId
      })
      .then(quizId => {
        allQuizQuestions.forEach(quizQuestion => {
          quizQuestion.id_quiz = quizId;
          quizQuestion.id_users = 1;
          createQuestion(quizQuestion)
            .then (res => console.log('Quiz question saved!'))
            .catch(err => console.error('Error', err))
          })
      })
      .catch(err => console.log(err))
  }

  return (
    <div>
      <QuizOptions handleCategoryChange={handleCategoryChange} handleDifficultyChange={handleDifficultyChange} handleNameChange={handleNameChange} category={category} difficulty={difficulty} name={name}/>
      <QuizzesPerDayTracker />
      {quizOptionsLoaded ?
        <div>
          <QuizSubmit handleSubmit={handleSubmit}/>
            <p>
              Insert Directions Here
            </p>
          <QuizBank />
          <QuizQuestionsAndAnswers />
        </div> :
        <div>
          Please Select Quiz Options
        </div>
      }
      <CreatedQuizHistory />
    </div>
  )
}

export default QuizCreator;
