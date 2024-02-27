import React, { useEffect, useRef, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { BsTrash } from "react-icons/bs";
import "./card.scss";
import EditCard from "./EditCard";
import { message, Popconfirm } from "antd";
import { editBoardContent } from "../../Utilities/constant";
function Card1(props) {
  const {
    card,
    setColumns,
    listColumns,
    handleDeleteSingleCard,
    setIsModal,
    setIsAddCard
  } = props;
  const titleCardRef = useRef(null);
  const [isEditCard, setIsEditCard] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: card?.id, data: { ...card } });
  const styleCard = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined
  };

  //Handle edit title card
  const handleEditTitleCard = (title) => {
    //Validate value title
    if (!title.trim()) {
      message.error("Thông tin đang trống");
      return;
    }
    if (title === card.title) {
      setIsEditCard(false);
      return;
    }
    //Find index column and card
    const indexColumn = listColumns.current.columns.findIndex(
      (e) => e.id === card.columnId
    );
    const indexCard = listColumns.current.columns[indexColumn].cards.findIndex(
      (e) => e.id === card.id
    );
    listColumns.current.columns[indexColumn].cards[indexCard].title = title.trim();

    //Update state and save to Local Storage
    localStorage.setItem("listColumns", JSON.stringify(listColumns.current));
    setColumns([...listColumns.current.columns]);
    setIsEditCard(false);
    //Call Api
    if (localStorage.getItem("user")) {
      editBoardContent({ editTitle: title.trim() });
    }
  };

  //Confirm delete Card
  const confirmDelete = () => {
    handleDeleteSingleCard(card.id);
    message.success("Xóa thành công!");
  };

  //Hide from add card when click board
  window.addEventListener("mouseup", (e) => {
    if (e.target.className === "content" || e.target.className === "MuiBox-root css-16njqy5") {
      setIsAddCard(false);
      setIsEditCard(false)
    }
  });

  return (
    <>
      {isEditCard ? (
        <EditCard
          setIsEditCard={setIsEditCard}
          handleEditTitleCard={handleEditTitleCard}
          titleCardRef={titleCardRef}
          card={card}
          setIsModal={setIsModal}
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
            height: card?.FE_PlaceholderCard ? "0px" : "unset",
            opacity: card?.FE_PlaceholderCard ? 0 : 1,
            border: card?.FE_PlaceholderCard ? "none" : "2px solid #ffffff",
            "&:hover": {
              border: card?.FE_PlaceholderCard ? "none" : "2px solid #1D7AFC",
              ".button-delete-card": {
                opacity: 1
              }
            },
            backgroundColor: "#ffffff"
          }}
        >
          <CardContent
            sx={{
              p: 0.8,
              "&:last-child": { p: 0.8 },
              display: "flex"
            }}
          >
            <div
              className="title-card"
              id={`card-${card.id}`}
              onClick={() => {
                setIsEditCard(true);
              }}
            >
              {card.title}
            </div>
            <Popconfirm
              title="Xóa thẻ"
              description="Bạn vẫn muốn xóa thẻ này chứ?"
              onConfirm={confirmDelete}
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

export default Card1;
