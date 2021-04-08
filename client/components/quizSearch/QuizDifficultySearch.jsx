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

const QuizDifficultySearch = ({setCriteria}) => {

  const classes = useStyles();
  const [difficulty, setDifficulty] = useState('');
  const difficulties = ['easy', 'medium', 'hard'];

  function handleChange(e) {
    e.preventDefault();
    setCriteria(e.target.value);
  }

  return (
    <Grid container>
      <Grid item xs={12} >
        <FormControl fullWidth={true}>
          <InputLabel id='quiz-difficulty-select-label'>Difficulty</InputLabel>
          <Select
            labelId='quiz-filter-select-label'
            id='quiz-filter-select'
            value=''
            onChange={handleChange}
          >
            { difficulties.map((difficulty, index) => {
              return (
                <MenuItem value={difficulty} key={index}>
                  { difficulty }
                </MenuItem>
              )
            }) }
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  )
}

export default QuizDifficultySearch;