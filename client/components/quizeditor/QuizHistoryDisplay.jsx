import React from 'react';
import { Button } from '@material-ui/core';
import DeleteButton from './DeleteButton.jsx';

const QuizHistoryDisplay = ({ quizzes, getQuiz}) => {

  return quizzes.map((quiz) => {
    return (
        <li key={quiz.id}>
          <h3>
          {quiz.name}
          </h3>
          <Button onClick={()=>{getQuiz(quiz.id, quiz.name)}}>Start Edits</Button>
          <DeleteButton quizId={quiz.id}/>
        </li>
    )
  })
}

export default QuizHistoryDisplay;