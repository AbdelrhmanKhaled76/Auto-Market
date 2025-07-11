import axiosInstance from "../interceptors/auth-interceptor";

export async function getAllReviews() {
  const response = await axiosInstance.get("user/reviews");
  return await response.data;
}
