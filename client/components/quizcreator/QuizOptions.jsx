import React from 'react';
import { Select, InputLabel, MenuItem }  from '@material-ui/core';
import DifficultySelector from './DifficultySelector.jsx';
import CategorySelector from './CategorySelector.jsx';
import QuizName from './QuizName.jsx'

const QuizOptions = ({ handleCategoryChange, handleDifficultyChange, difficulty, category, name, handleNameChange }) => {
  return (
    <div>
      <h3>
        Quiz Options
      </h3>
      <QuizName name={name} handleNameChange={handleNameChange}/>
      <CategorySelector category={category} handleCategoryChange={handleCategoryChange}/>
      <DifficultySelector difficulty={difficulty} handleDifficultyChange={handleDifficultyChange}/>
    </div>
  )
}

export default QuizOptions;
