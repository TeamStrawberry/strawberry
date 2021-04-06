import React from "react";
import ReactDOM from "react-dom";
import UserProfile from "./components/users/UserProfile";
import { theme } from "./theme.js";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Grid, Typography, Box } from "@material-ui/core";

function AppRoot() {
  return (
    <Box m={2}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserProfile />
      </ThemeProvider>
    </Box>
  );
}

ReactDOM.render(AppRoot(), document.getElementById("root"));
