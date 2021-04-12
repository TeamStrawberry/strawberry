import React from 'react';
import { TextField } from '@material-ui/core';

const QuizName = ({ name, handleNameChange }) => {
  return (
    <div>
      <form>
        <TextField
          id="quiz-name"
          value={name}
          onChange={(e) => handleNameChange(e.target.value)}
          label="Quiz Name"
        />
      </form>
    </div>
  )
}

export default QuizName;