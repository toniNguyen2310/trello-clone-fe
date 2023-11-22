import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import ListCards from "../ListCards.jsx";
const COLUMN_HEADER_HEIGHT = "50px";
const COLUMN_FOOTER_HEIGHT = "56px";

function Column2(props) {
  const { column } = props;

  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: column?.id, data: { ...column } });
  const styleColumn = {
    transform: CSS.Translate.toString(transform),
    transition,
    height: "100%",
    opacity: isDragging ? "0.5" : undefined,
  };

  return (
    <div ref={setNodeRef} style={styleColumn} {...attributes}>
      <Box
        sx={{
          minWidth: "300px",
          maxWidth: "300px",
          backgroundColor: "#f1f2f4",
          ml: 2,
          borderRadius: "6px",
          height: "fit-content",
          boxSizing: "border-box",
          maxHeight: (theme) =>
            `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`,
        }}
        {...listeners}
      >
        <Box
          sx={{
            height: COLUMN_HEADER_HEIGHT,
            display: "flex",
            p: 2,
            alignItems: "center",
            cursor: "pointer",
            // backgroundColor: "red",
          }}
        >
          {column.title}
        </Box>
        <ListCards cards={column.cards} />
        <Box
          sx={{
            height: COLUMN_FOOTER_HEIGHT,
            p: 2,
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          {column.title}
        </Box>
      </Box>

      {/* <div
        className="column"
        ref={setNodeRef}
        style={styleColumn}
        {...attributes}
        {...listeners}
      >
        <div className="column-header"> {column.title}</div>
        <div className="column-content">
          {column.cards.map((card) => {
            return <div className="card">{card.title}</div>;
          })}
        </div>
        <div className="column-footer"> {column.title}</div>
      </div> */}
    </div>
  );
}

export default Column2;
