import axiosInstance from "../interceptors/auth-interceptor";

export const Signup = async (value) => {
  const response = await axiosInstance.post(`/auth/signup`, value);
  return response.data;
};
