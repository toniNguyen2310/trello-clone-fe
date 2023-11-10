import React, { useEffect, useRef, useState } from "react";

function EditCard(props) {
  const { card, setCards, handleEditSigleCard } = props;
  const editRef = useRef(null);
  const [value, setValue] = useState("");

  const handleKeyPress = (e) => {
    let key = e.keyCode || e.which;
    if (key === 13) {
      e.preventDefault();
      handleEditCard();
    }
  };

  //SUBMIT
  const handleEditCard = () => {
    if (!value.trim()) {
      console.log("KO CO DU LIEU");
      return;
    }
    handleEditSigleCard(value.trim());
  };

  useEffect(() => {
    editRef.current.focus();
  }, []);

  return (
    <div className="cover-edit-cart">
      <div className="card card-edit">
        <textarea
          ref={editRef}
          onKeyDown={handleKeyPress}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="texarea"
          name=""
          id=""
          rows="3"
          cols="10"
        ></textarea>
      </div>
      <div className="card-edit-save">
        <div className="card-edit-save-btn" onClick={handleEditCard}>
          SAVE
        </div>
      </div>
    </div>
  );
}

export default EditCard;
