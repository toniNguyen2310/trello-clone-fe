import React, { useEffect, useRef, useState } from "react";
import { cloneDeep } from "lodash";
import Box from "@mui/material/Box";
import {
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import Card from "./Card";
import AddCard from "./AddCard";
import { useCreatePlaceHolderCard } from "../../Utilities/hooks/useCreatePlaceHolderCard";
import { editBoardContent } from "../../Utilities/constant";
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
    setIsModal
  } = props;
  const [listCard, setListCard] = useState(cards);

  //Handle add new card
  const handleAddNewCard = (title) => {
    let newCard = {
      id: "card-" + Date.now(),
      boardId: column.boardId,
      columnId: column.id,
      title: title.trim()
    };

    let newColumn = cloneDeep(column);
    newColumn.cardOrder.push(newCard.id);
    newColumn.cards.push(newCard);
    let indexColumn = listColumns.current.columns.findIndex(
      (e) => e.id === newColumn.id
    );

    let indexCardPlaceHolder = newColumn.cards.findIndex(
      (e) => e.FE_PlaceholderCard
    );

    //When adding a new tag, delete the placeholder card
    if (indexCardPlaceHolder > -1) {
      let idOrder = newColumn.cards[indexCardPlaceHolder].id;
      newColumn.cards = newColumn.cards.filter((e) => !e.FE_PlaceholderCard);
      newColumn.cardOrder = newColumn.cardOrder.filter((e) => e !== idOrder);
    }

    listColumns.current.columns[indexColumn] = newColumn;
    localStorage.setItem("listColumns", JSON.stringify(listColumns.current));
    setColumns([...listColumns.current.columns]);

    //Api
    if (localStorage.getItem("user")) {
      editBoardContent({ addCard: newCard });
    }
  };

  //Handle delete card
  const handleDeleteSingleCard = (id) => {
    //Find index card in column
    const indexColumn = listColumns.current.columns.findIndex(
      (e) => e.id === column.id
    );
    let columnAfterDeleteCard = cloneDeep(column);
    columnAfterDeleteCard.cards=columnAfterDeleteCard.cards.filter((e) => e.id !== id);
    columnAfterDeleteCard.cardOrder=columnAfterDeleteCard.cardOrder.filter((e) => e !== id);

    //Check the column after deletion. If it is empty, a placeholder card will be added
    if (columnAfterDeleteCard.cardOrder.length === 0) {
      let cardPlaceHolder = useCreatePlaceHolderCard(columnAfterDeleteCard);
      columnAfterDeleteCard.cardOrder.push(cardPlaceHolder.id);
      columnAfterDeleteCard.cards.push(cardPlaceHolder);
    }
    listColumns.current.columns[indexColumn]=columnAfterDeleteCard;
    localStorage.setItem("listColumns", JSON.stringify(listColumns.current));
    setColumns([...listColumns.current.columns]);
    //Api
    if (localStorage.getItem("user")) {
      editBoardContent({ deleteCard: id });
    }

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
          p: "0px 5px ",
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
            borderRadius: "5px"
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#ced0da",
            borderRadius: "5px"
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#bfc2cf"
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#ededed",
            borderRadius: "5px"
          }
        }}
      >
        {cards.map((card) => {
          return (
            <Card
              key={card.id}
              card={card}
              column={column}
              listColumns={listColumns}
              setListCard={setListCard}
              cards={cards}
              setColumns={setColumns}
              columns={columns}
              handleDeleteSingleCard={handleDeleteSingleCard}
              setIsModal={setIsModal}
              setIsAddCard={setIsAddCard}
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
