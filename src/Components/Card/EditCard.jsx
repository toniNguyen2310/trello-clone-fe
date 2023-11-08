import React from "react";

function EditCard(props) {
  return (
    <div className="cover-edit-cart">
      <div className="card card-edit">
        <textarea
          className="texarea"
          name=""
          id=""
          rows="3"
          cols="10"
        ></textarea>
      </div>
      <div className="card-edit-save">
        <div className="card-edit-save-btn">SAVE</div>
      </div>
    </div>
  );
}

export default EditCard;
