import { useState } from "react";
import axios from "axios";
import { Input, Card, Row, Col, Spin, Button, message } from "antd";

const API_KEY = "bb35d518f70387bdd467cd82e149adff"; // Your TMDb API Key
const BASE_URL = "https://api.themoviedb.org/3/search/movie";

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
}

const PrivateSearchBar = () => {
  const [query, setQuery] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [watchlist, setWatchlist] = useState<Movie[]>([]); // Store added movies

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

  const handleAddToWatchlist = (movie: Movie) => {
    // Prevent adding duplicate movies
    if (watchlist.some((item) => item.id === movie.id)) {
      message.warning("Movie is already in your watchlist!");
      return;
    }

    setWatchlist([...watchlist, movie]);
    message.success(`${movie.title} added to watchlist!`);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h2>🎬 Movie Search</h2>
      <Input.Search
        placeholder="Enter movie name..."
        enterButton="Search"
        size="large"
        onSearch={handleSearch}
        onChange={(e) => setQuery(e.target.value)}
        style={{ marginBottom: "20px" }}
      />

      {loading && <Spin size="large" />}

      <Row gutter={[16, 16]} justify="center">
        {movies.map((movie) => (
          <Col xs={24} sm={12} md={8} lg={6} key={movie.id}>
            <Card
              hoverable
              cover={
                <img
                  alt={movie.title}
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : "https://via.placeholder.com/200"}
                  style={{ height: "300px", objectFit: "cover" }}
                />
              }
            >
              <Card.Meta title={movie.title} description={`⭐ ${movie.vote_average}`} />
              <Button type="primary" onClick={() => handleAddToWatchlist(movie)} style={{ marginTop: "10px", width: "100%" }}>
                ➕ Add to Watchlist
              </Button>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Display Watchlist */}
      {watchlist.length > 0 && (
        <div style={{ marginTop: "40px" }}>
          <h2>📌 Your Watchlist</h2>
          <Row gutter={[16, 16]} justify="center">
            {watchlist.map((movie) => (
              <Col xs={24} sm={12} md={8} lg={6} key={movie.id}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt={movie.title}
                      src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : "https://via.placeholder.com/200"}
                      style={{ height: "300px", objectFit: "cover" }}
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
