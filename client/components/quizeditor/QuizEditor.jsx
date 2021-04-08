import React from 'react';
import QuizDisplay from './QuizDisplay.jsx';

const QuizEditor = ({ questions, userId, quizName, handleRenderingQuestions }) => {
  return (
    <div>
      <h2>
        {quizName}
      </h2>
      <QuizDisplay quizQuestions={questions} userId={userId} handleRenderingQuestions={handleRenderingQuestions}/>
    </div>
  )
}

export default QuizEditor;