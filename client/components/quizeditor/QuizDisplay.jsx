import React from 'react';
import EditQuestionButton from './EditQuestionButton.jsx';

const QuizDisplayer = ({ userId, quizName, quizQuestions }) => {
    // render quiz questions with edit button on each quiz question
    // button should display modal of questiona and answer options that are editable

  let tester = [{question: 'How many planets are there in our solar system?', correct_answer: '8', incorrect_answers: ['10', '9', '7']}];

  return tester.map((question) => {
    return (
      <div id="editor-question">
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
        <EditQuestionButton question={question} userId={userId} quizName={quizName}/>
      </div>
    )
  });
}

export default QuizDisplayer;