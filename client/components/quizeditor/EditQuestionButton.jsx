import React, { useState } from 'react';
import { Button, Modal, Backdrop, Fade, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        width: '500px',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const EditQuestionButton = ({ question }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [newQuestion, setNewQuestion] = useState(null);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [incorrectAnswer1, setIncorrectAnswer1] = useState(null);
    const [incorrectAnswer2, setIncorrectAnswer2] = useState(null);
    const [incorrectAnswer3, setIncorrectAnswer3] = useState(null);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleQChange = (newQuestion) => {
      console.log(newQuestion)
      setNewQuestion(newQuestion);
    }

    const handleCAChange = (newCorrectAnswer) => {
      setCorrectAnswer(newCorrectAnswer);
    }

    const handleIA1Change = (newIncorrectAnswer1) => {
      setIncorrectAnswer1(newIncorrectAnswer1);
    }

    const handleIA2Change = (newIncorrectAnswer2) => {
      console.log(newIncorrectAnswer2)
      setIncorrectAnswer2(newIncorrectAnswer2);
    }

    const handleIA3Change = (newIncorrectAnswer3) => {
      setIncorrectAnswer3(newIncorrectAnswer3);
    }

    const handleUpdateClick = () => {
      // On question update we want to reflect changes on page

      // Submit PUT request to the server

      // Close Modal
      setOpen(false);
    }

    return (
        <div>

            <Button variant="contained" color="secondary" onClick={handleOpen}>
                Edit Question
            </Button>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                      <form>
                        <TextField variant='outlined' id={`question-${question.id}`} label={question.question} onChange={(e)=>{handleQChange(e.target.value)}} fullWidth='true'/>
                        <br></br>
                        <TextField variant='outlined' id={`correct-answer-${question.id}`} label={question.correct_answer} onChange={(e) => {handleCAChange(e.target.value)}}/>
                        <br></br>
                        <TextField variant='outlined' id={`incorrect-answer-a-${question.id}`} label={question.incorrect_answers[0]} onChange={(e) => {handleIA1Change(e.target.value)}}/>
                        <br></br>
                        <TextField variant='outlined' id={`incorrect-answer-b-${question.id}`} label={question.incorrect_answers[1]} onChange={(e) => {handleIA2Change(e.target.value)}}/>
                        <br></br>
                        <TextField variant='outlined' id={`incorrect-answer-c-${question.id}`} label={question.incorrect_answers[2]} onChange={(e) => {handleIA3Change(e.target.value)}}/>
                      </form>
                      <Button onClick={() => {handleUpdateClick()}}>Update</Button>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}

export default EditQuestionButton;