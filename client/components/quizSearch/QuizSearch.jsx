import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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

const QuizSearch = (props) => {
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
        <QuizNameSearch />
      </Grid>
      <Grid item>
        <QuizCategorySearch />
      </Grid>
      <Grid item>
        <QuizDifficultySearch />
      </Grid>
    </Grid>
  )

  return(
    <Box>
      <Button onClick={handleOpen} size="small">
        &#x1F50D;
      </Button>
      <Modal open={open} onClose={handleClose}>
        { modalBody }
      </Modal>
    </Box>
  )
}

export default QuizSearch;