import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { initData } from "../../Utilities/InitData";
import { softOrder } from "../../Utilities/softColumn";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  MouseSensor,
} from "@dnd-kit/core";
import "./boardContent.scss";
import {
  arrayMove,
  SortableContext,
  useSortable,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import Column from "../../Components/Column/Column";
import ColumnTest from "../Column";
const COLUMN_HEADER_HEIGHT = "50px";
const COLUMN_FOOTER_HEIGHT = "56px";

function BoardContent(props) {
  const listColumns = useRef([]);
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);

  //sensor when drag
  // const pointerSensor = useSensor(PointerSensor, {
  //   activationConstraint: {
  //     distance: 10,
  //   },
  // });
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const sensors = useSensors(mouseSensor);

  //HANDLE DRAG END
  const handleDragEnd = (event) => {
    const { active, over } = event;
    console.log("acctive");
    if (!over) return;
    if (active.id != over.id) {
      const oldIndex = columns.findIndex((c) => c.id === active.id);
      const newIndex = columns.findIndex((c) => c.id === over.id);
      const newColumn = arrayMove(columns, oldIndex, newIndex);
      const newColumnOrder = newColumn.map((e) => e.id);

      setColumns(newColumn);
    }
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
    // List Column
    <>
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
        <Box
          sx={{
            bgcolor: "inherit",
            width: "100%",
            height: "100%",
            display: "flex",
            overflowX: "auto",
            overflowY: "hidden",
            "&::-webkit-scrollbar-track": {
              m: 2,
            },
            "&::-webkit-scrollbar": {
              "-webkit-appearance": "none",
              bgcolor: "#ffffff00",
              borderRadius: "5px",
            },

            "&::-webkit-scrollbar:horizontal": {
              height: "12px",
            },

            "&::-webkit-scrollbar-thumb": {
              bgcolor: "#8f8f8fbb",
              borderRadius: "5px",
            },
          }}
        >
          <DndContext
            autoScroll={false}
            sensors={sensors}
            onDragEnd={handleDragEnd}
          >
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
        </Box>
      </Box>
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
