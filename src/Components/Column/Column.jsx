import React, { useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import AddCard from "./AddCard";
import Card from "../Card/Card";
import { softOrder } from "../../Utilities/softColumn";
import ListCard from "../Card/ListCard";
import { applyDrag } from "../../Utilities/dragDrop";
import { BsTrash } from "react-icons/bs";
function Column(props) {
  const { columnProps, listColumns, setColumns } = props;
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [showAddCard, setShowAddCard] = useState(false);
  const [titleColumn, setTitleColumn] = useState("");
  const [column, setColumn] = useState(columnProps);
  const [cards, setCards] = useState(
    softOrder(columnProps.cards, columnProps.cardOrder, "id")
  );

  //ENTER TO SUBMIT
  const handleKeyPress = (e) => {
    let key = e.keyCode || e.which;
    if (key === 13) {
      e.preventDefault();
      handleEditTitleColumn();
      setIsEditTitle(false);
    }
  };

  //HANDLE SWAO CARD
  const onCardDrop = (dropResult, id) => {
    if (dropResult.addedIndex === null && dropResult.removedIndex === null) {
      return;
    }
    if (dropResult.removedIndex !== null) {
      let newColumn = column;
      newColumn.cards = applyDrag(column.cards, dropResult);
      newColumn.cardOrder = column.cards.map((card) => card.id);
      setCards(newColumn.cards);
      localStorage.setItem("listColumns", JSON.stringify(listColumns.current));
      return;
    }
    if (dropResult.addedIndex !== null) {
      let newColumn = column;
      newColumn.cards = applyDrag(column.cards, dropResult);
      newColumn.cardOrder = column.cards.map((card) => card.id);
      localStorage.setItem("listColumns", JSON.stringify(listColumns.current));
      setCards(newColumn.cards);
      return;
    }
  };

  //ADD NEW CARD TO COLUMN
  const handleAddCard = (title) => {
    if (!title.trim()) {
      return;
    }

    let newCard = {
      id: "card-" + Date.now(),
      boardId: column.boardId,
      columnId: column.id,
      title: title.trim(),
    };
    setCards([...cards, newCard]);
    let newColumn = column;
    newColumn.cardOrder.push(newCard.id);
    newColumn.cards.push(newCard);
    setColumn(newColumn);
    localStorage.setItem("listColumns", JSON.stringify(listColumns.current));
  };

  //HANDLE DELETE COLUMN
  const handleDeleteColumn = () => {
    listColumns.current.columns = listColumns.current.columns.filter(
      (e) => e.id != column.id
    );
    listColumns.current.columnOrder = listColumns.current.columnOrder.filter(
      (e) => e != column.id
    );
    setColumns(listColumns.current.columns);
    localStorage.setItem("listColumns", JSON.stringify(listColumns.current));
  };

  //HANDLE EDIT TITLE COLUMN
  const handleEditTitleColumn = () => {
    if (!titleColumn.trim()) {
      console.log("CHUA DIEN TITLE");
      return;
    }
    let newColumn = column;
    newColumn.title = titleColumn.trim();
    setColumn(newColumn);
    localStorage.setItem("listColumns", JSON.stringify(listColumns.current));
  };

  useEffect(() => {
    setTitleColumn(column.title);
  }, []);

  return (
    <>
      <div className="column">
        {isEditTitle ? (
          <header className="column-drag-handle">
            <div className="edit-title-column">
              <input
                value={titleColumn}
                type="text"
                onKeyDown={(e) => handleKeyPress(e)}
                onChange={(e) => setTitleColumn(e.target.value)}
              />
            </div>
          </header>
        ) : (
          <header className="column-drag-handle">
            <div
              className="column-drag-title"
              onClick={() => setIsEditTitle(true)}
            >
              {column.title}
            </div>
            <div
              className="column-drag-handle-delete"
              onClick={handleDeleteColumn}
            >
              <BsTrash />
            </div>
          </header>
        )}

        <div className="list-card">
          <ListCard
            onCardDrop={onCardDrop}
            cards={cards}
            setCards={setCards}
            listColumns={listColumns}
            column={column}
          />
          {showAddCard && (
            <AddCard
              setCards={setCards}
              handleAddCard={handleAddCard}
              setShowAddCard={setShowAddCard}
            />
          )}
        </div>
        <footer>
          {!showAddCard && (
            <div className="add-card" onClick={() => setShowAddCard(true)}>
              <AiOutlinePlus />
              Thêm thẻ
            </div>
          )}
        </footer>
      </div>
    </>
  );
}

export default Column;
