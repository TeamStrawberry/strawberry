import React, { useState } from 'react';
import QuizOptions from './QuizOptions.jsx';
import QuizQuestionsAndAnswers from './QuizQuestionsAndAnswers.jsx';
import QuizSubmit from './QuizSubmit.jsx';

const QuizCreator = () => {

  const [category, setCategory] = useState('General-Knowledge');
  const [difficulty, setDifficulty] = useState('Easy');
  //const [questions, setQuestions] = useState([]);
  // Add state for quiz questions and quiz answers

  const handleCategoryChange = (categoryName) => {
    setCategory(categoryName);
  }

  const handleDifficultyChange = (difficulty) => {
    setDifficulty(difficulty);
  }

  return (
    <div>
      Developing Quiz Creator Page
      <QuizOptions handleCategoryChange={handleCategoryChange} handleDifficultyChange={handleDifficultyChange} category={category} difficulty={difficulty}/>
      <QuizQuestionsAndAnswers />
      <QuizSubmit />
    </div>
  )
}

export default QuizCreator;