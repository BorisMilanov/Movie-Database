import React from 'react';
import { useAuth } from '../context/AuthContext';

const Watchlist: React.FC = () => {
  const auth = useAuth();
  console.log('Watchlist:', auth?.watchlist);

  if (!auth?.watchlist?.length) {
    console.log(auth?.watchlist);
    return (
      <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
        <p>No movies in your watchlist yet.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {auth.watchlist.map((movie) => (
          <li key={movie.id} style={{ marginBottom: "1rem" }}>
            <div>
              <strong>{movie.title}</strong> <br />
              Rating: {movie.vote_average ?? "N/A"}
            </div>
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                style={{ marginTop: "0.5rem", borderRadius: "8px" }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Watchlist;
