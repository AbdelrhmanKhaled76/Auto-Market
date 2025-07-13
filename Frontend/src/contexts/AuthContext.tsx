// src/contexts/AuthContext.tsx
import { createContext, useState, useEffect, type ReactNode } from "react";
import { signinUser, logoutUser, refreshToken } from "../services/authService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import type { SigninType } from "../interfaces/auth/Signin";
import { setAuthToken } from "../interceptors/auth-interceptor";
import type { AuthContextType } from "../interfaces/auth";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const handleSignIn = async (
    values: SigninType,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    try {
      const res = await signinUser(values);
      toast.success("Logged in successfully!");
      localStorage.setItem("token", res.accessToken);
      setToken(res.accessToken);
      setAuthToken(res.accessToken); // set for axios
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Failed to sign in.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogOut = async () => {
    try {
      await logoutUser();
      localStorage.removeItem("token");
      setToken(null);
      setAuthToken(null);
      navigate("/sign-in");
    } catch (err) {
      console.error(err);
      toast.error("Failed to log out.");
    }
  };

  useEffect(() => {
    const local = localStorage.getItem("token");
    if (local) {
      setToken(local);
      setAuthToken(local);
    } else {
      refreshToken()
        .then((res) => {
          setToken(res.token);
          setAuthToken(res.token);
          localStorage.setItem("token", res.token);
        })
        .catch(() => {
          setToken(null);
          setAuthToken(null);
          localStorage.removeItem("token");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ loading, token, handleSignIn, handleLogOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
