import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#0243BE",
      dark: "#566690",
      light: "#e5f0ff",
    },
    secondary: {
      main: "#f0f4f7",
      dark: "#16c18c",
      light: "#e3f8f2",
    },
    text: {
      primary: "#2e2e2e",
      secondary: "#566690",
      disabled: "#030303",
      disabledLight: "#8c8c8c",
      warning: "#ffb100",
    },
    error: {
      main: "#c63233",
      dark: "#b10016",
      light: "#fdeded",
    },
    success: {
      main: "#1ac1b1",
      light: "#effdfd",
    },
  },
});

export default theme;
