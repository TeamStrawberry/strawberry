import React from 'react';
import { TextField, FormGroup } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  questionGroup: {
    padding: '5px'
  },
  singleForm: {
    padding: '3px'
  }
}))

const QuestionGenerator = ({ number }) => {
  const classes = useStyles();
  return (
    <div>
      <FormGroup
      id={`QuestionAndAnswer${number}`}
      className={classes.questionGroup}
      >
      <TextField
        id={`question-${number}`}
        label={`Question ${number}`}
        variant="outlined"
        className={classes.singleForm}
      />
      <TextField
        id={`correct-answer-${number}`}
        label="Correct Answer"
        className={classes.singleForm}
      />
      <TextField
        id={`incorrect-answer-a-${number}`}
        label="Incorrect Answer"
        className={classes.singleForm}
      />
      <TextField
        id={`incorrect-answer-b-${number}`}
        label="Incorrect Answer"
        className={classes.singleForm}
      />
      <TextField
        id={`incorrect-answer-c-${number}`}
        label="Incorrect Answer"
        className={classes.singleForm}
      />
      </FormGroup>
    </div>
  )
}

export default QuestionGenerator;
