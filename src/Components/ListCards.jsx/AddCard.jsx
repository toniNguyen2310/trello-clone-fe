import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

function AddCard(props) {
  const { setIsAddCard, handleAddNewCard, column } = props;
  const [titleCard, setTitleCard] = useState("");
  const addCardRef = useRef(null);

  const handleKeyPress = (e) => {
    let key = e.keyCode || e.which;
    if (key === 13) {
      e.preventDefault();
      addToCard();
      if (column.cards.length === 1) {
        e.target.blur();
      }
    }
  };
  //ADD NEW CARD
  const addToCard = () => {
    if (!titleCard.trim()) {
      return;
    }
    handleAddNewCard(titleCard.trim());
    setTitleCard("");
    addCardRef.current.focus();
  };

  useEffect(() => {
    addCardRef.current.focus();
  }, []);

  return (
    <div className="Add-edit-cart" id={`add-card-${column.id}`}>
      <div className="card card-edit">
        <textarea
          ref={addCardRef}
          placeholder="Nhập tiêu đề cho thẻ này"
          value={titleCard}
          className="texarea"
          name=""
          id=""
          rows="3"
          cols="10"
          onChange={(e) => setTitleCard(e.target.value)}
          onKeyDown={(e) => handleKeyPress(e)}
        ></textarea>
      </div>
      <div className="card-edit-save">
        <div className="card-add-btn" onClick={addToCard}>
          Thêm thẻ
        </div>
        <div className="card-edit-save-x" onClick={() => setIsAddCard(false)}>
          <AiOutlineClose />
        </div>
      </div>
    </div>
  );
}

export default AddCard;
