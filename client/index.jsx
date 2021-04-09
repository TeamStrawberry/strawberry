import React from "react";
import ReactDOM from "react-dom";
import ChallengeFriend from "./components/friends/ChallengeFriend";
import AddFriend from "./components/friends/AddFriend.jsx";
import Navbar from "./components/homepage/Navbar.jsx";
import HomePage from "./components/homepage/HomePage.jsx"
import Routes from "./components/routes/Routes.jsx";
import { theme } from "./theme.js";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Grid, Typography, Box, Button } from "@material-ui/core";

function AppRoot() {
  return (
    <Box m={2}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid container direction="row" spacing={3} align="center">
          <Grid item xs={12}>
            <Routes />
          </Grid>
          <Grid item xs={12}>
          </Grid>
        </Grid>
      </ThemeProvider>
    </Box>
  );
}

ReactDOM.render(AppRoot(), document.getElementById("root"));
