import React from 'react';
import { TextField, FormGroup } from '@material-ui/core';

const QuestionGenerator = ({ number }) => {
  return (
    <div>
      <FormGroup id={`QuestionAndAnswer${number}`}>
      <TextField id={`question-${number}`} label={`Question ${number}`} variant="outlined"/>
      <TextField id={`correct-answer-${number}`} label="Correct Answer" />
      <TextField id={`incorrect-answer-a-${number}`} label="Incorrect Answer" />
      <TextField id={`incorrect-answer-b-${number}`} label="Incorrect Answer" />
      <TextField id={`incorrect-answer-c-${number}`} label="Incorrect Answer" />
      </FormGroup>
    </div>
  )
}

export default QuestionGenerator;