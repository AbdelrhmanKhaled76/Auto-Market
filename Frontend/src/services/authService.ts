import axiosInstance from "../interceptors/auth-interceptor";
import type { SigninType } from "../interfaces/auth/Signin";
import type { SignupType } from "../interfaces/auth/Signup";

export const Signup = async (value: SignupType) => {
  const response = await axiosInstance.post(`/auth/signup`, value);
  return response.data;
};
export const Signin = async (value: SigninType) => {
  const response = await axiosInstance.post(`/auth/signin`, value);
  return response.data;
};
export const Logout = async () => {
  const response = await axiosInstance.post(`/auth/logout`);
  return response.data;
};
export const RefreshToken = async () => {
  const response = await axiosInstance.post(`/auth/refreshToken`);
  return response.data;
};
