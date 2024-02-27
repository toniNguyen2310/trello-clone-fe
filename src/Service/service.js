import axios from "../Utilities/axios-customize";

//AUTH
export const callRegister = (email, username, password, phone) => {
  return axios.post("/v1/api/auth/register", {
    email,
    username,
    password,
    phone,
  });
};

export const callLogin = (email, password) => {
  return axios.post("/v1/api/auth/login", { email, password });
};

export const callFetchAccount = () => {
  return axios.get("/v1/api/auth/account");
};

export const callLogout = () => {
  return axios.post("/v1/api/auth/logout");
};

export const deleteColumn = (columnId, boardId, columnOrder) => {
  const options = {
    id: columnId,
    boardId: boardId,
    columnOrder: columnOrder
  };
  const resDeleteColumn = axios.post("/delete-column", options);
  return resDeleteColumn;
};

export const editBoard = (data, action) => {
  return axios.put(`/v1/api/auth/board/${action}`, data);
};

export const createColumn = (dataCreate) => {
  const options = {
    id: dataCreate?.id,
    boardId: dataCreate?.boardId,
    cardOrder: dataCreate?.cardOrder,
    title: dataCreate?.title,
    cards: dataCreate?.cards,
  };
  const resCreateColumn = axios.post("/add-column", options);
  return resCreateColumn;
};
