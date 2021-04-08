import { Modal, Button, Grid, Card, CardContent, CardHeader } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  modal: {
    position: "absolute",
    width: "50%",
    backgroundColor: theme.palette.background.paper,
    border: "5px solid",
    borderColor: theme.palette.secondary.main,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: "none",
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  }
}));

function UserQuizHistoryTaken(userId) {
  const [quizList, setQuizList] = useState([]);
  const [show, setShow] = useState(false);

  const classes = useStyles();

  const retrieveQuizHistory = () => {
    axios
      .get('/quiz/history/1') // later change to: `/quiz/history/${userId}`
      .then(response => {
        setQuizList(response.data.rows);
      })
      .catch(err => {
        console.error('Error: cannot retrieve user\'s quiz history from database', err)
      })
  };

  const handleOpen = () => {
    setShow(true);
  }

  const handleClose = () => {
    setShow(false);
  }

  useEffect(() => {
    retrieveQuizHistory();
  }, [])

  const body = (
    <Grid className={ classes.modal }>
      <Grid item>
        {quizList.length
          ? quizList.map(quiz => (
            <h4>{ quiz.name }</h4>
          ))
          : null
        }
      </Grid>
    </Grid>
  )

  return (
    <Grid item xs>
      <Card style={{ height: "100%" }}>
        <CardHeader
          title="Quizzes Taken"
          titleTypographyProps={{ variant: "body2" }}
          style={{ padding: 10 }}
        />
        <CardContent>
          <Grid>
            <Grid item>
              {quizList.length
                ? quizList.slice(0, 5).map(quiz => (
                  <h4>{ quiz.name }</h4>
                ))
                : null
              }
            </Grid>
            <Grid item>
              <Button onClick={ handleOpen }>See more</Button>
            </Grid>
            <Grid item>
              <Modal open={ show } onClose={ handleClose }>
                { body }
              </Modal>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default UserQuizHistoryTaken;
