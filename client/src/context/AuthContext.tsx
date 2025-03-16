import { createContext, useState, useEffect, ReactNode, useCallback } from "react";
import axios from "axios";
import { User, AuthContextType } from "../types/User";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>(localStorage.getItem("token") || "");
  const navigate = useNavigate();

  const clearAuth = useCallback(() => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
  }, []);

  const logout = useCallback(() => {
    clearAuth();
    navigate("/");
  }, [clearAuth, navigate]);

  const fetchUser = useCallback(async () => {
    try {
      const res = await axios.get<{ user: User }>("http://localhost:5000/api/auth/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      clearAuth();
      navigate("/");
    }
  }, [token, clearAuth, navigate]);

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token, fetchUser]);

  const login = async (email: string, password: string) => {
    const res = await axios.post<{ token: string; user: User }>(
      "http://localhost:5000/api/auth/login",
      { email, password }
    );
    setToken(res.data.token);
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
  };

  const register = async (fullName: string, email: string, password: string) => {
    await axios.post("http://localhost:5000/api/auth/register", {
      fullName,
      email,
      password,
    });
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};
