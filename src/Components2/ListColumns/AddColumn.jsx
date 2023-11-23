import React from "react";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";

function AddColumn(props) {
  return (
    <>
      <div className=" column">
        <div className="card card-edit">
          <textarea
            //   ref={cardRef}
            placeholder="Nhập tiêu đề cho danh sách"
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
          <div className="card-add-btn">Thêm danh sách</div>
          <div className="card-edit-save-x">
            <AiOutlineClose />
          </div>
        </div>
      </div>
      {/* <div className="column bg-836d9e">
        <div className="btn-add-column">
          <AiOutlinePlus />
          Thêm danh sách
        </div>
      </div> */}
    </>
  );
}

export default AddColumn;
