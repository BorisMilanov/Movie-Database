import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import axios from "axios";
import { User, AuthContextType } from "../types/User";
import { Movie } from "../types/Movie";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [token, setToken] = useState<string>(localStorage.getItem("token") || "");
  const navigate = useNavigate();

  const clearAuth = useCallback(() => {
    setUser(null);
    setToken("");
    setWatchlist([]);
    localStorage.removeItem("token");
  }, []);

  const logout = useCallback(() => {
    clearAuth();
    navigate("/");
  }, [clearAuth, navigate]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userRes = await axios.get<{ user: User }>(
          "http://localhost:5000/api/auth/dashboard",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(userRes.data.user);
        console.log("✅ User fetched:", userRes.data.user);
      } catch (error) {
        console.error("❌ Failed to fetch user:", error);
        clearAuth();
        navigate("/");
      }
    };
  
    const fetchWatchlist = async () => {
      try {
        const movieRes = await axios.get<{ movies: Movie[] }>(
          "http://localhost:5000/api/watchlist/print-movies",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setWatchlist(movieRes.data.movies);
        console.log("✅ Watchlist fetched:", movieRes.data.movies);
      } catch (error) {
        console.error("❌ Failed to fetch watchlist:", error);
        // Optional: Don't logout here unless necessary
      }
    };
  
    if (token) {
      fetchUser();
      fetchWatchlist();
    }
  }, [token, clearAuth, navigate]);
  

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
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        watchlist,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
