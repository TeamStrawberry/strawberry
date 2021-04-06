import React, { useState, useEffect } from 'react';
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const QuizCategorySearch = (props) => {

  // Dummy data that needs to be deleted
  const quizzes = [
    {
      "id": 1,
      "name": "Geography 1",
      "category": "Geography",
      "difficulty": "easy",
      "date_created": "Mon Apr 05 2021 14:37:37 GMT-0500 (Central Daylight Time)",
      "id_users": 1,
    },
    {
      "id": 2,
      "name": "Entertainment 2",
      "category": "Entertainment",
      "difficulty": "medium",
      "date_created": "Mon Apr 05 2021 14:37:37 GMT-0500 (Central Daylight Time)",
      "id_users": 2,
    },
    {
      "id": 3,
      "name": "Sience 3",
      "category": "Science",
      "difficulty": "hard",
      "date_created": "Mon Apr 05 2021 14:37:37 GMT-0500 (Central Daylight Time)",
      "id_users": 3,
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
    {
      "id": 6,
      "name": "Art 6",
      "category": "Art",
      "difficulty": "medium",
      "date_created": "Mon Apr 05 2021 14:37:37 GMT-0500 (Central Daylight Time)",
      "id_users": 1,
    }
  ];

  const tempCategories = {};
  // This handles the dummy data, and may need to be altered when we have access to the real data
  const categoryMaker = (array) => {
    for (let i = 0; i < array.length; i++) {
      if (!tempCategories[array[i].category]) {
        tempCategories[array[i].category] = 1;
      }
    }
  }
  categoryMaker(quizzes);

  const classes = useStyles();
  const [category, setCategory] = useState('Hot n\' New');

  function handleChange(e) {
    e.preventDefault();
    console.log(e.target.value);
  }

  return (
    <Grid container>
      <Grid item xs={12} >
        <FormControl fullWidth={true}>
          <InputLabel id='quiz-filter-select-label'>Category</InputLabel>
          <Select
            labelId='quiz-filter-select-label'
            id='quiz-filter-select'
            value=''
            onChange={handleChange}
          >
            { Object.keys(tempCategories).map((category, index) => {
              if (index === 0) {
                return (
                  <MenuItem selected disabled value={category}>
                    <em>{ category }</em>
                  </MenuItem>
                )
              } else {
                return (
                  <MenuItem value={category}>
                    { category }
                  </MenuItem>
                )
              }
            }) }
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  )
}

export default QuizCategorySearch;