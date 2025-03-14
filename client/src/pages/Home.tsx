import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Welcome to Our App 🚀</h1>
      <p>Please login or register to continue.</p>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "20px" }}>
        <Link to="/login">
          <button style={{ padding: "10px 20px", cursor: "pointer" }}>Login</button>
        </Link>
        <Link to="/register">
          <button style={{ padding: "10px 20px", cursor: "pointer" }}>Register</button>
        </Link>
        <Link to="/search">
          <button style={{ padding: "10px 20px", cursor: "pointer" }}>Search</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
