import React from 'react';
import { Button } from '@material-ui/core';
import DeleteButton from './DeleteButton.jsx';

const QuizHistoryDisplay = ({ quizzes, getQuiz}) => {

  return quizzes.map((quiz) => {
    return (
        <li key={quiz.id}>
          <h3 className = 'quiz-name'>{quiz.name}</h3>
          <h3 className = 'quiz-category'>{quiz.category}</h3>
          <h3 className = 'quiz-date-created'>{quiz.date_created.slice(0,10)}</h3>
          <Button variant = 'contained' color = 'primary' onClick={()=>{getQuiz(quiz.id, quiz.name)}}>Start Edits</Button>
          <DeleteButton quizId={quiz.id}/>
        </li>
    )
  })
}

export default QuizHistoryDisplay;

// (
//   <li key={quiz.id}>
//     <h3 className = 'quiz-name'>{quiz.name}</h3>
//     <h3 className = 'quiz-category'>{quiz.category}</h3>
//     <h3 className = 'quiz-date-created'>{quiz.date_created.slice(0,10)}</h3>
//     <Button variant = 'contained' color = 'primary' onClick={()=>{getQuiz(quiz.id, quiz.name)}}>Start Edits</Button>
//     <DeleteButton quizId={quiz.id}/>
//   </li>
// )