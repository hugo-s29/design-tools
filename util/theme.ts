import { createMuiTheme } from "@material-ui/core";
import { red, purple, grey } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: grey,
    error: {
      main: red.A400,
    },
    background: {
      default: grey[100],
    },
  },
});

export default theme;
