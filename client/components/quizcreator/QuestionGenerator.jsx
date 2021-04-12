import React, { useState } from 'react';
import { FormGroup, Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  questionGroup: {
    padding: '5px',
    border: '2px solid',
    borderColor: theme.palette.secondary.main,
    marginBottom: '10px'
  },
  singleForm: {
    padding: '3px',
  }
}))

const QuestionGenerator = ({ number }) => {
  const classes = useStyles();

  const [question, setQuestion] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [incorrect1, setIncorrect1] = useState(null);
  const [incorrect2, setIncorrect2] = useState(null);
  const [incorrect3, setIncorrect3] = useState(null);

  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e, question) => {
    let questionDragged = JSON.parse(e.dataTransfer.getData('question'));
    setQuestion(questionDragged.question);
    setCorrectAnswer(questionDragged.correct_answer);
    setIncorrect1(questionDragged.incorrect_answers[0]);
    setIncorrect2(questionDragged.incorrect_answers[1]);
    setIncorrect3(questionDragged.incorrect_answers[2]);
  }

  const handleQChange = (e) => setQuestion(e.target.value);
  const handleCAChange = (e) => setCorrectAnswer(e.target.value);
  const handleI1Change = (e) => setIncorrect1(e.target.value);
  const handleI2Change = (e) => setIncorrect2(e.target.value);
  const handleI3Change = (e) => setIncorrect3(e.target.value);


  return (
    <div>
      <FormGroup
        id={`QuestionAndAnswer${number}`}
        className={classes.questionGroup}
        onDragOver={(e) => handleDragOver(e)}
        onDrop={(e) => handleDrop(e, 'question')}
      >
      <Input
        id={`question-${number}`}
        placeholder={`Question ${number}`}
        onChange={(e) => handleQChange(e)}
        className={classes.singleForm}
        value={question}
      />
      <Input
        id={`correct-answer-${number}`}
        placeholder="Correct Answer"
        onChange={(e) => handleCAChange(e)}
        className={classes.singleForm}
        value={correctAnswer}
      />
      <Input
        id={`incorrect-answer-a-${number}`}
        placeholder="Incorrect Answer"
        onChange={(e) => handleI1Change(e)}
        className={classes.singleForm}
        value={incorrect1}
      />
      <Input
        id={`incorrect-answer-b-${number}`}
        placeholder="Incorrect Answer"
        onChange={(e) => handleI2Change(e)}
        className={classes.singleForm}
        value={incorrect2}
      />
      <Input
        id={`incorrect-answer-c-${number}`}
        placeholder="Incorrect Answer"
        onChange={(e) => handleI3Change(e)}
        className={classes.singleForm}
        value={incorrect3}
      />
      </FormGroup>
    </div>
  )
}

export default QuestionGenerator;
