import axiosInstance from "../interceptors/auth-interceptor";

export const getAllCars = async () => {
  const response = await axiosInstance.get("cars");
  return response.data;
};

export const getCarDetails = async (id: number) => {
  const response = await axiosInstance.get("cars", {
    params: {
      id,
    },
  });
  return response.data;
};

export const getFeaturedCars = async () => {
  const response = await axiosInstance.get("cars/featured");
  return response.data;
};

export const getRecentCars = async () => {
  const response = await axiosInstance.get("cars/recent");
  return response.data;
};

export const sellCar = async (value: any) => {
  const response = await axiosInstance.post("cars/sellCar", value);
  return response.data;
};
