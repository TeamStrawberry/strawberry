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
    setName(name);
  }

  const handleCategoryChange = (categoryName) => {
    setCategory(categoryName);
  }

  const handleDifficultyChange = (difficulty) => {
    setDifficulty(difficulty);
  }

  const handleQuestionInputs = () => {
    let store = [];

  }

  const handleSubmit = () => {
    console.log('Clicked!')
    for (let i = 1; i < 16; i++) {
      let question = document.getElementById(`question${i}`);
      console.log(question);
    }
  }

  return (
    <div>
      <QuizOptions handleCategoryChange={handleCategoryChange} handleDifficultyChange={handleDifficultyChange} handleNameChange={handleNameChange} category={category} difficulty={difficulty} name={name}/>
      <QuizSubmit handleSubmit={handleSubmit}/>
      <QuizQuestionsAndAnswers />
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