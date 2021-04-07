import React from 'react';
import { FormGroup, TextField } from '@material-ui/core';

const QuizDisplayer = ({ questions }) => {
  return questions.map((question) => {
    return (
      <div>
        <FormGroup>
          <TextField />
          <TextField />
          <TextField />
          <TextField />
          <TextField />
        </FormGroup>
      </div>
    )
  });
}

export default QuizDisplayer;