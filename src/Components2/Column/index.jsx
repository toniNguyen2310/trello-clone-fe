import React, { useEffect, useRef, useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import {
  arrayMove,
  SortableContext,
  useSortable,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
const COLUMN_HEADER_HEIGHT = "50px";
const COLUMN_FOOTER_HEIGHT = "56px";

function ColumnTest(props) {
  const { column } = props;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: column?.id });
  const styleColumn = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <>
      <Box
        sx={{
          minWidth: "300px",
          maxWidth: "300px",
          backgroundColor: "#f1f2f4",
          ml: 2,
          borderRadius: "6px",
          height: "fit-content",
          //   boxSizing: "border-box",
          maxHeight: (theme) =>
            `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`,
        }}
        ref={setNodeRef}
        style={styleColumn}
        {...attributes}
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

        <Box
          sx={{
            // p: 2,
            p: "0 5px",
            m: "0 5px",
            display: "flex",
            flexDirection: "column",
            gap: 1,
            overflowX: "hidden",
            overflowY: "auto",
            maxHeight: (theme) =>
              `calc(${theme.trello.boardContentHeight} 
              - ${theme.spacing(5)} 
              - ${COLUMN_HEADER_HEIGHT} 
              - ${COLUMN_FOOTER_HEIGHT})`,
            "&::-webkit-scrollbar": {
              width: "8px",
              height: "8px",
              borderRadius: "5px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#ced0da",
              borderRadius: "5px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#bfc2cf",
            },
          }}
        >
          {column.cards.map((card) => {
            return (
              <Card
                key={card.id}
                sx={{
                  cursor: "pointer",
                  backgroundColor: "#b1aeae",
                  overflow: "unset",
                }}
              >
                <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                  <Typography>{card.title}</Typography>
                </CardContent>
              </Card>
            );
          })}
        </Box>

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
    </>
  );
}

export default ColumnTest;
