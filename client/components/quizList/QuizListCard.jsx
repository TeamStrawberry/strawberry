import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { getFriends } from '../../../api_master';

import ChallengeFriend from '../friends/ChallengeFriend';

const  QuizListCard = ({ quiz, loggedInUser, setLoginOpen }) => {

  const [friends, setFriends] = useState([]);

  const axiosRefreshFriends = () => {
    getFriends(loggedInUser.id)
      .then(friends => setFriends(friends.data.rows))
      .catch(err => console.error(err))
  }

  let history = useHistory();

  const handleClick = () => {
    if (loggedInUser.id) {
      history.push(`/quiz/${quiz.id}`);
    } else {
      setLoginOpen(true);
    }
  };

  useEffect(() => {
    if (loggedInUser.id) {
      axiosRefreshFriends();
      // return () => {
      //   setFriends([]);
      // };
    }
  }, []);

  return (
    <Card style={{ width: '95%' }}>
      <CardHeader
        onClick={handleClick}
        title={ quiz.name }
      />
        <CardContent onClick={handleClick} >
          <Typography color='textSecondary'>
            { quiz.category }
          </Typography>
          <Typography color='textSecondary'>
            { quiz.difficulty }
          </Typography>
        </CardContent>
        <CardContent>
        {loggedInUser.id ?
          <ChallengeFriend
            loggedInUser={loggedInUser}
            friends={friends}
            link={`localhost:3000/quiz/${quiz.id}`}
          />
        :
          <div></div>
        }
      </CardContent>
    </Card>
  )
}

export default QuizListCard;