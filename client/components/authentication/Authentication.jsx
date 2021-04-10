import React, { Component } from 'react';
import {Modal, Grid, Button, Box, TextField, Typography} from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';

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

function Authentication (props) {
  const classes = useStyles();
  //default will be to render login
  const [renderSignUp, setSignUp] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');

  const handleOpen = () => {
    props.setLoginOpen(true);
  };

  const handleClose = () => {
    setSignUp(false);
    props.setLoginOpen(false);
  };

  const handleLogin = () => {
    axios.get('/login', {
      params: {
        username: username,
        password: password
      }
    })
    .then((res) => {
      props.setUser(res.data.user);
      props.setLoginOpen(false);
    })
    .catch((err) => {
      alert('Incorect username or password, please try again');
    });
  };

  const handleSignUp = () => {
    axios.post('/signup', {
      username: username,
      password: password,
      email: email
    })
    .then((res) => {
      setSignUp(false);
      props.setUser(res.data.user);
      props.setLoginOpen(false);
    })
    .catch((err) => {
      alert('Username or email already exists, please try again!');
    });
  }

  const goToSignup = () => {
    setSignUp(true);
  }

  const goToLogin = () => {
    setSignUp(false);
  }

  const getUsername = (e) => {
    setUsername(e.target.value);
  }

  const getPassword = (e) => {
    setPassword(e.target.value);
  }

  const getEmail = (e) => {
    setEmail(e.target.value);
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
          type="text"
          onChange={getUsername}
          onKeyUp={(e) => {
            if (e.keyCode === 13) {
              handleLogin()
            };
          }}/>
      </Grid>
      <Grid item>
        <TextField
          margin="dense"
          label="Password"
          type="password"
          onChange={getPassword}
          onKeyUp={(e) => {
            if (e.keyCode === 13) {
              handleLogin()
            };
          }}/>
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
          type="email"
          onChange={getEmail}
          onKeyUp={(e) => {
            if (e.keyCode === 13) {
              handleSignUp()
            };
          }}/>
      </Grid>
      <Grid item>
        <TextField
          margin="dense"
          label="Username"
          type="text"
          onChange={getUsername}
          onKeyUp={(e) => {
            if (e.keyCode === 13) {
              handleSignUp()
            };
          }}/>
      </Grid>
      <Grid item>
        <TextField
          margin="dense"
          label="Password"
          type="password"
          onChange={getPassword}
          onKeyUp={(e) => {
            if (e.keyCode === 13) {
              handleSignUp()
            };
          }}/>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          variant="outlined"
          color="primary"
          onClick={handleSignUp}
          onKeyUp={handleSignUp}
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
        <Button variant="h6" onClick={handleOpen} size="small" style={{ textDecoration: 'none', color: 'unset' }}>
          Login/Sign-Up
        </Button>
        <Modal
          open={props.loginOpen} onClose={handleClose}
        >
          {signUpForm}
        </Modal>
      </Box>
    )
  }
  return (
    <Box>
      <Button variant="h6" onClick={handleOpen} size="small" style={{ textDecoration: 'none', color: 'unset' }}>
        Login/Sign-Up
      </Button>
      <Modal
        open={props.loginOpen} onClose={handleClose}
      >
        {loginForm}
      </Modal>
    </Box>
  );
};
export default Authentication;