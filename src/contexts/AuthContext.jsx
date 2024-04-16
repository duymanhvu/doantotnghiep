import { createContext, useReducer } from "react";
import axios from "axios";

import { authReducer } from "../reducers/authReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constants";
export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: localStorage.getItem("isAuthenticated") ?? false,
    user: JSON.parse(localStorage.getItem("user") ?? "{}"),
  });

  const client = axios.create({
    baseURL: apiUrl,
  });

  client.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error && error.code === "ECONNABORTED") {
        return Promise.reject(error);
      }

      //
      const originalRequest = error.response.config;

      if (401 === error.response?.status) {
        logoutUser();
      }

      return Promise.reject(error);
    },
  );

  //   Login
  const loginUser = async (data) => {
    try {
      const response = await client.post(`auth/login`, data);

      if (response.data.status === 1) {
        localStorage.setItem("user", JSON.stringify(response.data.userInfor));
        //set auth vào cookie
        // console.log("response.data.token", response.data.token)
        setCookie(
          "AUTH",
          JSON.stringify({ ...response.data.token.original, user: undefined }),
          response.data.token.original.expires_in,
        );
        localStorage.setItem("isAuthenticated", true);
        dispatch({
          type: "SET_AUTH",
          payload: { isAuthenticated: true, user: response.data.userInfor },
        });
      }
      return response.data;
    } catch (error) {
      if (error.message) return error.response.data.error;
      else {
        localStorage.setItem("isAuthenticated", false);
        dispatch({
          type: "SET_AUTH",
          payload: { authLoading: false, isAuthenticated: false },
        });
      }
    }
  };

  //   register
  const registerUser = async (data) => {
    try {
      const response = await client.post(`auth/signup`, data);
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  const getUser = async () => {
    try {
      const token = JSON.parse(getCookie("AUTH") ?? "{}");
      let config = {};
      if (token?.access_token) {
        config.headers = {
          Authorization: "Bearer " + token?.access_token,
        };
      }
      const response = await client.get(`profile`, config);
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // edit
  const editUser = async (data) => {
    try {
      const token = JSON.parse(getCookie("AUTH") ?? "{}");
      let config = {};
      if (token?.access_token) {
        config.headers = {
          Authorization: "Bearer " + token?.access_token,
        };
      }
      
      const response = await client.post(`profile`, data, config);
      if (response.data.success === 1) {
        dispatch({
          type: "EDIT_USER",
          payload: { user: response.data.user },
        });
      }

      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // Forgot pass
  const forgotPass = async (data) => {
    const response = await client.post(`${apiUrl}/forgot-password`, data);

    return response.data;
  };

  // Logout
  const logoutUser = async () => {
    const token = JSON.parse(getCookie("AUTH") ?? "{}");
    let config = {};
    let response = {};

    if (token?.access_token) {
      config.headers = {
        Authorization: "Bearer " + token?.access_token,
      };
      response = await client.get(`logout`, config);
    }
    dispatch({
      type: "EDIT_USER",
      payload: { user: {} },
    });

    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
    setCookie("AUTH", null, 1);
    dispatch({
      type: "SET_AUTH",
      payload: { authLoading: false, isAuthenticated: false, user: null },
    });

    return response.data;
  };

  //   Context data
  const authContextData = {
    loginUser,
    getUser,
    registerUser,
    editUser,
    logoutUser,
    forgotPass,
    authState,
  };

  //   Return provider
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

function setCookie(name, value, seconds) {
  var expires = "";
  if (seconds) {
    var date = new Date();
    date.setTime(date.getTime() + seconds * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export default AuthContextProvider;
