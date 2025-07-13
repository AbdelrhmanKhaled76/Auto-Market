import { AxiosError } from "axios";
import { toast } from "react-hot-toast";

export const handleError = (error: unknown): void => {
  console.error("Network error:", error);

  let message = "Something went wrong";

  if (error && typeof error === "object") {
    if ("isAxiosError" in error && (error as AxiosError).response) {
      const axiosError = error as AxiosError<{ message?: string }>;
      message = axiosError.response?.data?.message || message;
    } else if (error instanceof Error) {
      message = error.message;
    }
  }

  toast.error(message);
};
