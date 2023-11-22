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
} from "@dnd-kit/core";
import "./boardContent.scss";
import { arrayMove } from "@dnd-kit/sortable";
import ListColumns from "../ListColumns";
import Column2 from "../ListColumns/Column2";
import Card2 from "../ListCards.jsx/Card2";

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

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const sensors = useSensors(mouseSensor);

  //HANDLE DRAG START
  const handleDragStart = (event) => {
    setActiveDragItemId(event?.active?.id);
    setActiveDragItemType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    );
    setActiveDragItemData(event?.active?.data?.current);
  };
  //HANDLE DRAG END
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id != over.id) {
      const oldIndex = columns.findIndex((c) => c.id === active.id);
      const newIndex = columns.findIndex((c) => c.id === over.id);
      const newColumn = arrayMove(columns, oldIndex, newIndex);
      const newColumnOrder = newColumn.map((e) => e.id);

      setColumns(newColumn);
    }
    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
  };
  console.log("activeDragItemId> ", activeDragItemId);
  console.log("activeDragItemType> ", activeDragItemType);
  console.log("activeDragItemData> ", activeDragItemData);

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
    // List Column
    <>
      <DndContext
        autoScroll={false}
        sensors={sensors}
        onDragEnd={handleDragEnd}
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
          <DragOverlay>
            {!activeDragItemType && null}
            {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
              <Column2 column={activeDragItemData} />
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
