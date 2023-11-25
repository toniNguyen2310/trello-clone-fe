import React, { useEffect, useRef, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { BsTrash } from "react-icons/bs";
import "./card.scss";
import EditCard from "./EditCard";
import { message, Popconfirm } from "antd";
import { editBoardContent } from "../../Utilities/variable";
function Card2(props) {
  const {
    card,
    column,
    listColumns,
    setListCard,
    cards,
    setColumns,
    columns,
    handleDeleteSigleCard,
  } = props;
  const titleCardRef = useRef(null);
  const [isEditCard, setIsEditCard] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card?.id, data: { ...card } });
  const styleCard = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
  };

  //HANDLE EDIT TITLE CARD
  const handleEditTitleCard = (title) => {
    if (!title.trim()) {
      message.error("Thông tin đang trống");
      return;
    }
    if (title === card.title) {
      setIsEditCard(false);
      return;
    }
    const indexColumn = listColumns.current.columns.findIndex(
      (e) => e.id === card.columnId
    );
    const indexCard = listColumns.current.columns[indexColumn].cards.findIndex(
      (e) => e.id === card.id
    );
    let newColumn = column;
    newColumn.cards[indexCard].title = title.trim();
    localStorage.setItem("listColumns", JSON.stringify(listColumns.current));
    setIsEditCard(false);
    //DATA TO CALL API
    if (localStorage.getItem("user")) {
      editBoardContent();
    }
  };

  //CONFIRM DELETE
  const confirmDelete = () => {
    handleDeleteSigleCard(card.id);
    message.success("Xóa thành công!");
  };

  return (
    <>
      {isEditCard ? (
        <EditCard
          setIsEditCard={setIsEditCard}
          handleEditTitleCard={handleEditTitleCard}
          titleCardRef={titleCardRef}
          card={card}
        />
      ) : (
        <Card
          ref={setNodeRef}
          style={styleCard}
          {...attributes}
          {...listeners}
          key={card.id}
          sx={{
            borderRadius: "10px",
            cursor: "pointer",

            overflow: "unset",
            boxShadow: card?.FE_PlaceholerCard & "unset",
            height: card?.FE_PlaceholerCard ? "1px" : "unset",
            opacity: card?.FE_PlaceholerCard ? 0 : 1,

            border: card?.FE_PlaceholerCard ? "none" : "1px solid #d6d1d1",
            "&:hover": {
              border: card?.FE_PlaceholerCard ? "none" : "1px solid #333",
              ".button-delete-card": {
                opacity: 1,
              },
            },
            backgroundColor: card?.FE_PlaceholerCard ? "#f1f2f4 " : "#d6d1d1",
          }}
        >
          <CardContent
            sx={{
              p: 1,
              "&:last-child": { p: 1 },
              display: "flex",
            }}
          >
            <div
              className="title-card"
              id={`card-${card.id}`}
              onClick={() => setIsEditCard(true)}
            >
              {card.title}
            </div>
            <Popconfirm
              title="Xóa thẻ"
              description="Bạn vẫn muốn xóa thẻ này chứ?"
              onConfirm={confirmDelete}
              // onCancel={cancelDelete}
            >
              <div className="button-delete-card">
                <BsTrash />
              </div>{" "}
            </Popconfirm>
          </CardContent>
        </Card>
      )}
    </>
  );
}

export default Card2;
