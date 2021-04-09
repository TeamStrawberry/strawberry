import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, CardHeader } from "@material-ui/core";
import { getSelectQuizzes } from "../../../api_master";
import QuizListCard from '../quizList/QuizListCard';
const  Trending = () => {

  const [trendingQuizzes, setTrendingQuizzes] = useState([]);

  const getTrendingQuizzes = () => {
    getSelectQuizzes('hot')
      .then(quizzes => setTrendingQuizzes(quizzes.data.rows))
      .catch(err => console.error(err))
  };

  useEffect(() => {
    getTrendingQuizzes();
  }, []);

  return (
    <div>
      {console.log(trendingQuizzes)}
    <Grid
      direction='column'
      container
      alignItems='center'
      spacing={2}
    >
      { trendingQuizzes.map((quiz, index) =>  <QuizListCard quiz={ quiz } key={ index }/>) }
    </Grid>
  </div>
  );
}

export default Trending;
