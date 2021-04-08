import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography
} from '@material-ui/core';

const  QuizListCard = ({ quiz }) => (
  <Card>
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

export default QuizListCard;