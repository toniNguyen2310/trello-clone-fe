import { cyan, deepOrange, orange, teal } from "@mui/material/colors";
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
} from "@mui/material/styles";

const APP_BAR_HEIGHT = "45px";
const BOARD_BAR_HEIGHT = "50px";
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT} )`;

const theme = extendTheme({
  trello: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT,
  },

  colorSchemes: {
    // light: {
    //   palette: {
    //     primary: teal,
    //     secondary: deepOrange,
    //   },
    // },
    // dark: {
    //   palette: {
    //     primary: cyan,
    //     secondary: orange,
    //   },
    // },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        // body: {
        //   "*::-webkit-scrollbar": {
        //     width: "8px",
        //     height: "8px",
        //   },
        //   "*::-webkit-scrollbar-thumb": {
        //     backgroundColor: "red",
        //   },
        //   "*::-webkit-scrollbar-thumb:hover": {
        //     backgroundColor: "blue",
        //   },
        // },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "5rem",
        },
      },
    },
  },
});
export default theme;
