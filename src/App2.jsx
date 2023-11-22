import React, { useEffect, useRef, useState } from "react";
import "./test.scss";
import Container from "@mui/material/Container";
import { useColorScheme } from "@mui/material/styles";
import AppBar from "./Components2/AppBar";
import BoardBar from "./Components2/BoardBar";
import BoardContent from "./Components2/BoardContent";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import LightModeIcon from "@mui/icons-material/LightMode";

import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";

function App2() {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBar />
      <BoardBar />
      <BoardContent />
    </Container>
  );
}

export default App2;
