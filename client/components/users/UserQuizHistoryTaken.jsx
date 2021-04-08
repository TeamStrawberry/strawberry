import { Modal, Button, Grid, Card, CardContent, CardHeader } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import { getQuizHistory } from "../../../api_master";
import { useHistory } from "react-router-dom";

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
  const [count, setCount] = useState(0);

  const classes = useStyles();
  let history = useHistory();

  const retrieveQuizHistory = () => {
    let quizIds = {}, uniqueQuizzes = [];
    getQuizHistory(1) // later change to: getQuizHistory(userId)
      .then(response => {
        let quizzes = response.data.rows;
        for (let i = 0; i < quizzes.length; i++) {
          if (!quizIds[quizzes[i].id_quiz]) {
            quizIds[quizzes[i].id_quiz] = true;
            uniqueQuizzes.push(quizzes[i]);
          }
        }
        return uniqueQuizzes;
      })
      .then(data => {
        setQuizList(data)
        setCount(data.length)
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

  const handleRedirect = (e) => {
    const quizId = e.target.name;
    history.push(`/quiz/${quizId}`);
  }

  useEffect(() => {
    retrieveQuizHistory();
  }, [])

  const body = (
    <Grid className={ classes.modal }>
      {quizList.length
        ? quizList.map(quiz => (
          <Grid item>
            <h4>{ quiz.name }</h4>
            <button
              variant="contained"
              variant="outlined"
              color="primary"
              onClick={ handleRedirect }
              name={ quiz.id_quiz }
            >
              Retake Quiz
            </button>
          </Grid>
        ))
        : null
      }
      <Button
        variant="contained"
        variant="outlined"
        color="primary"
        onClick={ handleClose }
      >
        Close
      </Button>
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
            {quizList.length
              ? quizList.slice(0, 5).map(quiz => (
                <Grid item>
                  <h4>{ quiz.name }</h4>
                  <h4>Score: { quiz.correct_answer_count }/{ quiz.correct_answer_count + quiz.incorrect_answer_count} ({(Number(quiz.correct_answer_count)/Number(quiz.correct_answer_count + quiz.incorrect_answer_count) * 100).toFixed(0) }%)</h4>
                  <button
                    variant="contained"
                    variant="outlined"
                    color="primary"
                    onClick={ handleRedirect }
                    name={ quiz.id_quiz }
                  >
                    Retake Quiz
                  </button>
                </Grid>
              ))
              : null
            }
            {count > 5
              ? <Grid item>
                <Button
                  variant="contained"
                  variant="outlined"
                  color="primary"
                  onClick={ handleOpen }
                >
                  See more
                </Button>
              </Grid>
              : null
            }
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
