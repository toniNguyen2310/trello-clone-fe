import React from "react";
import { AiOutlineClose } from "react-icons/ai";

function EditCard(props) {
  return (
    <div className="Add-edit-cart">
      <div className="card card-edit">
        <textarea
          //   ref={cardRef}
          placeholder="Nhập tiêu đề cho thẻ này"
          //   value={value}
          className="texarea"
          name=""
          id=""
          rows="3"
          cols="10"
          //   onChange={(e) => setValue(e.target.value)}
          //   onKeyDown={(e) => handleKeyPress(e)}
        ></textarea>
      </div>
      <div className="card-edit-save">
        <div className="card-edit-save-btn">Lưu</div>
      </div>
    </div>
  );
}

export default EditCard;
