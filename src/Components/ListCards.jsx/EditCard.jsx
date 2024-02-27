import React, { useEffect, useState } from "react";

function EditCard(props) {
  const { handleEditTitleCard, card, setIsEditCard, setIsModal } = props;
  const [titleCard, setTitleCard] = useState();

  const handleKeyPress = (e) => {
    let key = e.keyCode || e.which;
    if (key === 13) {
      e.preventDefault();
      handleEditTitleCard(titleCard);
    }
  };

  useEffect(() => {
    setTitleCard(card.title);
  }, []);


  return (
    <div className="Add-edit-cart" id={`editCard-${card.id}`}>
      <div className="card card-edit">
        <textarea
          spellCheck="false"
          autoFocus
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
        <div
          className="card-edit-save-btn"
          onClick={() => {handleEditTitleCard(titleCard)

          }}
        >
          Lưu
        </div>
      </div>
    </div>
  );
}

export default EditCard;
