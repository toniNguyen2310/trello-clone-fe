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
import AddCard from "./AddCard";
const COLUMN_HEADER_HEIGHT = "50px";
const COLUMN_FOOTER_HEIGHT = "56px";

function ListCards(props) {
  const {
    cards,
    isAddCard,
    setIsAddCard,
    setColumns,
    listColumns,
    column,
    columns,
  } = props;
  const [listCard, setListCard] = useState(cards);

  //HANDLE ADD NEW CARD
  const handleAddNewCard = (title) => {
    let newCard = {
      id: "card-" + Date.now(),
      boardId: column.boardId,
      columnId: column.id,
      title: title.trim(),
    };

    setListCard([...listCard, newCard]);
    let newColumn = column;
    newColumn.cardOrder.push(newCard.id);
    newColumn.cards.push(newCard);
    let indexColumn = listColumns.current.columns.findIndex(
      (e) => e.id === newColumn.id
    );

    let indexPlaceHolder = newColumn.cards.findIndex(
      (e) => e.FE_PlaceholerCard
    );
    //loại trừ placeholder
    if (indexPlaceHolder > -1) {
      let idOrder = newColumn.cards[indexPlaceHolder].id;
      newColumn.cards = newColumn.cards.filter((e) => !e.FE_PlaceholerCard);
      newColumn.cardOrder = newColumn.cardOrder.filter((e) => e !== idOrder);
    }

    listColumns.current.columns[indexColumn] = newColumn;

    localStorage.setItem("listColumns", JSON.stringify(listColumns.current));
  };

  //HANDLE DELETE SIGLE CARD
  const handleDeleteSigleCard = (id) => {
    const indexColumn = listColumns.current.columns.findIndex(
      (e) => e.id === column.id
    );
    let fakeColumn = JSON.parse(JSON.stringify(columns));
    fakeColumn[indexColumn].cardOrder = fakeColumn[
      indexColumn
    ].cardOrder.filter((e) => e !== id);
    fakeColumn[indexColumn].cards = fakeColumn[indexColumn].cards.filter(
      (e) => e.id !== id
    );
    let fakeColumnsToSaveLS = JSON.parse(JSON.stringify(fakeColumn));
    if (fakeColumn[indexColumn].cardOrder.length === 0) {
      let cardPlaceHolder = {
        id: `${fakeColumn[indexColumn].id}-placeholder-card`,
        boardId: fakeColumn[indexColumn].boardId,
        columnId: fakeColumn[indexColumn].id,
        FE_PlaceholerCard: true,
      };
      fakeColumn[indexColumn].cardOrder.push(cardPlaceHolder.id);
      fakeColumn[indexColumn].cards.push(cardPlaceHolder);
    }
    setColumns(fakeColumn);
    listColumns.current.columns = fakeColumnsToSaveLS;

    localStorage.setItem("listColumns", JSON.stringify(listColumns.current));
  };

  useEffect(() => {
    setListCard(cards);
  }, [cards]);

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
          return (
            <Card2
              key={card.id}
              card={card}
              column={column}
              listColumns={listColumns}
              setListCard={setListCard}
              cards={cards}
              setColumns={setColumns}
              columns={columns}
              handleDeleteSigleCard={handleDeleteSigleCard}
            />
          );
        })}
        {isAddCard && (
          <AddCard
            column={column}
            handleAddNewCard={handleAddNewCard}
            setIsAddCard={setIsAddCard}
          />
        )}
      </Box>
    </SortableContext>
  );
}

export default ListCards;
