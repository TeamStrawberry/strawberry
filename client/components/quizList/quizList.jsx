import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@material-ui/core';
import axios from 'axios';

import QuizSearch from '../quizSearch/QuizSearch';
import QuizListCard from './QuizListCard';

const QuizList = ({ name, category, difficulty }) => {

  const [quizzesBySelection, updateSelection] = useState([]);

  const axiosGetQuizzesByRandomSelection = () => {
    axios
      .get('/quizzes')
      .then(quizzes => updateSelection(quizzes.data.rows))
      .catch(err => console.error(err))
  };

  const axiosGetQuizzesByRandomSelection = () => {
    axios
      .get('/quizzes/:criteria')
      .then(quizzes => updateSelection(quizzes.data.rows))
      .catch(err => console.error(err))
  };

  useEffect(() => {
    axiosGetQuizzesByRandomSelection();
  }, []);

  useEffect(() => {
    axiosGetQuizzesBySelection();
  }, [quizzesBySelection]);


  return (
    <div>
      <Box>
        <QuizSearch />
      </Box>
      <Grid
        direction='column'
        container
        alignItems='center'
        spacing={2}
      >
        { quizzesBySelection.map((quiz, index) =>  <QuizListCard quiz={ quiz } key={ index }/>) }
      </Grid>
    </div>
  )
}

export default QuizList;