import React from 'react';
import { Button } from '@material-ui/core';

const QuizSubmit = ({ handleSubmit }) => {
  return (
    <div>
      <Button variant="contained" size="small" onClick={(e) => handleSubmit()}>
        Submit Quiz
      </Button>
    </div>
  )
}

export default QuizSubmit;