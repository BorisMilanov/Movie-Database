import { Movie } from './Movie';

export interface User {
  id: string;
  fullName: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  token: string;
  watchlist: Movie[];
  login: (email: string, password: string) => Promise<void>;
  register: (fullName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}