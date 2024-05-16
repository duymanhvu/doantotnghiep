import axios from "axios";
import { useSelector } from "react-redux";

const env = process.env.NODE_ENV || "development";
const ipMacDevice = "ipMacDevice";
const userStorageKey = "319440F72A0342AFA37381B1C6CDFE0A";


export const constHostAddressConfigWebTrading = {
  ApiHostAddress: env === "production" ? "http://178.128.118.73:8080" : "http://178.128.118.73:8080",
};
export const getInfoIpMac = (dispatch) => {
  try {
    let _value = localStorage.getItem(ipMacDevice) ?? "";
    if (_value === undefined || _value === null) {
      _value = "";
    }
    //
    if (_value !== "") {
      return JSON.parse(_value);
    }
  } catch {}

  return {};
};
export const getUserFromStorage = () => {
    try {
      let _value = localStorage.getItem(userStorageKey) ?? "";
      if (_value === undefined || _value === null) {
        _value = "";
      }
      //
      if (_value !== "") {
        return JSON.parse(_value);
      }
    } catch {}
  
    return {};
  };
export const getToken = () => {
  const userLocalStorage = getUserFromStorage();
  return userLocalStorage?.token;
};
export const getIpMac = () => {
  const ipDevice = getInfoIpMac();
  if (typeof ipDevice === "string") {
    return ipDevice;
  }
  return null;
};
let isRefreshing = false;
let subscribers = [];
const ignoreUrls = ["HomeMobile/GeneratetOken"];

function onRefreshed(isSuccess, token) {
  var callbacks = subscribers;
  subscribers = [];

  callbacks.map((cb) => cb(isSuccess, token));
}
function subscribeTokenRefresh(cb) {
  subscribers.push(cb);
}
const client = axios.create({
  baseURL: constHostAddressConfigWebTrading.ApiHostAddress,
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("user")?.replace(/^"(.*)"$/, '$1') || ""; // Lấy token từ localStorage
  const email = localStorage.getItem("email")?.replace(/^"(.*)"$/, '$1') || ""; // Lấy token từ localStorage
  const userType = localStorage.getItem("userType")?.replace(/^"(.*)"$/, '$1') || ""; // Lấy token từ localStorage
  if (token && email) {
    config.headers.Token = `${token}`; // Đính kèm token vào header Authorization
    config.headers.Email = `${email}`;
    config.headers.UserType = `${userType}`;
  }
  return config;
});
client.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log(error.response);

    if (error.response?.status === 401) {
      // notificationShare(-1, "Kết nối đến server thất bại");
      return Promise.reject(error);
    } else {
      // Xử lý các loại lỗi khác ở đây
    }
    return Promise.reject(error);
  }
);
window.axiosClient = client;

//
export const useAxios = () => {
  let client = window.axiosClient;
  let clientHelper = {
    get: (url, config) => client.get(url, config),
    getAsync: async (url, config) => await client.get(url, config),
    post: (url, payload, config) => client.post(url, payload, config),
    postAsync: async (url, payload, config) => await client.post(url, payload, config),
    patch: (url, payload, config) => client.patch(url, { ...payload }, config),
    delete: (url, payload, config) => client.delete(url, { data: { ...payload } }, config),
    put: (url, payload, config) => client.put(url, { ...payload }, config),
    postFile: (url, file, config) => client.post(url, file, { ...config, headers: { "Content-Type": undefined } }),
    client: client,
  };
  return clientHelper;
};

export const useShareApi = (controller) => {
  const httpRequest = useAxios();
  return {
    addOne: (jsonData) => {
      return httpRequest.post(``, jsonData);
    },
  };
};

// const axiosClient = axios.create({
//   baseURL: constHostAddressConfig.ApiHostAddress,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export const getFromApi = (path) => {
//   return axiosClient.get(removeDoubleSlashURL(path));
// };

// export const getFromApiAsync = async (path) => {
//   return await axiosClient.get(removeDoubleSlashURL(path));
// };

// // Utils
// const removeDoubleSlashURL = (url) => {
//   return url.replace(/([^:]\/)\/+/g, "$1");
// };
