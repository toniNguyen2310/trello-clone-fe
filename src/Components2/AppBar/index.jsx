import React from "react";
import Box from "@mui/material/Box";

function AppBar(props) {
  return (
    <Box
      sx={{
        backgroundColor: "red",
        width: "100%",
        height: (theme) => theme.trello.appBarHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      nav bar
    </Box>
  );
}

export default AppBar;
