import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import ListCards from "../ListCards.jsx";
import { BsTrash } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { editBoardContent } from "../../Utilities/variable.js";
import { message, Popconfirm } from "antd";

const COLUMN_HEADER_HEIGHT = "50px";
const COLUMN_FOOTER_HEIGHT = "50px";

function Column2(props) {
  const { column, listColumns, setColumns, columns } = props;
  const editTitleRef = useRef(null);
  const [isAddCard, setIsAddCard] = useState(false);
  const [isEditTitleColumn, setIsEditTitleColumn] = useState(false);
  const [titleColumn, setTitleColumn] = useState(column?.title);

  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: column?.id, data: { ...column } });
  const styleColumn = {
    transform: CSS.Translate.toString(transform),
    transition,
    height: "100%",
    opacity: isDragging ? "0.5" : undefined,
  };

  const handleKeyPress = (e) => {
    let key = e.keyCode || e.which;
    if (key === 13) {
      e.preventDefault();
      handleEditTitleColumn();
    }
  };

  const handleEditTitleColumn = () => {
    if (!titleColumn.trim()) {
      message.error("Thông tin đang trống");
      return;
    }
    let newColumn = column;
    newColumn.title = titleColumn.trim();
    localStorage.setItem("listColumns", JSON.stringify(listColumns.current));
    setIsEditTitleColumn(false);
    //DATA TO CALL API
    if (localStorage.getItem("user")) {
      editBoardContent();
    }
  };

  //HANDLE DELETE COLUMN
  const handleDeleteColumn = (id) => {
    listColumns.current.columns = listColumns.current.columns.filter(
      (e) => e.id !== id
    );
    listColumns.current.columnOrder = listColumns.current.columnOrder.filter(
      (e) => e != id
    );

    setColumns(listColumns.current.columns);
    localStorage.setItem("listColumns", JSON.stringify(listColumns.current));
    //DATA TO CALL API
    if (localStorage.getItem("user")) {
      editBoardContent();
    }
  };

  //Confirm
  const confirmDelete = () => {
    handleDeleteColumn(column.id);
    message.success("Xóa thành công!");
  };

  useEffect(() => {
    isEditTitleColumn && editTitleRef.current.focus();
    if (isEditTitleColumn) {
      window.addEventListener("click", function (event) {
        if (event.target.closest(`#header-column-${column.id}`)) {
          setIsEditTitleColumn(true);
        } else {
          setIsEditTitleColumn(false);
          setTitleColumn(column?.title);
        }
      });
    }
  }, [isEditTitleColumn]);

  return (
    <div ref={setNodeRef} style={styleColumn} {...attributes}>
      <Box
        sx={{
          minWidth: "300px",
          maxWidth: "300px",
          backgroundColor: "#f1f2f4",
          ml: 2,
          borderRadius: "10px",
          height: "fit-content",
          boxSizing: "border-box",
          maxHeight: (theme) =>
            `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`,
        }}
        {...listeners}
      >
        <Box
          sx={{
            height: COLUMN_HEADER_HEIGHT,
            display: "flex",
            p: 2,
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          {isEditTitleColumn ? (
            <div className="header-column" id={`header-column-${column.id}`}>
              <div className="input-title-column">
                <input
                  value={titleColumn}
                  ref={editTitleRef}
                  onKeyDown={(e) => handleKeyPress(e)}
                  onChange={(e) => setTitleColumn(e.target.value)}
                  type="text"
                />
              </div>
            </div>
          ) : (
            <div className="header-column">
              <div
                className="title-column"
                onClick={() => setIsEditTitleColumn(true)}
              >
                {column.title}
              </div>
              <Popconfirm
                title="Xóa cột"
                description="Bạn vẫn muốn xóa cột này chứ?"
                onConfirm={confirmDelete}
                // onCancel={cancelDelete}
              >
                <div className="delete-column">
                  <BsTrash />
                </div>
              </Popconfirm>
            </div>
          )}
        </Box>
        <ListCards
          isAddCard={isAddCard}
          setIsAddCard={setIsAddCard}
          cards={column.cards}
          setColumns={setColumns}
          listColumns={listColumns}
          column={column}
          columns={columns}
        />
        {!isAddCard && (
          <Box
            sx={{
              height: COLUMN_FOOTER_HEIGHT,
              p: 1.5,
              alignItems: "center",
              cursor: "pointer",
              display: "flex",

              fontSize: "16px",
            }}
          >
            <div className="footer-column" onClick={() => setIsAddCard(true)}>
              <AiOutlinePlus />
              Thêm thẻ
            </div>
          </Box>
        )}
      </Box>
    </div>
  );
}

export default Column2;
