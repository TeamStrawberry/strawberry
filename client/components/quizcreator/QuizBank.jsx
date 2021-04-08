import React from 'react';
const { getQuestionsByCategory } = require('../../../api_master.js');

const QuizBank = ({ category }) => {
  // get quiz questions by category input
  getQuestionsByCategory(category)
  .then((res) => {
    let questions = res.data.rows;
    console.log(questions);
  })
  .catch((err) => {
    console.error('Error: ', err)
  })

  return (
    <div>
      <h3>
        Question Bank in Development...
      </h3>
    </div>
  )
}

export default QuizBank;