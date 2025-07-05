import axios from "axios";
const BASE_URL = import.meta.env.BACK_END_URI;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export function Auth(token: string): void {
  axiosInstance.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
}

export default axiosInstance;
