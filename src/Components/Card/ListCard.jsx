import React from "react";
import { Container, Draggable } from "react-smooth-dnd";
import Card from "./Card";

function ListCard(props) {
  const { cards, onCardDrop, column } = props;

  return (
    <Container
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
    >
      {cards &&
        cards.length > 0 &&
        cards.map((card, index) => {
          return (
            <Draggable key={card.id}>
              <Card card={card} />
            </Draggable>
          );
        })}
    </Container>
  );
}

export default ListCard;
