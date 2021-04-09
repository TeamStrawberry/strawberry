import React, { useState, useEffect } from 'react';
import { Button, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ConfirmProvider, useConfirm } from 'material-ui-confirm';
const { getUserQuizHistory, removeQuiz } = require('../../../api_master.js');

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
      maxHeight: '50%',
      overflowY: 'auto'
  };
}

const useStyles = makeStyles(theme => ({
  // modal: {
  //     display: 'flex',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  // },
  paper: {
      position: 'absolute',
      width: 450,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
  },
}));

const UserQuizModal = ({userId}) => {

  const classes = useStyles();
  const confirm = useConfirm();

  const [modalStyle] = useState(getModalStyle);
  const [createdQuizList, setCreatedQuizList] = useState([]);

  let tempUserId = 1;

  useEffect(() => {
    getUserQuizHistory(tempUserId)
      .then(res => {
        setCreatedQuizList(res.data.rows)
      })
      .catch(err => console.error(err))
  },[userId])

  const editQuizButton = (id) => {

  };

  const deleteAndRenderButton = (id) => {
    confirm({ description: 'This action is permanent and will delete this '})
      .then(() => {
        return removeQuiz(id);
      })
      .then(() => {
         return getUserQuizHistory(tempUserId)
      })
      .then(res => {
        setCreatedQuizList(res.data.rows)
      })
      .catch(err => console.error(err))
  };

  return(
    <div className = {classes.paper} style = {modalStyle}>
      <h1 className = 'quizzes-created-heading'>Quizzes Created</h1>
      {createdQuizList.map(quizzes => (
          <div className = 'created-project' key = {quizzes.id}>
            <h2>{quizzes.name}</h2>
            <h3>{quizzes.category}</h3>
            <h4>{quizzes.date_created}</h4>
            <Button onClick = {() => deleteAndRenderButton(quizzes.id)}>Delete Me</Button>
          </div>
      ))}
    </div>
  )
};

export default UserQuizModal;