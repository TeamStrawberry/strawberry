import React from 'react';
import EditQuestionButton from './EditQuestionButton.jsx';

const QuizDisplayer = ({ quizQuestions, userId, handleRenderingQuestions }) => {
  return quizQuestions.map((question) => {
    return (
      <div id={`edit-question-${question.id}`} key={question.id}>
        <h3>
          {`Question: ${question.question}`}
        </h3>
        <h5>
          {`Correct Answer: ${question.correct_answer}`}
          <br></br>
          {`Incorrect Answer: ${question.incorrect_answers[0]}`}
          <br></br>
          {`Incorrect Answer: ${question.incorrect_answers[1]}`}
          <br></br>
          {`Incorrect Answer: ${question.incorrect_answers[2]}`}
          <br></br>
        </h5>
        <EditQuestionButton question={question} userId={userId} handleRenderingQuestions={handleRenderingQuestions} />
      </div>
    )
  });
}

export default QuizDisplayer;