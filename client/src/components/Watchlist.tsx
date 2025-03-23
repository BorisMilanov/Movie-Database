import React from 'react';
import { List } from 'antd';
import { useAuth } from '../context/AuthContext';

const Watchlist = () => {
  const { watchlist } = useAuth();

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <List
        bordered
        dataSource={watchlist}
        renderItem={(movie) => (
          <List.Item>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '100%' }}>
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                  alt={movie.title}
                  style={{ width: '46px', height: '69px', objectFit: 'cover', borderRadius: '4px' }}
                />
              ) : (
                <div style={{ width: '46px', height: '69px', background: '#f0f0f0', borderRadius: '4px' }} />
              )}
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'bold' }}>{movie.title}</div>
                {movie.vote_average && (
                  <div style={{ color: '#666' }}>
                    ⭐ {movie.vote_average.toFixed(1)}
                  </div>
                )}
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Watchlist;
