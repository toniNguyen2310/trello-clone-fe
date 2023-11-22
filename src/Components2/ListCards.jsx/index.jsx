import React, { useEffect, useRef, useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import Box from "@mui/material/Box";

import {
  arrayMove,
  SortableContext,
  useSortable,
  horizontalListSortingStrategy,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Card2 from "./Card2";
const COLUMN_HEADER_HEIGHT = "50px";
const COLUMN_FOOTER_HEIGHT = "56px";

function ListCards(props) {
  const { cards } = props;
  return (
    <SortableContext
      strategy={verticalListSortingStrategy}
      items={cards?.map((e) => e.id)}
    >
      <Box
        sx={{
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
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#ededed",
            borderRadius: "5px",
          },
        }}
      >
        {cards.map((card) => {
          return <Card2 key={card.id} card={card} />;
        })}
      </Box>
    </SortableContext>
  );
}

export default ListCards;
