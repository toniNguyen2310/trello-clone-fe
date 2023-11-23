import React from "react";
import Box from "@mui/material/Box";

function AppBar(props) {
  return (
    <Box
      sx={{
        pl: 2,
        backgroundColor: "#072754",
        width: "100%",
        height: (theme) => theme.trello.appBarHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div className="appBar-logo">
        <img
          className="appBar-logo-img"
          src="https://trello.com/assets/d947df93bc055849898e.gif"
          alt=""
        />
      </div>
    </Box>
  );
}

export default AppBar;
