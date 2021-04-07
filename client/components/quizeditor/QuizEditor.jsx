import React, { useState } from 'react';
import DeleteBtn from './DeleteButton.jsx';
import QuizDisplay from './QuizDisplay.jsx';
import axios from 'axios';



// Quiz Editor is currently rendering on Home Page and imported to IndexJsx for Development Purposes
// Once development has been completed, delete import in index and link it to user profile


  //High Level Overview
  // Get userId and quizName from user profile
  // Query questions database by userId and quizName
  // Display questions on forms with the values being prefilled
  // Allow user to edit entire quiz and resubmitting the changes (PUT)
  // Allow user to delete quiz by deleting each question (DELETE)
const QuizEditor = () => {
  // userId and quizName will most likely be passed down as props
  const [userId, setUserId] = useState('');
  const [quizName, setQuizName] = useState('Solar System Quiz');
  //const [quizQuestions, setQuizQuestions] = useState([]); <--May be props May be from request

  // make axios request to database

  return (
    <div>
      <h2>
        {quizName}
      </h2>
      <DeleteBtn userId={userId} quizName={quizName} quizQuestions={''}/>
      <QuizDisplay userId={userId} quizName={quizName} quizQuestions={''}/>
    </div>
  )
}

export default QuizEditor;