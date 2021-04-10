import { Grid, Card, CardContent, CardHeader, Button, Modal } from "@material-ui/core";
import React, { useState } from "react";
import UserQuizModal from './UserQuizModal.jsx';

function UserQuizHistoryCreated({loggedInUser, friends}) {

  const [open, setOpen] = useState(false);
  const [userCreatedQuizzes, setUserCreatedQuizzes] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <Grid item xs>
      <Button
        variant = 'contained'
        onClick = {handleOpen}
        style = {{
          backgroundColor: '#D2FDFF'
        }}
      >
        View My Quizzes
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <UserQuizModal
          loggedInUser = {loggedInUser}
          friends = {friends}
        />
      </Modal>
    </Grid>
  );
}

export default UserQuizHistoryCreated;
