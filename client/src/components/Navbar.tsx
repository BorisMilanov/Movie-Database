import { useContext, useEffect, useState } from "react";
import { Layout, Menu, Drawer, Button } from "antd";
import { Link, useLocation } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
import { AuthContext } from "../context/AuthContext";
import { AuthContextType } from "../types/User";

const { Header } = Layout;

const Navbar: React.FC = () => {
  const location = useLocation();
  const auth = useContext<AuthContextType | undefined>(AuthContext);

  if (!auth) throw new Error("AuthContext not available");

  const { user, logout } = auth;
  const isLoggedIn = !!user;

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { key: "/", label: <Link to="/">Home</Link> },
    { key: "/search", label: <Link to="/search">Search</Link> },
    ...(!isLoggedIn
      ? [
          { key: "/login", label: <Link to="/login">Login</Link> },
          { key: "/register", label: <Link to="/register">Register</Link> },
        ]
      : [
          { key: "/privatesearch", label: <Link to="/privatesearch">PrSearch</Link> },
          { key: "/print-movies", label: <Link to="/print-movies">Watchlist</Link> },
          { key: "/logout", label: "Logout", onClick: logout },
        ]),
  ];

  return (
    <Header style={{ background: "#1890ff", padding: 0, position: "relative" }}>
      {isMobile ? (
        <>
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setDrawerVisible(true)}
            style={{ fontSize: "20px", color: "white", position: "absolute", top: 16, left: 16, zIndex: 1000 }}
          />
          <Drawer
            title="Menu"
            placement="left"
            onClose={() => setDrawerVisible(false)}
            open={drawerVisible}
            bodyStyle={{ padding: 0 }}
          >
            <Menu
              mode="vertical"
              selectedKeys={[location.pathname]}
              onClick={() => setDrawerVisible(false)}
              items={menuItems}
            />
          </Drawer>
        </>
      ) : (
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          style={{ justifyContent: "center" }}
          items={menuItems}
        />
      )}
    </Header>
  );
};

export default Navbar;
