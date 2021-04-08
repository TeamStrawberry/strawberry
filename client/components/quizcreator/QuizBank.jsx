import React, {useState} from 'react';
const { getQuestionsByCategory } = require('../../../api_master.js');

const QuizBank = ({ category }) => {
  // get quiz questions by category input
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
    <div>
      {questionBank.length
      ?
        questionBank.map((question) => {
          return (
            <div key={question.id}>
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