import { editBoard } from "../Service/service";

export const applyDrag = (arr, dragResult) => {
  const { removedIndex, addedIndex, payload } = dragResult;
  if (removedIndex === null && addedIndex === null) return arr;

  const result = [...arr];
  let itemToAdd = payload;

  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0];
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd);
  }

  return result;
};

export const createPlaceHolderCard = (column) => {
  return {
    id: `${column.id}-placeholder-card`,
    boardId: column.boardId,
    columnId: column.id,
    FE_PlaceholderCard: true,
  };
};

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
          board: boardLs,
        },
      };
      break;
    case "addColumn":
      data = {
        UserId: idUser,
        newColumn: {
          id: value.id,
          title: value.title,
          board: boardLs,
        },
      };
      break;
    case "deleteCard":
      data = {
        UserId: idUser,
        idCard: {
          id: value,
          board: boardLs,
        },
      };
      break;
    case "deleteColumn":
      data = {
        UserId: idUser,
        idColumn: {
          id: value,
          board: boardLs,
        },
      };
      break;
    case "editTitle":
      data = {
        UserId: idUser,
        edit: {
          title: value,
          board: boardLs,
          id: boardLs.id,
        },
      };
      break;
    case "swag":
      data = {
        UserId: idUser,
        swagInfor: {
          columns: value,
          board: boardLs,
        },
      };
      break;
  }

  editBoard(data, action);
};
