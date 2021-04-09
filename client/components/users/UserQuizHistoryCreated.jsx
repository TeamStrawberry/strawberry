import { Grid, Card, CardContent, CardHeader, Button, Modal } from "@material-ui/core";
import React, { useState } from "react";
import UserQuizModal from '../quizcreator/UserQuizModal.jsx';
import { ConfirmProvider } from 'material-ui-confirm';

function UserQuizHistoryCreated() {

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
      <Card style={{ height: "100%" }}>
        <CardHeader
          title="Quizzes Created"
          titleTypographyProps={{ variant: "body2" }}
          style={{ padding: 10 }}
        />
        <CardContent></CardContent>
      </Card>
      <Button onClick = {handleOpen}>Click here to open modal</Button>
      <ConfirmProvider>
       <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <UserQuizModal />
      </Modal>
      </ConfirmProvider>
    </Grid>
  );
}

export default UserQuizHistoryCreated;
