import React from 'react';
import Button from '@material-ui/core/Button';
import QuizDisplay from './QuizDisplay.jsx';

const QuizEditor = ({ questions, userId, quizName, handleRenderingQuestions, returnQuizList, editorClassName }) => {

  const hideQuestionsEditor = () => {
    returnQuizList('created-quiz-list')
  }

  return (
    <div className = {editorClassName}>
      <Button
        variant = 'contained'
        color = 'secondary'
        onClick = {() => hideQuestionsEditor()}
      >
        Go back
      </Button>
      <h2 className = 'quiz-question'>
        {quizName}
      </h2>
      <QuizDisplay quizQuestions={questions} userId={userId} handleRenderingQuestions={handleRenderingQuestions}/>
    </div>
  )
}

export default QuizEditor;