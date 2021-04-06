import React from "react";
import ReactDOM from "react-dom";
import ChallengeFriend from "./components/friends/ChallengeFriend";
import AddFriend from "./components/friends/AddFriend.jsx";
import { theme } from "./theme.js";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Grid, Typography, Box } from "@material-ui/core";
import Authentication from "./components/authentication/Authentication.jsx";

function AppRoot() {
  return (
    <Grid container direction="column" spacing={3} align="left">
      <Box m={2}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Authentication />
        </ThemeProvider>
      </Box>
      <Box m={2}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Grid container direction="row" spacing={3} align="center">
            <Grid item>
              <Typography>Mike's Components for Testing</Typography>
            </Grid>
            <Grid item>
              <AddFriend />
            </Grid>
            <Grid item>
              <ChallengeFriend />
            </Grid>
          </Grid>
        </ThemeProvider>
      </Box>
    </Grid>
  );
}

ReactDOM.render(AppRoot(), document.getElementById("root"));
