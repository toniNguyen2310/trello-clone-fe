import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import ListCards from "../ListCards.jsx";
import { BsTrash } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import AddColumn from "./AddColumn.jsx";

const COLUMN_HEADER_HEIGHT = "50px";
const COLUMN_FOOTER_HEIGHT = "50px";

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
          borderRadius: "10px",
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
            // pl: 2,

            alignItems: "center",
            cursor: "pointer",
            // backgroundColor: "red",
          }}
        >
          {/* {column.title} */}
          <div className="header-column">
            <div className="title-column"> {column.title}</div>
            <div className="delete-column">
              <BsTrash />
            </div>
          </div>
          {/* <div className="header-column">
            <div className="input-title-column">
              <input type="text" />
            </div>
          </div> */}
        </Box>
        <ListCards cards={column.cards} />
        <Box
          sx={{
            height: COLUMN_FOOTER_HEIGHT,
            p: 1,
            alignItems: "center",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            fontSize: "16px",
          }}
        >
          <div className="footer-column">
            <AiOutlinePlus />
            Thêm thẻ
          </div>
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
