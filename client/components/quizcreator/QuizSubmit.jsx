import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  quizSubmit: {
    backgroundColor: theme.palette.info.main,
    '&:hover': {
      backgroundColor: theme.palette.text.primary,
      color: 'white',
    },
    marginTop: '15px',
    height: '35px',
    border: '3px solid',
    borderColor: theme.palette.text.primary,
  }
}))

const QuizSubmit = ({ handleSubmit, name, category, difficulty }) => {
  const classes = useStyles();

  return (
    <div>
      <Button
        size="small"
        onClick={(e) => handleSubmit()}
        className={classes.quizSubmit}
      >
        Submit Quiz
      </Button>
    </div>
  )
}

export default QuizSubmit;