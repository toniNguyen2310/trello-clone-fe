import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

function AddCard(props) {
  const { setShowAddCard, handleAddCard } = props;
  const [value, setValue] = useState("");
  const cardRef = useRef(null);
  const handleKeyPress = (e) => {
    let key = e.keyCode || e.which;
    if (key === 13) {
      e.preventDefault();
      addCard();
    }
  };

  const addCard = () => {
    handleAddCard(value);
    setValue("");
    cardRef.current.focus();
  };

  useEffect(() => {
    cardRef.current.focus();
  }, []);
  return (
    <>
      <div className="cover-edit-cart">
        <div className="card card-edit">
          <textarea
            ref={cardRef}
            placeholder="Nhập tiêu đề cho thẻ này"
            value={value}
            className="texarea"
            name=""
            id=""
            rows="3"
            cols="10"
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => handleKeyPress(e)}
          ></textarea>
        </div>
        <div className="card-edit-save">
          <div className="card-edit-save-btn" onClick={() => addCard()}>
            Thêm thẻ
          </div>
          <div
            className="card-edit-save-x"
            onClick={() => setShowAddCard(false)}
          >
            <AiOutlineClose />
          </div>
        </div>
      </div>
    </>
  );
}

export default AddCard;
