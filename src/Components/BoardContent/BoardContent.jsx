import React, { useEffect, useRef, useState } from "react";
import Column from "../Column/Column";
import { Container, Draggable } from "react-smooth-dnd";
import { initData } from "../../Utilities/InitData";
import { softOrder } from "../../Utilities/softColumn";
import { applyDrag } from "../../Utilities/dragDrop";
import { AiOutlinePlus } from "react-icons/ai";
import AddCard from "../Column/AddCard";
import "./BoardContent.scss";
import AddColumn from "../Column/AddColumn";
function BoardContent(props) {
  const { setModal } = props;
  const listColumns = useRef([]);
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);
  const [createColumn, setCreateColumn] = useState(false);

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
        <Container
          orientation="horizontal"
          onDrop={onColumnDrop}
          getChildPayload={(index) => columns[index]}
          dragHandleSelector=".column-drag-handle"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: "cards-drop-preview",
          }}
        >
          {columns &&
            columns.length > 0 &&
            columns.map((column, index) => {
              return (
                <Draggable key={column.id}>
                  <Column
                    setModal={setModal}
                    columnProps={column}
                    listColumns={listColumns}
                    setColumns={setColumns}
                  />
                </Draggable>
              );
            })}
        </Container>
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
