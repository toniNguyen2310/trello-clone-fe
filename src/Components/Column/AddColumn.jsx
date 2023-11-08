import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

function AddColumn(props) {
  const { setCreateColumn, handleAddColumn } = props;
  const [title, setTitle] = useState("");

  const AddColumn = () => {
    if (!title.trim()) {
      return;
    }
    handleAddColumn(title.trim());
    setTitle("");
  };
  return (
    <>
      <div className="cover-edit-cart">
        <div className="card card-edit">
          <textarea
            placeholder="Nhập tiêu đề cho danh sách"
            value={title}
            className="texarea"
            name=""
            id=""
            rows="3"
            cols="10"
            onChange={(e) => setTitle(e.target.value)}
          ></textarea>
        </div>
        <div className="card-edit-save">
          <div className="card-edit-save-btn" onClick={AddColumn}>
            Thêm cột
          </div>
          <div
            className="card-edit-save-x"
            onClick={() => setCreateColumn(false)}
          >
            <AiOutlineClose />
          </div>
        </div>
      </div>
    </>
  );
}

export default AddColumn;
