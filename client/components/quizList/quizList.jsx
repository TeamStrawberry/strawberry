import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@material-ui/core';
import axios from 'axios';

import QuizSearch from '../quizSearch/QuizSearch';
import QuizListCard from './QuizListCard';

const QuizList = ({ criteria }) => {

  const [quizzesBySelection, updateSelection] = useState([]);
  const [initialLoad, refreshPage] = useState(true);

  const axiosGetQuizzesByRandomSelection = () => {
    // axios
      if (initialLoad) {
        axios
          .get('/quizzes')
          .then(quizzes => updateSelection(quizzes.data.rows))
          .then(res => refreshPage(false))
          .catch(err => console.error(err))
      } else if (criteria) {
        axios
          .get(`/quizzes/${criteria}`)
          .then(quizzes => updateSelection(quizzes.data.rows))
          .catch(err => console.error(err))
      }
  };

  // const axiosGetQuizzesBySelection = () => {
  //   axios
  //     .get('/quizzes/:criteria')
  //     .then(quizzes => updateSelection(quizzes.data.rows))
  //     .catch(err => console.error(err))
  // };

  useEffect(() => {
    axiosGetQuizzesByRandomSelection();
  }, []);


  return (
    <div>
      {/* <Box>
        <QuizSearch />
      </Box> */}
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