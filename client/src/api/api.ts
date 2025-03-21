// api.ts (React TypeScript example with Axios)
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('token');

export const addMovieToWatchlist = async (movie: Movie) => {
  const token = getToken();
  return axios.post(`${API_URL}/watchlist/add`, movie, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const fetchWatchlist = async () => {
  const token = getToken();
  return axios.get(`${API_URL}/watchlist`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const loginUser = async (username: string, password: string) => {
  return axios.post(`${API_URL}/login`, { username, password });
};

// Movie.ts (interface definition)
export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
}
