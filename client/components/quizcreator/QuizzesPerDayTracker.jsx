import React, { useState, useEffect } from 'react';
const { getUserQuizHistory } = require('../../../api_master.js')

const QuizzesPerDayTracker = () => {

  const [quizTrackerCount, setQuizTrackerCount] = useState(0);

  //need to pass in userid from the global component as a prop
  let tempUserId = 1;
  let dailyQuizCount = 0;

  //initiate first render of creation count
  useEffect(() => {
    getUserQuizHistory(tempUserId)
      .then(res => {
        let today = new Date().toISOString().slice(0, 10);
        for (let i  = 0; i < res.data.rows.length; i++) {
          let createdDate = res.data.rows[i]['date_created'].slice(0,10);
          if (createdDate === today) dailyQuizCount++;
        }
        setQuizTrackerCount(dailyQuizCount);
      })
      .catch(err => console.err('Error retrieving quiz count', err))
  }, [])

  // useEffect(() => {
  //   getUserQuizHistory(tempUserId)
  //     .then(res => {
  //       let today = new Date().toISOString().slice(0, 10);
  //       for (let i  = 0; i < res.data.rows.length; i++) {
  //         let createdDate = res.data.rows[i]['date_created'].slice(0,10);
  //         if (createdDate === today) dailyQuizCount++;
  //       }
  //       setQuizTrackerCount(dailyQuizCount);
  //     })
  //     .catch(err => console.err('Error retrieving quiz count', err))
  // }, [quizTrackerCount])

  let errorMessage;
  quizTrackerCount === 2
    ? errorMessage =  <h2 style = {{color: 'red'}}>DAILY LIMIT REACHED. CANNOT CREATE ANYMORE QUIZZES </h2>
    : errorMessage = null

  return (
    <div>
      Total Quizzes Created Today: {quizTrackerCount}
      {errorMessage}
    </div>
  )
}

export default QuizzesPerDayTracker;