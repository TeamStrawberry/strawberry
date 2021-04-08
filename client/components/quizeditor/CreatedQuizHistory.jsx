import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import axios from 'axios';
import QuizHistoryDisplay from './QuizHistoryDisplay.jsx';
import QuizEditor from './QuizEditor.jsx';
const { getUserQuizHistory, getCreatedQuizQuestions } = require('../../../api_master.js');

const CreatedQuizHistory = ({ userId }) => {
  const [quizHistory, setQuizHistory] = useState([]);
  const [quizName, setQuizName] = useState('')
  const [questionsToEdit, setQuestionsToEdit] = useState([]);
  const [questionsLoaded, setQuestionsLoaded] = useState(false);
  // FIX THIS WHEN ID GETS PASSED DOWN
  let tempId = 1;

  const getQuizHistory = () => {
    getUserQuizHistory(tempId)
    .then((res) => {
      let quizzes = res.data.rows;
      setQuizHistory(quizzes);
    })
    .catch((err) => {
      console.log(err)
    });
  }
  getQuizHistory();

  const handleEditQuizClick = (quizId, quizName) => {
    getCreatedQuizQuestions(quizId)
    .then((res) => {
      let quizQuestions = res.data.rows;
      setQuizName(quizName);
      setQuestionsToEdit(quizQuestions);
      setQuestionsLoaded(true);
    })
    .catch((err) => {
      console.log(err)
    });
  }

  const handleRenderingQuestions = (updateResponse) => {
      let updatedQuestion = {
        id: parseInt(updateResponse[1]),
        question: updateResponse[2],
        correct_answer: updateResponse[3],
        incorrect_answers: updateResponse[4],
      }
      let copy = questionsToEdit.slice();
      for (let i = 0; i < copy.length; i++) {
        if (copy[i].id === updatedQuestion.id) {
          copy[i] = updatedQuestion;
          break;
        }
      }
      setQuestionsToEdit(copy);
  };

  return (
    <div>
      Created Quiz History Display
      <ul>
      <QuizHistoryDisplay quizzes={quizHistory} getQuiz={handleEditQuizClick}/>
      </ul>
      {questionsLoaded
      ? <QuizEditor questions={questionsToEdit} quizName={quizName} handleRenderingQuestions={handleRenderingQuestions}/>
      : <></>
      }
    </div>
  )
}

export default CreatedQuizHistory;