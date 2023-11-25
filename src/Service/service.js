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

// export const editInforUSer = (data) => {
//   return axios.put(`/v1/api/user/${data.id}`, data.user);
// };

export const editBoard = (data) => {
  return axios.put(`/v1/api/auth/board`, data);
};
