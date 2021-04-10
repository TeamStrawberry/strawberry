import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@material-ui/core';
import axios from 'axios';

import QuizSearch from '../quizSearch/QuizSearch';
import QuizListCard from './QuizListCard';
import { getRandomQuizzes, getSelectQuizzes } from "../../../api_master";

const QuizList = ({ criteria, loggedInUser }) => {

  const [quizzesBySelection, updateSelection] = useState([]);
  const [initialLoad, refreshPage] = useState(true);

  const axiosGetQuizzesBySelection = () => {
    if (initialLoad) {
      getRandomQuizzes()
        .then(quizzes => {
          refreshPage(false);
          updateSelection(quizzes.data.rows);
        })
        .catch(err => console.error(err))
    } else if (criteria) {
      getSelectQuizzes(criteria)
        .then(quizzes => updateSelection(quizzes.data))
        .catch(err => console.error(err))
    }
  };

  useEffect(() => {
    axiosGetQuizzesBySelection();
  }, [criteria]);

  return (
    <div>
      <Grid
        direction='column'
        container
        alignItems='center'
        spacing={2}
        xs={12}
      >
        { quizzesBySelection.map((quiz, index) => <QuizListCard quiz={ quiz } key={ index } loggedInUser={ loggedInUser } />)
        }
      </Grid>
    </div>
  )
}

export default QuizList;