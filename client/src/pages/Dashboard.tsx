import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.user) {
      auth?.fetchUser(); // Fetch user data on mount
    }
  }, []);

  if (!auth) return null;

  const { user, logout } = auth;

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to home page after logout
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Welcome, {user?.fullName} 👋</h1>
      <p>Email: {user?.email}</p>
      <button
        onClick={handleLogout}
        style={{
          padding: "10px 20px",
          cursor: "pointer",
          backgroundColor: "red",
          color: "white",
          border: "none",
          borderRadius: "5px",
          marginTop: "10px",
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
