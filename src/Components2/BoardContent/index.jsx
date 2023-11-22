import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import { initData } from "../../Utilities/InitData";
import { softOrder } from "../../Utilities/softColumn";
import {
  DndContext,
  useSensor,
  useSensors,
  MouseSensor,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
} from "@dnd-kit/core";
import "./boardContent.scss";
import { arrayMove } from "@dnd-kit/sortable";
import ListColumns from "../ListColumns";
import Column2 from "../ListColumns/Column2";
import Card2 from "../ListCards.jsx/Card2";
import { cloneDeep } from "lodash";

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: "ACTIVE_DRAG_ITEM_TYPE_COLUMN",
  CARD: "ACTIVE_DRAG_ITEM_TYPE_CARD",
};

function BoardContent(props) {
  const listColumns = useRef([]);
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);
  //check when start drag
  const [activeDragItemId, setActiveDragItemId] = useState(null);
  const [activeDragItemType, setActiveDragItemType] = useState(null);
  const [activeDragItemData, setActiveDragItemData] = useState(null);
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] =
    useState(null);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const sensors = useSensors(mouseSensor);

  //find column with cardID
  const findColumnByCardId = (cardId) => {
    return columns.find((column) =>
      column?.cards?.map((card) => card.id)?.includes(cardId)
    );
  };
  //HANDLE DRAG START
  const handleDragStart = (event) => {
    setActiveDragItemId(event?.active?.id);
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

  //HANDLE DRAG OVER
  const handleDragOver = (event) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return;
    const { active, over } = event;

    if (!active || !over) return;
    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData },
    } = active;
    const { id: overCardId } = over;
    const activeColumn = findColumnByCardId(activeDraggingCardId);
    const overColumn = findColumnByCardId(overCardId);

    if (!activeColumn || !overColumn) return;

    if (activeColumn.id !== overColumn.id) {
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
          nextActiveColumn.cardOrder = nextActiveColumn.cards.map(
            (card) => card.id
          );
        }

        if (nextOverColumn) {
          nextOverColumn.cards = nextOverColumn.cards.filter(
            (card) => card.id !== activeDraggingCardId
          );
          nextOverColumn.cards = nextOverColumn.cards.toSpliced(
            newCardIndex,
            0,
            activeDraggingCardData
          );
          nextOverColumn.cardOrder = nextOverColumn.cards.map(
            (card) => card.id
          );
        }

        return nextColumns;
      });
    }
  };

  //HANDLE DRAG END
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!active || !over) return;

    //Handle drop card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCardData },
      } = active;
      const { id: overCardId } = over;
      const activeColumn = findColumnByCardId(activeDraggingCardId);
      const overColumn = findColumnByCardId(overCardId);

      if (!activeColumn || !overColumn) return;
      console.log("oldColumnWhenDraggingCard>>>", oldColumnWhenDraggingCard);

      if (oldColumnWhenDraggingCard.id !== overColumn.id) {
        console.log("#");
      } else {
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
        setColumns((prevColumns) => {
          const nextColumns = cloneDeep(prevColumns);
          const targetColumn = nextColumns.find(
            (column) => column.id === overColumn.id
          );

          targetColumn.cards = newOrderCards;
          targetColumn.cardOrder = newOrderCards.map((card) => card.id);

          return nextColumns;
        });
      }
    }

    //Handle drop column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id != over.id) {
        const oldIndex = columns.findIndex((c) => c.id === active.id);
        const newIndex = columns.findIndex((c) => c.id === over.id);
        const newColumn = arrayMove(columns, oldIndex, newIndex);
        const newColumnOrder = newColumn.map((e) => e.id);

        setColumns(newColumn);
      }
    }

    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
    setOldColumnWhenDraggingCard(null);
  };

  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: { active: { opacity: "0.5" } },
    }),
  };

  //RENDER LIST BOARD
  useEffect(() => {
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
  }, []);
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
            p: "10px 0 ",

            // display: "flex",
            // overflowX: "auto",
            // overflowY: "hidden",
          }}
        >
          <ListColumns columns={columns} />
          <DragOverlay dropAnimation={customDropAnimation}>
            {!activeDragItemType && null}
            {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
              <Column2 column={activeDragItemData} />
            )}
            {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
              <Card2 card={activeDragItemData} />
            )}
          </DragOverlay>
        </Box>
      </DndContext>
      {/* <div className="container">
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <SortableContext
            strategy={horizontalListSortingStrategy}
            items={columns?.map((e) => e.id)}
          >
            {columns &&
              columns.length > 0 &&
              columns.map((column) => {
                return <ColumnTest key={column.id} column={column} />;
              })}
          </SortableContext>
        </DndContext>
      </div> */}
    </>
  );
}

export default BoardContent;
