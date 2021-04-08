import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const  QuizListCard = ({ quiz }) => {

  let history = useHistory();
  const handleClick = () => {
    history.push(`/quiz/${quiz.id}`);
  };

  return (
    <Card onClick={ handleClick }>
      <CardHeader title={ quiz.name } />
      <CardContent>
        <Typography color='textSecondary'>
          { quiz.category }
        </Typography>
        <Typography color='textSecondary'>
          { quiz.difficulty }
        </Typography>
          This is where Mike's button goes
      </CardContent>
    </Card>
  )
}

export default QuizListCard;