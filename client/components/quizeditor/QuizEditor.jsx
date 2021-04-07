import React, { useState } from 'react';
import DeleteBtn from './DeleteButton.jsx';
import QuizDisplay from './QuizDisplay.jsx';
import SubmitEditsBtn from './SubmitEditsButton.jsx';
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

  const [userId, setUserId] = useState('');
  const [quizName, setQuizName] = useState('');
  const [quizQuestions, setQuizQuestions] = useState([]);

  // make axios request to database

  return (
    <div>
      Quiz Editor in Development
      <QuizDisplay questions={quizQuestions}/>
      <SubmitEditsBtn />
      <DeleteBtn />
    </div>
  )
}

export default QuizEditor;