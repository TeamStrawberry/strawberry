import React from "react";
import ReactDOM from "react-dom";
import ChallengeFriend from "./components/friends/ChallengeFriend";
import AddFriend from "./components/friends/AddFriend.jsx";
import Navbar from "./components/homepage/Navbar";
import { theme } from "./theme.js";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Grid, Typography, Box } from "@material-ui/core";

function AppRoot() {
  return (
    <Box m={2}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid container direction="row" spacing={3} align="center">
          <Grid item>
          <Grid item>
            <Navbar />
          </Grid>
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
  );
}

ReactDOM.render(AppRoot(), document.getElementById("root"));
