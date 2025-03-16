import { useContext } from "react";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { AuthContextType } from "../types/User";

const { Header } = Layout;

const Navbar: React.FC = () => {
  const location = useLocation();
  const auth = useContext<AuthContextType | undefined>(AuthContext);

  if (!auth) throw new Error("AuthContext not available");

  const { user, logout } = auth;
  const isLoggedIn = !!user;

  return (
    <Header style={{ background: "#1890ff", padding: 0 }}>
      <Menu theme="dark" mode="horizontal" selectedKeys={[location.pathname]} style={{ justifyContent: "center" }}>
        <Menu.Item key="/">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="/search">
          <Link to="/search">Search</Link>
        </Menu.Item>
        {!isLoggedIn ? (
          <>
            <Menu.Item key="/login">
              <Link to="/login">Login</Link>
            </Menu.Item>
            <Menu.Item key="/register">
              <Link to="/register">Register</Link>
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item key="/privatesearch">
              <Link to="/privatesearch">PrSearch</Link>
            </Menu.Item>
            <Menu.Item key="/logout" onClick={logout}>
              Logout
            </Menu.Item>
          </>
        )}
      </Menu>
    </Header>
  );
};

export default Navbar;
