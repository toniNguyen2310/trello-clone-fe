import React, { useEffect, useRef, useState } from "react";
import "./main.scss";
import Container from "@mui/material/Container";
import AppBar from "./Components2/AppBar";
import BoardBar from "./Components2/BoardBar";
import BoardContent from "./Components2/BoardContent";

function App() {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBar />
      <BoardBar />
      <BoardContent />
    </Container>
  );
}

export default App;
