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
    FE_PlaceholerCard: true,
  };
};

export const editBoardContent = () => {
  //DATA TO CALL API
  let idUser = JSON.parse(localStorage.getItem("user")).id;
  let boardLs = JSON.parse(localStorage.getItem("listColumns"));
  let data = {
    UserId: idUser,
    board: boardLs,
  };
  editBoard(data);
};
