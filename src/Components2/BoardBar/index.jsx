import React from "react";
import Box from "@mui/material/Box";

function BoardBar(props) {
  return (
    <Box
      sx={{
        backgroundColor: "green",
        width: "100%",
        height: (theme) => theme.trello.boardBarHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        overflowX: "auto",
        borderTop: "1px solid #fff",
      }}
    >
      board bar
    </Box>
  );
}

export default BoardBar;
