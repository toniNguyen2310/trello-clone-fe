import axios from "axios";
const baseURL = import.meta.env.VITE_BACKEND_URL;

const instance = axios.create({
  baseURL: baseURL
});

//Assign access_token in LS to axios
instance.defaults.headers.common = {
  Authorization: `Bearer ${localStorage.getItem("access_token")}`
};

//Handle refresh Token
const handleRefreshToken = async () => {
  const refreshLocal = localStorage.getItem("refresh_token");
  const res = await instance.post("/v1/api/auth/refresh", { refreshLocal });
  if (res && res.data) {
    if (res.data === "không có refresh token trong LS") {
      localStorage.removeItem("user");
      localStorage.removeItem("listColumns");
    }
    return res.data;
  } else return;
};

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

//Variable assignment to avoid infinite retries
const NO_RETRY_HEADER = "x-no-retry";

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    return response && response.data ? response.data : response;
  },

  //ERROR WITH LS REFRESH TOKEN
  async function (error) {
    if (
      error.config &&
      error.response &&
      +error.response.status === 401 &&
      //Conditions to avoid infinite retries
      !error.config.headers[NO_RETRY_HEADER]
    ) {
      const data = await handleRefreshToken();
      error.config.headers[NO_RETRY_HEADER] = "true";

      if (data && data.accessToken && data.refreshToken) {
        error.config.headers["Authorization"] = `Bearer ${data.accessToken}`;
        localStorage.setItem("access_token", data.accessToken);
        localStorage.setItem("refresh_token", data.refreshToken);
        return instance.request(error.config);
      } else return;
    }
    if (
      error.config &&
      error.response &&
      +error.response.status === 400 &&
      error.config.url === "/v1/api/auth/refresh"
    ) {
      localStorage.removeItem("user");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("access_token");
      localStorage.removeItem("listColumns");
      window.location.href = "/login";
    }

    return error?.response?.data ?? Promise.reject(error);
  }
);

export default instance;
