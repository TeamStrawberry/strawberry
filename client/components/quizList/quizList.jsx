import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@material-ui/core';
import axios from 'axios';

import QuizSearch from '../quizSearch/QuizSearch';
import QuizListCard from './QuizListCard';

const QuizList = ({ criteria }) => {

  const [quizzesBySelection, updateSelection] = useState([]);
  const [initialLoad, refreshPage] = useState(true);

  const axiosGetQuizzesByRandomSelection = () => {
    if (initialLoad) {
      axios
        .get('/quizzes')
        .then(quizzes => {
          refreshPage(false)
          updateSelection(quizzes.data.rows)
        })
        .catch(err => console.error(err))
    } else if (criteria) {
      axios
        .get(`/quizzes/${criteria}`)
        .then(quizzes => updateSelection(quizzes.data))
        .catch(err => console.error(err))
    }
  };

  useEffect(() => {
    axiosGetQuizzesByRandomSelection();
  }, [criteria]);


  return (
    <div>
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