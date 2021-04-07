import React, { Component } from 'react';
import {Modal, Grid, Button, Box, TextField, Typography} from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme = theme) => ({
  modal: {
    position: "absolute",
    width: "20%",
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
}));

function Authentication () {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  //default will be to render login
  const [renderSignUp, setSignUp] = React.useState(false)

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSignUp(false);
  };

  const handleLogin = () => {
    console.log('login');
    handleClose();
  };

  const handleSignUp = () => {
    console.log('signup');
    handleClose();
  }

  const goToSignup = () => {
    setSignUp(true);
  }

  const goToLogin = () => {
    setSignUp(false);
  }


  const loginForm = (
    <Grid container className={classes.modal} direction="column" spacing={3}>
      <Grid item>
        <Typography>Login Here!</Typography>
      </Grid>
      <Grid item>
        <TextField
          autoFocus
          margin="dense"
          label="Username"
          type="text"/>
      </Grid>
      <Grid item>
        <TextField
          margin="dense"
          label="Password"
          type="password"/>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          variant="outlined"
          color="primary"
          onClick={handleLogin}
        >
          Let's Mingle!
        </Button>
      </Grid>
      <Grid item>
        <Typography>
          Don't have an account?
        </Typography>
        <Button
          variant="text"
          color="default"
          onClick={goToSignup}
        >
          Sign-up here!
        </Button>
      </Grid>
    </Grid>
  );

  const signUpForm = (
    <Grid container className={classes.modal} direction="column" spacing={3}>
      <Grid item>
        <Typography>Sign-up Here!</Typography>
      </Grid>
      <Grid item>
        <TextField
          autoFocus
          margin="dense"
          label="Email"
          type="email"/>
      </Grid>
      <Grid item>
        <TextField
          margin="dense"
          label="Username"
          type="text"/>
      </Grid>
      <Grid item>
        <TextField
          margin="dense"
          label="Password"
          type="password"/>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          variant="outlined"
          color="primary"
          onClick={handleSignUp}
        >
          Let's Mingle!
        </Button>
      </Grid>
      <Grid item>
        <Typography>
          Already have an account?
        </Typography>
        <Button
          variant="text"
          color="default"
          onClick={goToLogin}
        >
          Login here!
        </Button>
      </Grid>
    </Grid>
  );

  if (renderSignUp) {
    return (
      <Box>
        <Button variant="text" onClick={handleOpen} size="small">
          Login/Sign-Up
        </Button>
        <Modal
          open={open} onClose={handleClose}
        >
          {signUpForm}
        </Modal>
      </Box>
    )
  }
  return (
    <Box>
      <Button variant="text" onClick={handleOpen} size="small">
        Login/Sign-Up
      </Button>
      <Modal
        open={open} onClose={handleClose}
      >
        {loginForm}
      </Modal>
    </Box>
  );
};
export default Authentication;

/*
Contents and actions need to include:
1 - username text field
2 - password text field
3 - login button that takes user to the
4 - "Don't have an account?" text
5 - "Sign up here" link that either opens another model over this one, or closes the login modal and opens a new one"
EXTRAS: if possible add Forgot password? Reset here, and login with socials
*/
