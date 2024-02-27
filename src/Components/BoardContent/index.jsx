import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { editBoardContent, initData, softOrder } from "../../Utilities/constant";
import {
  DndContext,
  useSensor,
  useSensors,
  MouseSensor,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners
} from "@dnd-kit/core";
import "./boardContent.scss";
import { arrayMove } from "@dnd-kit/sortable";
import ListColumns from "../ListColumns";
import Column2 from "../ListColumns/Column2";
import Card from "../ListCards.jsx/Card";
import { cloneDeep, isEmpty } from "lodash";
import { useCreatePlaceHolderCard } from "../../Utilities/hooks/useCreatePlaceHolderCard";

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: "ACTIVE_DRAG_ITEM_TYPE_COLUMN",
  CARD: "ACTIVE_DRAG_ITEM_TYPE_CARD"
};

function BoardContent(props) {
  const { columns, checkFetch, setColumns, board, setBoard, listColumns, setIsModal } =
    props;
  const [activeDragItemId, setActiveDragItemId] = useState(null);
  const [activeDragItemType, setActiveDragItemType] = useState(null);
  const [activeDragItemData, setActiveDragItemData] = useState(null);
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] =
    useState(null);

  //Setup library dnd-kit
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10
    }
  });
  const sensors = useSensors(mouseSensor);
  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: { active: { opacity: "0.5" } }
    })
  };

  //find the column with cardId
  const findColumnByCardId = (cardId) => {
    return columns.find((column) =>
      column?.cards?.map((card) => card.id)?.includes(cardId)
    );
  };

  //Update status when moving between 2 different columns
  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData,
    dragEnd
  ) => {

    setColumns((prevColumns) => {
      const overCardIndex = overColumn?.cards?.findIndex(
        (card) => card.id === overCardId
      );
      let newCardIndex;
      const isBelowOverItem =
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height;
      const modifier = isBelowOverItem ? 1 : 0;
      newCardIndex =
        overCardIndex >= 0
          ? overCardIndex + modifier
          : overColumn?.cards?.length + 1;

      const nextColumns = cloneDeep(prevColumns);
      const nextActiveColumn = nextColumns.find(
        (column) => column.id === activeColumn.id
      );
      const nextOverColumn = nextColumns.find(
        (column) => column.id === overColumn.id
      );

      if (nextActiveColumn) {
        nextActiveColumn.cards = nextActiveColumn.cards.filter(
          (card) => card.id !== activeDraggingCardId
        );

        //Create a placeholder card when the column is empty
        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards = [useCreatePlaceHolderCard(nextActiveColumn)];
        }

        nextActiveColumn.cardOrder = nextActiveColumn.cards.map(
          (card) => card.id
        );
      }

      if (nextOverColumn) {
        nextOverColumn.cards = nextOverColumn.cards.filter(
          (card) => card.id !== activeDraggingCardId
        );
        const rebuild_activeDraggingCardData = {
          ...activeDraggingCardData,
          columnId: nextOverColumn.id
        };

        nextOverColumn.cards = nextOverColumn.cards.toSpliced(
          newCardIndex,
          0,
          rebuild_activeDraggingCardData
        );

        nextOverColumn.cards = nextOverColumn.cards.filter(
          (card) => !card.FE_PlaceholderCard
        );

        nextOverColumn.cardOrder = nextOverColumn.cards.map((card) => card.id);
      }

      if (dragEnd) {
        let customColumnToSaveLs = JSON.parse(JSON.stringify(nextColumns));
        let indexEmpty = customColumnToSaveLs.findIndex(
          (e) => e.cards[0].FE_PlaceholderCard
        );

        //The Column is empty === Array is empty
        if (indexEmpty > -1) {
          customColumnToSaveLs[indexEmpty].cardOrder = [];
          customColumnToSaveLs[indexEmpty].cards = [];
        }

        listColumns.current.columns = customColumnToSaveLs;
        localStorage.setItem(
          "listColumns",
          JSON.stringify(listColumns.current)
        );
      }

      return nextColumns;
    });
  };

  //Handle drag start
  const handleDragStart = (event) => {
    setActiveDragItemId(event?.active?.id);
    //Check drag column or card
    setActiveDragItemType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    );
    setActiveDragItemData(event?.active?.data?.current);
    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id));
    }
  };

  //Handle drag over
  const handleDragOver = (event) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return;
    const { active, over } = event;

    if (!active || !over) return;
    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData }
    } = active;
    const { id: overCardId } = over;
    const activeColumn = findColumnByCardId(activeDraggingCardId);
    const overColumn = findColumnByCardId(overCardId);

    if (!activeColumn || !overColumn) return;

    if (activeColumn.id !== overColumn.id) {
      let dragEnd = false;

      moveCardBetweenDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData,
        dragEnd
      );
    }
  };

  //Handle drag end
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!active || !over) return;

    //Type: Drop Card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCardData }
      } = active;
      const { id: overCardId } = over;
      const activeColumn = findColumnByCardId(activeDraggingCardId);
      const overColumn = findColumnByCardId(overCardId);

      if (!activeColumn || !overColumn) return;

      if (oldColumnWhenDraggingCard.id !== overColumn.id) {
        //Handle drop cards when in different columns
        let dragEnd = true;
        moveCardBetweenDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData,
          dragEnd
        );
      } else {
        //Handle drop cards when in same columns
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(
          (c) => c.id === activeDragItemId
        );
        const newCardIndex = overColumn?.cards?.findIndex(
          (c) => c.id === overCardId
        );
        const newOrderCards = arrayMove(
          oldColumnWhenDraggingCard?.cards,
          oldCardIndex,
          newCardIndex
        );

        //Update state
        setColumns((prevColumns) => {
          const nextColumns = cloneDeep(prevColumns);
          const targetColumn = nextColumns.find(
            (column) => column.id === overColumn.id
          );

          targetColumn.cards = newOrderCards;
          targetColumn.cardOrder = newOrderCards.map((card) => card.id);
          listColumns.current.columns = nextColumns;
          localStorage.setItem(
            "listColumns",
            JSON.stringify(listColumns.current)
          );
          return nextColumns;
        });
      }
    }

    //Type: Drop Column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id != over.id) {
        //Find the new and the old column to swap the two columns together
        const oldIndex = columns.findIndex((c) => c.id === active.id);
        const newIndex = columns.findIndex((c) => c.id === over.id);
        const newColumn = arrayMove(columns, oldIndex, newIndex);
        const newColumnOrder = newColumn.map((e) => e.id);
        listColumns.current.columnOrder = newColumnOrder;
        listColumns.current.columns = newColumn;
        setColumns(newColumn);
        localStorage.setItem(
          "listColumns",
          JSON.stringify(listColumns.current)
        );
      }
    }
    if (localStorage.getItem("user")) {
      editBoardContent({ swag: listColumns.current.columns });
    }

    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
    setOldColumnWhenDraggingCard(null);
  };


  //Get Board content in Local Storage
  useEffect(() => {
    if (localStorage.getItem("listColumns")) {
      const boardInitData = JSON.parse(localStorage.getItem("listColumns"));
      for (let i = 0; i < boardInitData.columns.length; i++) {
        if (boardInitData.columns[i].cards.length === 0) {
          let placeholder = useCreatePlaceHolderCard(boardInitData.columns[i]);
          boardInitData.columns[i].cards.push(placeholder);
          boardInitData.columns[i].cardOrder.push(placeholder.id);
        }
      }
      if (boardInitData) {
        setBoard(boardInitData);
        let listColOrder = softOrder(
          boardInitData.columns,
          boardInitData.columnOrder,
          "id"
        );
        setColumns(listColOrder);
        listColumns.current = boardInitData;
        localStorage.setItem("listColumns", JSON.stringify(boardInitData));
      }
    } else {
      //Local Storage is empty
      const boardInitData = initData;
      if (boardInitData) {
        setBoard(boardInitData);
        let listColOrder = softOrder(
          boardInitData.columns,
          boardInitData.columnOrder,
          "id"
        );
        setColumns(listColOrder);
        listColumns.current = boardInitData;
        localStorage.setItem("listColumns", JSON.stringify(boardInitData));
      }
    }
  }, [checkFetch]);

  return (
    <>
      <DndContext
        autoScroll={false}
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        onDragStart={handleDragStart}
      >
        <Box
          sx={{
            background:
              "linear-gradient(141deg, rgba(24, 52, 111, 1) 0%, rgba(9, 9, 121, 1) 41%, rgba(72, 22, 136, 1) 51%, rgba(149, 39, 155, 1) 79%, rgba(218, 85, 172, 1) 100%)",
            width: "100%",
            height: (theme) => theme.trello.boardContentHeight,
            p: "10px 0 "

          }}
          className='board-content'
        >
          <ListColumns
            listColumns={listColumns}
            board={board}
            columns={columns}
            setColumns={setColumns}
            setIsModal={setIsModal}
          />
          <DragOverlay dropAnimation={customDropAnimation}>
            {!activeDragItemType && null}
            {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
              <Column2 column={activeDragItemData} />
            )}
            {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
              <Card card={activeDragItemData} />
            )}
          </DragOverlay>
        </Box>
      </DndContext>
    </>
  );
}

export default BoardContent;
