import React, { useState } from 'react';
import { Button, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
const { removeQuiz } = require('../../../api_master.js');

function getModalStyle() {
    const top = 50;
    const left = 50;
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        position: 'absolute',
        width: 450,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const DeleteButton = ({ quizId }) => {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleQuizDelete = (quiz_id) => {
        removeQuiz(quiz_id)
            .then(() => console.log('Quiz and questions deleted successfully'))
            .catch(err => console.error('Error', err))

      setOpen(false);
    }

    return (
        <div>
            <Button variant="contained" color="secondary" onClick={handleOpen}>
               Delete
            </Button>

            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div style={modalStyle} className={classes.paper}>
                    <h2>Warning!</h2>
                    <p>
                      Deleting a quiz cannot be undone.
                    </p>
                    <Button onClick = {()=>{handleQuizDelete(quizId)}}>Delete Anyway</Button>
                    <Button onClick = {() => handleClose()}>Back</Button>
                </div>
            </Modal>
        </div>
    );
}

export default DeleteButton;