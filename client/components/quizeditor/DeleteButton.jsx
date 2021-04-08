import React from 'react';
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
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleQuizDelete = (quiz_id) => {
        removeQuiz(quiz_id)
            .then(() => console.log('Quiz and questions deleted successfully'))
            .catch(err => console.log(err))

      setOpen(false);
    }

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Delete Quiz
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
                    <Button onClick={()=>{handleQuizDelete(quizId)}}>Delete Anyway</Button>
                </div>
            </Modal>
        </div>
    );
}

export default DeleteButton;