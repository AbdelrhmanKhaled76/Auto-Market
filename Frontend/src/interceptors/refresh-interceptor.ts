import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACK_END_URI;

export const refreshAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // need cookies for refresh token
});
