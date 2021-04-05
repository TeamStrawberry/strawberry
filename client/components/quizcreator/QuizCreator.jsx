import React, { useState } from 'react';
import QuizOptions from './QuizOptions.jsx';
import QuizQuestionsAndAnswers from './QuizQuestionsAndAnswers.jsx';
import QuizSubmit from './QuizSubmit.jsx';

const QuizCreator = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('General-Knowledge');
  const [difficulty, setDifficulty] = useState('Easy');
  const [questions, setQuestions] = useState([]);

  const handleNameChange = (name) => {
    console.log(name);
    setName(name);
  }

  const handleCategoryChange = (categoryName) => {
    setCategory(categoryName);
  }

  const handleDifficultyChange = (difficulty) => {
    setDifficulty(difficulty);
  }

  return (
    <div>
      Developing Quiz Creator Page
      <QuizOptions handleCategoryChange={handleCategoryChange} handleDifficultyChange={handleDifficultyChange} handleNameChange={handleNameChange} category={category} difficulty={difficulty} name={name}/>
      <QuizQuestionsAndAnswers />
      <QuizSubmit />
    </div>
  )
}

export default QuizCreator;

/*
{
  "category":"Entertainment: Books",
  "type":"multiple",
  "difficulty":"easy",
  "question":"What was the name of Captain Nemo&#039;s submarine in &quot;20,000 Leagues Under the Sea&quot;?","correct_answer":"The Nautilus","incorrect_answers":["The Neptune","The Poseidon  ","The Atlantis"]}
  ====================================
  question: '',
  correct_answer: '',
  incorrect_answers: []

*/