import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import App2 from "./App2.jsx";
import theme from "./theme.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    {/* <StrictMode> */}
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <App2 />
    </CssVarsProvider>

    {/* </StrictMode> */}
  </>
);
