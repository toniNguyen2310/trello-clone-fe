import React from "react";
import Box from "@mui/material/Box";

function BoardBar(props) {
  return (
    <Box
      sx={{
        pl: 2,
        backgroundColor: "#342d5e",
        width: "100%",
        height: (theme) => theme.trello.boardBarHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        overflowX: "auto",
        borderTop: "1px solid #6f6f6f",
        color: "#ffffff",
        fontWeight: "bold",
        fontSize: "18px",
      }}
    >
      TO DO LIST
    </Box>
  );
}

export default BoardBar;
