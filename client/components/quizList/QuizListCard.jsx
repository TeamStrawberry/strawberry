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

const  QuizListCard = ({ quiz, loggedInUser }) => {

  const [friends, setFriends] = useState([]);

  const axiosRefreshFriends = () => {
    getFriends(loggedInUser.id)
      .then(friends => setFriends(friends.data.rows))
      .catch(err => console.error(err))
  }

  let history = useHistory();

  const handleClick = () => {
    history.push(`/quiz/${quiz.id}`);
  };

  useEffect(() => {
    if (loggedInUser.userName) {
      axiosRefreshFriends();
    }
  }, []);

  return (
    <Card
      style={{
        margin: '2.5px',
        border: '2px solid',
        backgroundColor: '#D2FDFF',
        borderColor: '#303C6C',
        width: '95%',
      }}>
      <CardHeader
        onClick={handleClick}
        title={ quiz.name }
        fullWidth={false}
        style={{
          position: 'relative',
          textAlign: 'left',
        }}
      />
        <CardContent onClick={handleClick} >
          <Typography
            color='textSecondary'
            style={{
              textAlign: 'left',
            }}
          >
            { quiz.category }
          </Typography>
          <Typography
            color='textSecondary'
            style={{
              textAlign: 'right',
            }}
          >
            { quiz.difficulty }
          </Typography>
        </CardContent>
        <CardContent>
        {loggedInUser.username ?
          <ChallengeFriend
            loggedInUser={loggedInUser}
            friends={friends}
            link={`localhost:3000/quiz/${quiz.id}`}
            style={{
              textAlign: 'right',
            }}
          />
        :
          <div></div>
        }
      </CardContent>
    </Card>
  )
}

export default QuizListCard;