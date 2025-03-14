import { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { AuthContextType, User } from "../types/User";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>(localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) {
      fetchUser(); // Ensure we fetch the user when a token exists
    }
  }, [token]);

  // ✅ Fetch user details when token is available
  const fetchUser = async () => {
    try {
      const res = await axios.get<{ user: User }>("http://localhost:5000/api/auth/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      logout();
    }
  };

  // ✅ Login Function - Fetch user after successful login
  const login = async (email: string, password: string) => {
    const res = await axios.post<{ token: string; user: User }>("http://localhost:5000/api/auth/login", { email, password });
    setToken(res.data.token);
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
  };

  // ✅ Register Function
  const register = async (fullName: string, email: string, password: string) => {
    await axios.post("http://localhost:5000/api/auth/register", { fullName, email, password });
  };

  // ✅ Logout Function
  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};
