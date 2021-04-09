import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import axios from 'axios';
import QuizHistoryDisplay from './QuizHistoryDisplay.jsx';
import QuizEditor from './QuizEditor.jsx';
const { getUserQuizHistory, getCreatedQuizQuestions } = require('../../../api_master.js');
import '../../../dist/stylesheet.css'

const CreatedQuizHistory = ({ userId }) => {
  const [quizHistory, setQuizHistory] = useState([]);
  const [quizName, setQuizName] = useState('')
  const [questionsToEdit, setQuestionsToEdit] = useState([]);
  const [questionsLoaded, setQuestionsLoaded] = useState(false);
  const [className, setClassName] = useState('created-quiz-list');
  const [editorClassName, setEditorClassName] = useState('questions-container hide');
  // FIX THIS WHEN ID GETS PASSED DOWN
  let tempId = 1;

  const getQuizHistory = () => {
    getUserQuizHistory(tempId)
    .then((res) => {
      let quizzes = res.data.rows;
      setQuizHistory(quizzes);
    })
    .catch((err) => {
      console.error('Error', err)
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
      setClassName('created-quiz-list hide')
      setEditorClassName('questions-container')

      window.scrollTo(0,0)
    })
    .catch((err) => {
      console.error('Error', err)
    });
  }

  const handleRenderingQuestions = (updateResponse) => {
      let updatedQuestion = {
        id: parseInt(updateResponse[1]),
        question: updateResponse[2],
        correct_answer: updateResponse[3],
        incorrect_answers: updateResponse[4],
      }
      let questionsCopy = questionsToEdit.slice();
      for (let i = 0; i < questionsCopy.length; i++) {
        if (questionsCopy[i].id === updatedQuestion.id) {
          questionsCopy[i] = updatedQuestion;
          break;
        }
      }
      setQuestionsToEdit(questionsCopy);
  };

  const returnQuizList = (classText) => {
    setClassName(classText)
    setEditorClassName('questions-container hide')
  }

  return (
    <div className = 'created-quiz-history-container'>
      <ul
        className = {className}
        style = {{
          listStyle: 'none'
        }}
      >
        <QuizHistoryDisplay quizzes={quizHistory} getQuiz={handleEditQuizClick}/>
      </ul>
      {questionsLoaded
        ? <QuizEditor questions={questionsToEdit} quizName={quizName} handleRenderingQuestions={handleRenderingQuestions} returnQuizList = {returnQuizList} editorClassName = {editorClassName}/>
        : null
      }
    </div>
  )
}

export default CreatedQuizHistory;