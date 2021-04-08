import React, { useState, useEffect } from 'react';
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const QuizCategorySearch = ({setCriteria}) => {

  const classes = useStyles();
  const [categories, setCategories] = useState([]);


  function handleChange(e) {
    e.preventDefault();
    setCriteria(e.target.value);
  }

  const axiosGetCategoryList = () => {
    axios
      .get('/categories')
      .then(newCategories => setCategories(newCategories.data))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    axiosGetCategoryList();
  }, []);

  // const handleClick = (e) => {
  //   console.log('Value: ', e.value);
  //   history.push(`/quizzes/${e.value}`);
  // };

  return (
    <Grid container>
      <Grid item xs={12} >
        <FormControl fullWidth={true}>
          <InputLabel id='quiz-category-select-label'>Category</InputLabel>
          <Select
            labelId='quiz-filter-select-label'
            id='quiz-filter-select'
            value=''
            onChange={handleChange}
          >
            { categories.map((category, index) => {
              return (
                <MenuItem value={category} key={index}>
                  { category }
                </MenuItem>
              )
            }) }
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  )
}

export default QuizCategorySearch;