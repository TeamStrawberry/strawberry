import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, CardHeader } from "@material-ui/core";
import { getSelectQuizzes } from "../../../api_master";
import QuizListCard from '../quizList/QuizListCard';

const  New = () => {

  const [newQuizzes, setNewQuizzes] = useState([]);

  const getNewQuizzes = () => {
    getSelectQuizzes('new')
      .then(quizzes => setNewQuizzes(quizzes.data.rows))
      .catch(err => console.error(err))
  };

  useEffect(() => {
    getNewQuizzes();
  }, []);

  return (
    <div>
    <Grid
      direction='column'
      container
      alignItems='center'
      spacing={2}
    >
      { newQuizzes.map((quiz, index) =>  <QuizListCard quiz={ quiz } key={ index }/>) }
    </Grid>
  </div>
  );
}

export default New;
