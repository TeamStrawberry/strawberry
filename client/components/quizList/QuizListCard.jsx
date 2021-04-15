import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { getFriends } from "../../../api_master";

import ChallengeFriend from "../friends/ChallengeFriend";

const QuizListCard = ({ quiz, loggedInUser, setLoginOpen }) => {
  const [friends, setFriends] = useState([]);

  const axiosRefreshFriends = () => {
    getFriends(loggedInUser.id)
      .then((friends) => setFriends(friends.data.rows))
      .catch((err) => console.error(err));
  };

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
    }
  }, []);

  return (
    <Card
      style={{
        margin: "2.5px",
        border: "2px solid",
        backgroundColor: "#D2FDFF",
        borderColor: "#303C6C",
        width: "95%",
      }}
    >
      <Grid container direction="row">
        <Grid
          container
          direction="column"
          item
          xs={6}
          style={{ display: "flex" }}
        >
          <Grid item style={{ display: "flex", justifyContent: "flex-start" }}>
            <CardHeader
              onClick={handleClick}
              title={quiz.name}
              style={{ cursor: "pointer" }}
            />
          </Grid>
          <Grid item style={{ display: "flex", justifyContent: "flex-start" }}>
            <CardContent onClick={handleClick}>
              <Typography color="textSecondary">{quiz.category}</Typography>
            </CardContent>
          </Grid>
        </Grid>
        <Grid
          container
          direction="column"
          item
          xs={6}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Grid item style={{ display: "flex", justifyContent: "flex-end" }}>
            <CardContent>
              <Typography color="textSecondary">{quiz.difficulty}</Typography>
            </CardContent>
          </Grid>
          <Grid item style={{ display: "flex", justifyContent: "flex-end" }}>
            <CardContent>
              {loggedInUser.username ? (
                <ChallengeFriend
                  loggedInUser={loggedInUser}
                  friends={friends}
                  link={`http://18.210.13.63:3000/quiz/${quiz.id}`}
                />
              ) : null}
            </CardContent>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default QuizListCard;
