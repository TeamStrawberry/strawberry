import React from 'react';
import ReactDOM from 'react-dom';
import Routes from "./components/routes/Routes.jsx";
import { theme } from './theme.js';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Grid, Typography, Box, Button } from '@material-ui/core';

import AddFriend from './components/friends/AddFriend.jsx';
import ChallengeFriend from './components/friends/ChallengeFriend';
import QuizSearch from './components/quizSearch/QuizSearch.jsx'

function AppRoot() {
  return (
    <Box m={2}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QuizSearch />
        <Grid container direction="row" spacing={3} align="center">
          <Grid item>
            <Routes />
          </Grid>
        </Grid>
      </ThemeProvider>
    </Box>
  );
}



ReactDOM.render(AppRoot(), document.getElementById("root"));
