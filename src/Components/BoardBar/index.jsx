import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";

function BoardBar(props) {
  const [user, setUser] = useState("");

  useEffect(() => {
    if (localStorage.getItem("user")) {
      let nameUser = JSON.parse(localStorage.getItem("user")).username;
      setUser(nameUser.split(" ")[nameUser.split(" ").length - 1]);
    } else {
      setUser("");
    }
  }, [user]);
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
      {user ? `Board của ${user}` : "BOARD NAME"}
    </Box>
  );
}

export default BoardBar;
