import React from "react";

import Card from "./Card";

function ListCard(props) {
  const { cards, onCardDrop, column, setCards, listColumns } = props;

  return (
    <>
      {/* <Container
        groupName="col"
        onDrop={(dropResult) => onCardDrop(dropResult, column.id)}
        getChildPayload={(index) => cards[index]}
        dragClass="card-ghost"
        dropClass="card-ghost-drop"
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: "card-drop-preview",
        }}
      > */}
      {cards &&
        cards.length > 0 &&
        cards.map((card, index) => {
          return (
            // <Draggable key={card.id}>
            <Card setCards={setCards} card={card} listColumns={listColumns} />
            // </Draggable>
          );
        })}
      {/* </Container> */}
    </>
  );
}

export default ListCard;
