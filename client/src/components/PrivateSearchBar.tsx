import { useState } from "react";
import axios from "axios";
import { Input, Card, Row, Col, Spin, Button, message, Typography } from "antd";

const { Title } = Typography;

const API_KEY = "bb35d518f70387bdd467cd82e149adff"; // Your TMDb API Key
const BASE_URL = "https://api.themoviedb.org/3/search/movie";
import { Movie } from "../api/api";

const PrivateSearchBar = () => {
  const [query, setQuery] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [watchlist, setWatchlist] = useState<Movie[]>([]);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);

    try {
      const response = await axios.get<{ results: Movie[] }>(`${BASE_URL}`, {
        params: {
          api_key: API_KEY,
          query: query,
        },
      });
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching movie data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToWatchlist = async (movie: Movie) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      if (watchlist.some(m => m.id === movie.id)) {
        message.warning(`${movie.title} is already in your watchlist!`);
        return;
      }

      await axios.post('http://localhost:5000/api/watchlist/add', movie, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setWatchlist(prev => [...prev, movie]);
      message.success(`${movie.title} added to watchlist!`);
    } catch (error) {
      console.error('Failed to add movie to watchlist', error);
      message.error('Failed to add movie to watchlist');
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "30px", maxWidth: "1200px"}}>
      <Title level={2}>🎬 Movie Search</Title>
      
      <Input.Search
        placeholder="Enter movie name..."
        enterButton="Search"
        size="large"
        onSearch={handleSearch}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: "60%", marginBottom: "20px" }}
      />

      {loading && <Spin size="large" style={{ display: "block", margin: "20px auto" }} />}

      <Row gutter={[16, 16]} justify="center">
        {movies.map((movie) => (
          <Col xs={24} sm={12} md={8} lg={6} key={movie.id}>
            <Card
              hoverable
              style={{ borderRadius: "12px", overflow: "hidden" }}
              cover={
                <img
                  alt={movie.title}
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : "https://via.placeholder.com/200"}
                  style={{ height: "200px", objectFit: "cover", borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}
                />
              }
            >
              <Card.Meta title={movie.title} description={`⭐ ${movie.vote_average}`} />
              <Button 
                type="primary" 
                onClick={() => handleAddToWatchlist(movie)} 
                style={{ marginTop: "10px", width: "100%" }}
                disabled={watchlist.some(m => m.id === movie.id)}
              >
                {watchlist.some(m => m.id === movie.id) ? '✅ In Watchlist' : '➕ Add to Watchlist'}
              </Button>
            </Card>
          </Col>
        ))}
      </Row>

      {watchlist.length > 0 && (
        <div style={{ marginTop: "40px" }}>
          <Title level={2}>📌 Your Watchlist</Title>
          <Row gutter={[16, 16]} justify="center">
            {watchlist.map((movie) => (
              <Col xs={24} sm={12} md={8} lg={6} key={movie.id}>
                <Card
                  hoverable
                  style={{ borderRadius: "12px", overflow: "hidden" }}
                  cover={
                    <img
                      alt={movie.title}
                      src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : "https://via.placeholder.com/200"}
                      style={{ height: "300px", objectFit: "cover", borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}
                    />
                  }
                >
                  <Card.Meta title={movie.title} description={`⭐ ${movie.vote_average}`} />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
};

export default PrivateSearchBar;
