import React from "react";
import ReactDOM from "react-dom";
import ChallengeFriend from "./components/friends/ChallengeFriend";
import AddFriend from "./components/friends/AddFriend.jsx";
import Routes from "./components/routes/Routes.jsx";
import { theme } from "./theme.js";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Grid, Typography, Box } from "@material-ui/core";
import Authentication from "./components/authentication/Authentication.jsx";

function AppRoot() {
  return (
    <Box m={2}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid container direction="row" spacing={3} align="center">
          <Grid item xs={12}>
            <Authentication />
          </Grid>
          <Grid item xs={12}>
            <Routes />
          </Grid>
        </Grid>
      </ThemeProvider>
    </Box>
  );
}

ReactDOM.render(AppRoot(), document.getElementById("root"));
