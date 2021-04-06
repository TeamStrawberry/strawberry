import React, { useState } from 'react';
import QuizOptions from './QuizOptions.jsx';
import QuizQuestionsAndAnswers from './QuizQuestionsAndAnswers.jsx';
import QuizSubmit from './QuizSubmit.jsx';
import axios from 'axios';

//pass in userid as prop in here
const QuizCreator = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [quizOptionsLoaded, setQuizOptionsLoaded] = useState(false);

  const handleNameChange = (name) => {
    setName(name);
  }

  const handleCategoryChange = (categoryName) => {
    setCategory(categoryName);
  }

  const handleDifficultyChange = (difficulty) => {
    setDifficulty(difficulty);
    setQuizOptionsLoaded(true);
  }

  const handleSubmit = () => {
    let allQuizQuestions = [];

    for (let i = 1; i < 16; i++) {
      let singleQnA = {};
      let question = document.getElementById(`question-${i}`).value;
      let correctAnswer = document.getElementById(`correct-answer-${i}`).value;
      let incorrectAnswerA = document.getElementById(`incorrect-answer-a-${i}`).value;
      let incorrectAnswerB = document.getElementById(`incorrect-answer-b-${i}`).value;
      let incorrectAnswerC = document.getElementById(`incorrect-answer-c-${i}`).value;

      singleQnA.name = name;
      singleQnA.category = category;
      singleQnA.difficulty = difficulty;
      singleQnA.question = question;
      singleQnA.correct_answer = correctAnswer;
      singleQnA.incorrect_answers = [incorrectAnswerA, incorrectAnswerB, incorrectAnswerC];
      let filteredAnswers = singleQnA.incorrect_answers.filter((answer) => {
        return answer.length
      })
      singleQnA.incorrect_answers = filteredAnswers;

      if (filteredAnswers.length === 1) {
        singleQnA.type = 'boolean';
      } else {
        singleQnA.type = 'multiple';
      }
      // user id <-- AWAITING
      if (singleQnA.question.length) {
        allQuizQuestions.push(singleQnA);
      }
    }
    if (allQuizQuestions.length < 3) alert('Please create at least 3 questions.');

    axios.post('/createquiz', {name, category, difficulty, user: 1})
      .then(res => {
        let quizId = res.data.rows[0].id;
        return quizId
      })
      .then(quizId => {
        allQuizQuestions.forEach(quizQuestion => {
          quizQuestion.id_quiz = quizId;
          quizQuestion.users = 1;
          axios.post('/createquestion', quizQuestion)
            .then (res => console.log('Quiz question saved!'))
            .catch(err => console.log(err))
          })
      })
      .catch(err => console.log(err))
  }

  return (
    <div>
      <QuizOptions handleCategoryChange={handleCategoryChange} handleDifficultyChange={handleDifficultyChange} handleNameChange={handleNameChange} category={category} difficulty={difficulty} name={name}/>
      {quizOptionsLoaded ?
        <div>
          <QuizSubmit handleSubmit={handleSubmit}/>
            <p>
              Insert Directions Here
            </p>
          <QuizQuestionsAndAnswers />
        </div> :
        <div>
          Please Select Quiz Options
        </div>
      }
    </div>
  )
}

export default QuizCreator;
