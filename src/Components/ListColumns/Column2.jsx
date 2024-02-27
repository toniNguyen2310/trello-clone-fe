import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import ListCards from "../ListCards.jsx";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { editBoardContent } from "../../Utilities/constant.js";
import { message, Popconfirm } from "antd";

const COLUMN_HEADER_HEIGHT = "50px";
const COLUMN_FOOTER_HEIGHT = "55px";

function Column2(props) {
  const { column, listColumns, setColumns, columns, setIsModal } = props;
  const editTitleRef = useRef(null);
  const [isAddCard, setIsAddCard] = useState(false);
  const [isEditTitleColumn, setIsEditTitleColumn] = useState(false);
  const titleRef = useRef(null)
  const [titleColumn, setTitleColumn] = useState(column?.title);
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: column?.id, data: { ...column } });
  const styleColumn = {
    transform: CSS.Translate.toString(transform),
    transition,
    // height: "fit-content",
    height: "100%",
    opacity: isDragging ? "0.5" : undefined
  };

  //Enter Submit
  const handleKeyPress = (e) => {
    let key = e.keyCode || e.which;
    if (key === 13) {
      e.preventDefault();
      //Check title empty
      if (!titleRef.current) {
        setTitleColumn(column.title);
        titleRef.current = null;
      }
      setIsEditTitleColumn(false);
    }
  };

  //Handle edit title column
  const handleEditTitleColumn = (title) => {
    titleRef.current = title;
    setTitleColumn(title)
    //Validate
    if (!title.trim()) {
      return;
    }
    //Find index column
    const indexColumn = listColumns.current.columns.findIndex(
      (e) => e.id === column.id
    );
    listColumns.current.columns[indexColumn].title = title.trim();
    //Update state and Save to Local Storage
    localStorage.setItem("listColumns", JSON.stringify(listColumns.current));
    setColumns([...listColumns.current.columns]);

    //Call Api
    if (localStorage.getItem("user")) {
      editBoardContent({ editTitle: title.trim() });
    }
  };

  //Handle delete column
  const handleDeleteColumn = (id) => {
    listColumns.current.columns = listColumns.current.columns.filter(
      (e) => e.id !== id
    );
    listColumns.current.columnOrder = listColumns.current.columnOrder.filter(
      (e) => e != id
    );
    //Update state and Save to Local Storage
    localStorage.setItem("listColumns", JSON.stringify(listColumns.current));
    setColumns([...listColumns.current.columns]);
    //Api
    if (localStorage.getItem("user")) {
      editBoardContent({ deleteColumn: id });
    }
  };

  //Confirm delete column
  const confirmDelete = () => {
    handleDeleteColumn(column.id);
    message.success("Xóa thành công!");
  };

  useEffect(() => {
    isEditTitleColumn && editTitleRef.current.focus();
    //Handle update title column when click outside form
    if (isEditTitleColumn) {
      window.addEventListener("click", function (event) {
        if (event.target.closest(`#header-column-${column.id}`)) {
          setIsEditTitleColumn(true);
        } else {
          //Check title empty
          if (!titleRef.current) {
            setTitleColumn(column.title);
            titleRef.current = null;
          }
          setIsEditTitleColumn(false);
        }
      });
    }
  }, [isEditTitleColumn]);

  return (
    <div className="content" ref={setNodeRef} style={styleColumn} {...attributes}>
      <Box
        sx={{
          minWidth: "280px",
          maxWidth: "280px",
          backgroundColor: "#f1f2f4",
          ml: 2,
          borderRadius: "12px",
          height: "fit-content",
          boxSizing: "border-box",
          maxHeight: (theme) =>
            `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)} )`
        }}
        {...listeners}
      >
        <Box
          sx={{
            height: COLUMN_HEADER_HEIGHT,
            display: "flex",
            p: 2,
            alignItems: "center",
            cursor: "pointer"
          }}
        >
          {isEditTitleColumn ? (
            <div className="header-column" id={`header-column-${column.id}`}>
              <div className="input-title-column">
                <input
                  value={titleColumn}
                  ref={editTitleRef}
                  onKeyDown={(e) => handleKeyPress(e)}
                  // onChange={(e) => setTitleColumn(e.target.value)}
                  onChange={(e) => {
                    handleEditTitleColumn(e.target.value);
                  }}
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
                {/* {titleColumn} */}
                {column.title}
              </div>
              <Popconfirm
                title="Xóa cột"
                description="Bạn vẫn muốn xóa cột này chứ?"
                onConfirm={confirmDelete}
                // onCancel={cancelDelete}
              >
                <div className="delete-column">
                  <BsThreeDots />
                </div>
              </Popconfirm>
            </div>
          )}
        </Box>
        <ListCards
          setIsModal={setIsModal}
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

              fontSize: "16px"
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
