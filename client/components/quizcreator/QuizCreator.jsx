import React, { useState } from 'react';
import QuizOptions from './QuizOptions.jsx';
import QuizQuestionsAndAnswers from './QuizQuestionsAndAnswers.jsx';
import QuizSubmit from './QuizSubmit.jsx';

const QuizCreator = () => {

  const [category, setCategory] = useState('Easy');
  const [difficulty, setDifficulty] = useState('General Knowledge');
  // Add state for quiz questions and quiz answers 

  return (
    <div>
      Developing Quiz Creator Page
      <QuizOptions />
      <QuizQuestionsAndAnswers />
      <QuizSubmit />
    </div>
  )
}

export default QuizCreator;