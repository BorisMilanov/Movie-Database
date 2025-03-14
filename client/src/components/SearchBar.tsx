import { useState } from "react";
import axios from "axios";
import { Input, Card, Row, Col, Spin } from "antd";

const API_KEY = "bb35d518f70387bdd467cd82e149adff"; // Your TMDb API Key
const BASE_URL = "https://api.themoviedb.org/3/search/movie";

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
}

const SearchBar = () => {
  const [query, setQuery] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
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
  );
};

export default SearchBar;
