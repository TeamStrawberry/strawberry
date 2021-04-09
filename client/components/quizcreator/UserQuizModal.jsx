import React, { useState, useEffect } from 'react';
import { Button, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
import CreatedQuizHistory from '../quizeditor/CreatedQuizHistory.jsx';


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

  const [modalStyle] = useState(getModalStyle);
  const [createdQuizList, setCreatedQuizList] = useState([]);

  let tempUserId = 1;

  return(
    <div className = {classes.paper} style = {modalStyle}>
      <h1 className = 'quizzes-created-heading'>Quizzes Created</h1>
      <CreatedQuizHistory />
    </div>
  )
};

export default UserQuizModal;