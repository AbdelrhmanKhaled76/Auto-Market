// axiosInstance.ts
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACK_END_URI;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

let authToken: string | null = null;

export function setAuthToken(token: string | null) {
  authToken = token;
}

// Setup interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    if (authToken) {
      console.log(authToken);
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/sign-in";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
