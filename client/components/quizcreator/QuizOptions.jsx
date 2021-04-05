import React from 'react';
import { Select, InputLabel, MenuItem }  from '@material-ui/core';
import DifficultySelector from './DifficultySelector.jsx';
import CategorySelector from './CategorySelector.jsx';

const QuizOptions = ({ handleCategoryChange, handleDifficultyChange, difficulty, category }) => {

  return (
    <div>
      <h3>
        Select Quiz Options:
      </h3>
      <CategorySelector category={category} handleCategoryChange={handleCategoryChange}/>
      <DifficultySelector difficulty={difficulty} handleDifficultyChange={handleDifficultyChange}/>
    </div>
  )
}

export default QuizOptions;
