import React, { useEffect, useRef, useState } from "react";
import Column from "../Column/Column";
import { initData } from "../../Utilities/InitData";
import { softOrder } from "../../Utilities/softColumn";
import { applyDrag } from "../../Utilities/variable";
import { AiOutlinePlus } from "react-icons/ai";
import AddCard from "../Column/AddCard";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import "./BoardContent.scss";
import AddColumn from "../Column/AddColumn";
import Loading from "../NotFound/Loading";
function BoardContent(props) {
  const listColumns = useRef([]);
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);
  const [createColumn, setCreateColumn] = useState(false);

  const pointerSensor = useSensor(PointerSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 10,
    },
  });
  const sensors = useSensors(pointerSensor);

  //HANDLE DROP COLUMN
  const onColumnDrop = (dropResult) => {
    let newColums = [...columns];
    newColums = applyDrag(newColums, dropResult);
    // listColumns.current.columns = newColums;
    // setColumns([...listColumns.current.columns]);
    setColumns(newColums);
    listColumns.current = newColums;
    console.log("curen>> ", listColumns.current);
    localStorage.setItem("listColumns", JSON.stringify(listColumns.current));
  };

  //HANDLE ADD COLUMN
  const handleAddColumn = (titleColumn) => {
    let newColumn = {
      id: "column-" + Date.now(),
      boardId: board.id,
      title: titleColumn,
      cardOrder: [],
      cards: [],
    };

    setColumns([...columns, newColumn]);
    listColumns.current.columns.push(newColumn);
    listColumns.current.columnOrder.push(newColumn.id);
    localStorage.setItem("listColumns", JSON.stringify(listColumns.current));
  };

  //HANDLE DRAG END
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id != over.id) {
      console.log("keo tha");
      const oldIndex = columns.findIndex((c) => c.id === active.id);
      const newIndex = columns.findIndex((c) => c.id === over.id);
      // console.log(oldIndex, "->", newIndex);
      const newColumn = arrayMove(columns, oldIndex, newIndex);
      const newColumnOrder = newColumn.map((e) => e.id);
      console.log("newColumn>> ", newColumn);
      setColumns(newColumn);
      console.log("newColumnOrder>> ", newColumnOrder);
    }
  };

  //
  window.addEventListener("click", function (event) {
    if (
      !event.target.closest(`#newColumn`) &&
      !event.target.closest(`#newColumn-btn`)
    ) {
      setCreateColumn(false);
    } else {
      setCreateColumn(true);
    }
  });

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
      <div className="board-columns">
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <SortableContext
            strategy={horizontalListSortingStrategy}
            items={columns?.map((e) => e.id)}
          >
            {columns &&
              columns.length > 0 &&
              columns.map((column, index) => {
                return (
                  <Column
                    key={column.id}
                    columnProps={column}
                    listColumns={listColumns}
                    setColumns={setColumns}
                  />
                );
              })}
          </SortableContext>
        </DndContext>

        {createColumn ? (
          <div className="column-create">
            <header className="column-drag-handle"></header>
            <div className="column-input">
              <AddColumn
                handleAddColumn={handleAddColumn}
                setCreateColumn={setCreateColumn}
              />
            </div>
            <div className="add-column"></div>
          </div>
        ) : (
          <div className="column-create">
            <header className="column-drag-handle"></header>
            <div className="column-input"></div>
            <div className="add-column">
              <div
                id="newColumn-btn"
                className="add-card add-column-btn"
                onClick={() => setCreateColumn(true)}
              >
                <AiOutlinePlus />
                Thêm danh sách khác
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default BoardContent;
