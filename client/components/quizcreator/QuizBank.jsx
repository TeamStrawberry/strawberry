import React, {useState} from 'react';
const { getQuestionsByCategory } = require('../../../api_master.js');

const QuizBank = ({ category, handleQuestionBankClick }) => {
  const [questionBank, setQuestionBank] = useState([])

  getQuestionsByCategory(category)
  .then((res) => {
    let questions = res.data.rows;
    setQuestionBank(questions);
  })
  .catch((err) => {
    console.error('Error: ', err)
  })

  return (
    <div id="question-bank">
      {questionBank.length
      ?
        questionBank.map((question) => {
          return (
            <div key={question.id} onClick={() => {handleQuestionBankClick(question)}}>
              {question.question}
            </div>
          )
        })
      :
        null
      }
    </div>
  )
}

export default QuizBank;