import React from 'react';
import QuestionGenerator from './QuestionGenerator.jsx';

const QuizQuestionsAndAnswers = () => {
  let questionNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  return questionNumber.map((number) => {
    return (
      <div key={number}>
        <QuestionGenerator number={number}/>
      </div>
    )
  });
}

export default QuizQuestionsAndAnswers;