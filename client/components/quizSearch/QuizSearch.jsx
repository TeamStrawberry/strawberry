import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, Modal, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from "@material-ui/icons/Search";

import QuizNameSearch from './QuizNameSearch.jsx';
import QuizCategorySearch from './QuizCategorySearch.jsx';
import QuizDifficultySearch from './QuizDifficultySearch.jsx';

const useStyles = makeStyles((theme = theme) => ({
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

const QuizSearch = ({ setCriteria }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const modalBody = (
    <Grid container className={classes.modal} direction='column' spacing={3}>
      <Grid item>
        <h3 id='quiz-search-modal-title' style={{ margin: 0 }}>
          Search For Quizzes
        </h3>
      </Grid>
      <Grid item>
        <QuizNameSearch setCriteria={setCriteria} setOpen={setOpen}/>
      </Grid>
      <Grid item>
        -OR-
      </Grid>
      <Grid item>
        <QuizCategorySearch setCriteria={setCriteria} setOpen={setOpen}/>
      </Grid>
      <Grid item>
        -OR-
      </Grid>
      <Grid item>
        <QuizDifficultySearch setCriteria={setCriteria} setOpen={setOpen}/>
      </Grid>
      <Button
        onClick={handleClose}
        size='medium'
      >
        Close
      </Button>
    </Grid>
  )

  return(
    <Box>
      <Box
        style={{
          marginBottom: '15px'
        }}
      >
        <Typography
          variant='h2'
          style={{
            position: 'relative',
            right: '35%',
          }}>
          Quizzes
        </Typography>
        <SearchIcon
          onClick={handleOpen}
          style={{
            cursor: 'pointer',
            position: 'absolute',
            right: '10%',
            top: '22%'
          }} />
      </Box>
      <Modal open={open} onClose={handleClose}>
        { modalBody }
      </Modal>
    </Box>
  )
}

export default QuizSearch;