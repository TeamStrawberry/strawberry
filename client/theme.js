import { createMuiTheme, makeStyles } from "@material-ui/core/styles";

const themeOptions = {
  palette: {
    type: "light",
    primary: {
      main: "#303C6C",
    },
    secondary: {
      main: "#f4976c",
    },
    background: {
      paper: "#fffefb",
      default: "#fbe8a6",
    },
    info: {
      main: "#d2fdff",
    },
    text: {
      primary: "#303C6C",
    },
  },
};

const theme = createMuiTheme(themeOptions);

export { theme };
