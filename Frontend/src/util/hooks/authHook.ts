import { useContext } from "react";
import type { AuthContextType } from "../../interfaces/auth";
import { AuthContext } from "../../contexts/AuthContext";

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
