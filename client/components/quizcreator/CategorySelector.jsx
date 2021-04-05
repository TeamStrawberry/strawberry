import React from 'react';
import { Select, InputLabel, MenuItem }  from '@material-ui/core';

const CategorySelector = ({ category, handleCategoryChange }) => {
  return (
    <div>
      <InputLabel id="category">Category:</InputLabel>
        <Select value={category} onChange={(e) => handleCategoryChange(e.target.value)}>
          <MenuItem value="General-Knowledge">General Knowledge</MenuItem>
          <MenuItem value="Entertainment">Entertainment</MenuItem>
          <MenuItem value="Science">Science</MenuItem>
          <MenuItem value="Mythology">Mythology</MenuItem>
          <MenuItem value="Sports">Sports</MenuItem>
          <MenuItem value="Geography">Geography</MenuItem>
          <MenuItem value="History">History</MenuItem>
          <MenuItem value="Politics">Politics</MenuItem>
          <MenuItem value="Art">Art</MenuItem>
          <MenuItem value="Celebrities">Celebrities</MenuItem>
          <MenuItem value="Animals">Animals</MenuItem>
          <MenuItem value="Vehicles">Vehicles</MenuItem>
        </Select>
    </div>
  )
}

export default CategorySelector;