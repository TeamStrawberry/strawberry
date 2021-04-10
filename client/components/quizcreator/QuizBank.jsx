import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
const { getQuestionsByCategory } = require('../../../api_master.js');
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';

const useStyles = makeStyles((theme) => ({
  question: {
    border: '1px dashed',
    borderColor: theme.palette.text,
    draggable: 'draggable',
    padding: '2px',
    marginBottom: '2px',
    borderRadius: '10px',
    '&:hover': {
      cursor: 'grab'
    }
  },
  icon: {
    fontSize: 'small',
    color: theme.palette.text,
    transform: 'rotate(45deg)'
  }
}))

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
              <br></br>
              <ZoomOutMapIcon className={classes.icon}/>
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
