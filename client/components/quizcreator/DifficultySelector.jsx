import React from 'react';
import { Select, InputLabel, MenuItem }  from '@material-ui/core';

const DifficultySelector = ({ difficulty, handleDifficultyChange }) => {
  return (
    <div>
      <form>
        <InputLabel id="difficulty">Difficulty:</InputLabel>
        <Select value={difficulty} onChange={(e) => handleDifficultyChange(e.target.value)}>
          <MenuItem value="Easy">Easy</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Hard">Hard</MenuItem>
        </Select>
      </form>
    </div>
  )
}

export default DifficultySelector;