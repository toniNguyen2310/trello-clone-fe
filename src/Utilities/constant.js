import { editBoard } from "../Service/service";

//initial data
export const initData = {
  id: "board-1",
  columnOrder: [],
  columns: []
};

//Soft array order
export const softOrder = (array, order, key) => {
  array.sort((a, b) => order.indexOf(a[key]) - order.indexOf(b[key]));
  return array;
};

//Validate
export const validateEmail = (value) => {
  const regexEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let isValid = regexEmail.test(value);
  return isValid;
};

// edit board content API
export const editBoardContent = (payload) => {
  //DATA TO CALL API
  let idUser = JSON.parse(localStorage.getItem("user")).id;
  // let idBoardLs = JSON.parse(localStorage.getItem("listColumns")).id;
  let boardLs = JSON.parse(localStorage.getItem("listColumns"));

  let action = Object.keys(payload)[0];
  let value = Object.values(payload)[0];
  let data;
  switch (action) {
  case "addCard":
    data = {
      UserId: idUser,
      newCard: {
        id: value.id,
        title: value.title,
        board: boardLs
      }
    };
    break;
  case "addColumn":
    data = {
      UserId: idUser,
      newColumn: {
        id: value.id,
        title: value.title,
        board: boardLs
      }
    };
    break;
  case "deleteCard":
    data = {
      UserId: idUser,
      idCard: {
        id: value,
        board: boardLs
      }
    };
    break;
  case "deleteColumn":
    data = {
      UserId: idUser,
      idColumn: {
        id: value,
        board: boardLs
      }
    };
    break;
  case "editTitle":
    data = {
      UserId: idUser,
      edit: {
        title: value,
        board: boardLs,
        id: boardLs.id
      }
    };
    break;
  case "swag":
    data = {
      UserId: idUser,
      swagInfor: {
        columns: value,
        board: boardLs
      }
    };
    break;
  }

  editBoard(data, action);
};


