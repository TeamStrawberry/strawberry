import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import { getQuizHistory } from "../../../api_master";
import { useHistory } from "react-router-dom";
import ChallengeFriend from '../friends/ChallengeFriend.jsx';
import { getFriends } from '../../../api_master';

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
  },
  button: {
    backgroundColor: "#303c6c",
    color: "white",
    padding: "6px 16px",
    fontSize: "0.875rem",
    minWidth: "64px",
    boxSizing: "border-box",
    fontFamily: "Roboto",
    fontWeight: "500",
    lineHeight: "1.75",
    borderRadius: "4px",
    letterSpacing: "0.02857em",
    textTransform: "uppercase",
    borderRadius: "4px",
    display: "inline-flex",
    position: "relative",
    alignItems: "center",
    verticalAlign: "middle",
    justifyContent: "center",
    cursor: "pointer",
    border: 0,
    margin: 0,
  }
}));

function UserQuizHistoryTaken({ loggedInUser }) {
  const [quizList, setQuizList] = useState([]);
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);
  const [friends, setFriends] = useState([]);

  const classes = useStyles();
  let history = useHistory();

  const retrieveQuizHistory = () => {
    let quizIds = {}, uniqueQuizzes = [];
    getQuizHistory(loggedInUser.id)
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

  const refreshFriends = () => {
    getFriends(loggedInUser.id)
      .then(res => {
        setFriends(res.data.rows)
      })
  }

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
    refreshFriends();
    return () => {
      setFriends([])
    }
  }, [])

  return (
    <TableContainer>
      <Table className={ classes.table } stickyHeader={ true } aria-label='quizzes'>
        <TableHead>
          <TableRow>
            <TableCell align="center" style={{ fontSize: 22 }}>Name</TableCell>
            <TableCell align="center" style={{ fontSize: 22 }}>Category</TableCell>
            <TableCell align="center" style={{ fontSize: 22 }}>Score</TableCell>
            <TableCell align="center" style={{ fontSize: 22 }}>Date Taken</TableCell>
            <TableCell align="center" style={{ fontSize: 22 }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {quizList.length
            ? quizList.map(quiz => (
              <TableRow key={ quiz.id }>
                <TableCell align="center" style={{ fontSize: 16 }}>{ quiz.name }</TableCell>
                <TableCell align="center" style={{ fontSize: 16 }}>{ quiz.category }</TableCell>
                <TableCell align="center" style={{ fontSize: 16 }}>{ quiz.correct_answer_count }/{ quiz.correct_answer_count + quiz.incorrect_answer_count } ({ (Number(quiz.correct_answer_count)/Number(quiz.correct_answer_count + quiz.incorrect_answer_count) * 100).toFixed(0) }%)</TableCell>
                <TableCell align="center" style={{ fontSize: 16, width:'100%' }}>{ quiz.date_created.slice(0,10) }</TableCell>
                <TableCell
                  align="center"
                  style={{
                    fontSize: 16
                  }}
                >
                  <div
                    className='buttons'
                    style={{
                      display: 'flex',
                      flexDirection: 'row'
                    }}
                  >
                    <button name={ quiz.id_quiz } onClick={ handleRedirect } className={ classes.button } >Retake</button>
                    <ChallengeFriend loggedInUser={ loggedInUser } friends={ friends } link={ `localhost:3000/quiz/${quiz.id_quiz}` }/>
                  </div>
                </TableCell>
              </TableRow>
            ))
            : null
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UserQuizHistoryTaken;
