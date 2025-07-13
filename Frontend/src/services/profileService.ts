import axiosInstance from "../interceptors/auth-interceptor";

export async function getProfile() {
  const response = await axiosInstance.get(`/user/profile`);
  return await response.data;
}
