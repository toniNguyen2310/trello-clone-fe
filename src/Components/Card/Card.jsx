import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";
import EditCard from "./EditCard";

function Card(props) {
  const { card, setCards, listColumns } = props;
  const [isEditCard, setIsEditCard] = useState(false);

  //HANDLE DELETE CARD
  const handleDeleteCard = () => {
    //Index  current column
    const indexColumn = listColumns.current.columns.findIndex(
      (e) => e.id === card.columnId
    );

    //Delete current card in cardOrder
    listColumns.current.columns[indexColumn].cardOrder =
      listColumns.current.columns[indexColumn].cardOrder.filter(
        (e) => e !== card.id
      );

    //Delete current card in cards
    listColumns.current.columns[indexColumn].cards =
      listColumns.current.columns[indexColumn].cards.filter(
        (e) => e.id !== card.id
      );

    setCards(listColumns.current.columns[indexColumn].cards);
    localStorage.setItem("listColumns", JSON.stringify(listColumns.current));
  };

  //OPEN EDIT CARD
  const openEditSigleCard = () => {
    setIsEditCard(true);
  };

  //HANDLE EDIT CARD
  const handleEditSigleCard = (title) => {
    //Index  current column
    const indexColumn = listColumns.current.columns.findIndex(
      (e) => e.id === card.columnId
    );

    //Index current card
    const indexCard = listColumns.current.columns[indexColumn].cards.findIndex(
      (e) => e.id === card.id
    );

    listColumns.current.columns[indexColumn].cards[indexCard].title = title;
    setCards(listColumns.current.columns[indexColumn].cards);
    setIsEditCard(false);
    localStorage.setItem("listColumns", JSON.stringify(listColumns.current));
  };

  window.addEventListener("click", function (event) {
    if (
      !event.target.closest(`#card-${card.id}`) &&
      !event.target.closest(`#editCard-${card.id}`)
    ) {
      setIsEditCard(false);
    } else {
      setIsEditCard(true);
    }
  });

  return (
    <>
      {isEditCard ? (
        <>
          <EditCard
            handleEditSigleCard={handleEditSigleCard}
            setCards={setCards}
            card={card}
          />
        </>
      ) : (
        <div className="card" id={`card-${card.id}`}>
          <span className="card-content" onClick={openEditSigleCard}>
            {card.title}
          </span>
          <div className="card-delete" onClick={handleDeleteCard}>
            <BsTrash />
          </div>
        </div>
      )}
    </>
  );
}

export default Card;
