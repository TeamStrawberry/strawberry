import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@material-ui/core';

import QuizSearch from '../quizSearch/QuizSearch';
import QuizListCard from './QuizListCard';

const QuizList = ({ name, category, difficulty }) => {

   // Dummy data that needs to be deleted
   const dummyQuizzes = [
    {
      "id": 2,
      "name": "Entertainment 2",
      "category": "Entertainment",
      "difficulty": "medium",
      "date_created": "Mon Apr 05 2021 14:37:37 GMT-0500 (Central Daylight Time)",
      "id_users": 2,
    },
    {
      "id": 4,
      "name": "Entertainment 4",
      "category": "Entertainment",
      "difficulty": "easy",
      "date_created": "Mon Apr 05 2021 14:37:37 GMT-0500 (Central Daylight Time)",
      "id_users": 2,
    },
    {
      "id": 5,
      "name": "Entertainement 5",
      "category": "Entertainment",
      "difficulty": "medium",
      "date_created": "Mon Apr 05 2021 14:37:37 GMT-0500 (Central Daylight Time)",
      "id_users": 4,
    },
  ];


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
        { dummyQuizzes.map((quiz, index) =>  <QuizListCard quiz={ quiz } key={ index }/>) }
      </Grid>
    </div>
  )
}

export default QuizList;