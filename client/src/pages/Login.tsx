import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { Layout, Card, Form, Input, Button, Typography } from "antd";
import { AuthContext } from "../context/AuthContext";

const { Content } = Layout;
const { Title } = Typography;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useContext(AuthContext);

  if (!auth) return null;
  const { login, user } = auth;

  const handleSubmit = async () => {
    await login(email, password);
  };

  if (user) return <Navigate to="/" />;

  return (
    <Layout style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Content>
        <Card
          style={{
            width: 400,
            padding: "20px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            borderRadius: "10px",
          }}
        >
          <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
            Login
          </Title>
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please enter your email!" }]}>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="large"
              />
            </Form.Item>

            <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please enter your password!" }]}>
              <Input.Password
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block size="large">
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
};

export default Login;
