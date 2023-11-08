import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";
import EditCard from "./EditCard";

function Card(props) {
  const { card } = props;
  const [isEditCard, setIsEditCard] = useState(false);
  const handleDeleteCard = () => {
    console.log("card current>>> ", card);
  };
  return (
    <>
      <>
        {isEditCard ? (
          <EditCard />
        ) : (
          <div className="card">
            <span className="card-content">{card.title}</span>
            <div className="card-delete" onClick={handleDeleteCard}>
              <BsTrash />
            </div>
          </div>
        )}
      </>
    </>
  );
}

export default Card;
