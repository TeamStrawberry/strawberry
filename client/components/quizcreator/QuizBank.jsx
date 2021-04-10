import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
const { getQuestionsByCategory } = require('../../../api_master.js');

const useStyles = makeStyles((theme) => ({
  question: {
    border: '1px solid',
    borderColor: theme.palette.text,
    draggable: 'draggable',
    padding: '2px',
    marginBottom: '2px',
    borderRadius: '10px',
    '&:hover': {
      cursor: 'grab'
    }
  }
}))

/*
set state in quiz creator for current object being dragged
on drag set state
pass down to function that will handle drop and render it to the page
drop and hover functions should be universal so they can be dynamically rendered and

move getQuestionsByCategory out to higher component
*/

const QuizBank = ({ category, handleQuestionGrab }) => {
  const classes = useStyles();

  const [questionBank, setQuestionBank] = useState([])

  getQuestionsByCategory(category)
  .then((res) => {
    let questions = res.data.rows;
    setQuestionBank(questions);
  })
  .catch((err) => {
    console.error('Error: ', err)
  })

  const onDragStart = (e, question) => {
    e.dataTransfer.setData('question', JSON.stringify(question));
    handleQuestionGrab(question);
  }

  return (
    <div id="question-bank">
      {questionBank.length
      ?
        questionBank.map((question) => {
          return (
            <div
              key={question.id}
              onDragStart={(e) => {onDragStart(e, question)}}
              draggable
              className={classes.question}
              onClick={() => {handleQuestionBankClick(question)}}
            >
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
