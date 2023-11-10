import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

function AddColumn(props) {
  const { setCreateColumn, handleAddColumn } = props;
  const [title, setTitle] = useState("");
  const addRef = useRef(null);

  //ENTER TO SUBMIT
  const handleKeyPress = (e) => {
    let key = e.keyCode || e.which;
    if (key === 13) {
      e.preventDefault();
      AddColumn();
    }
  };

  //ADD NEW COLUMN
  const AddColumn = () => {
    if (!title.trim()) {
      return;
    }
    handleAddColumn(title.trim());
    setTitle("");
    addRef.current.focus();
  };

  useEffect(() => {
    addRef.current.focus();
  }, []);
  return (
    <>
      <div className="cover-edit-cart">
        <div className="card card-edit">
          <textarea
            onKeyDown={(e) => handleKeyPress(e)}
            ref={addRef}
            placeholder="Nhập tiêu đề cho danh sách"
            value={title}
            className="texarea"
            name=""
            id=""
            rows="1"
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
