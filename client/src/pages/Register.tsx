import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Layout, Card, Form, Input, Button, Typography, Alert } from "antd";

const { Content } = Layout;
const { Title } = Typography;

const Register = () => {
  const [error, setError] = useState<string | null>(null);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  if (!auth) {
    console.error("AuthContext is not available");
    return null;
  }

  const { register } = auth;

  const handleSubmit = async (values: { fullName: string; email: string; password: string }) => {
    try {
      await register(values.fullName, values.email, values.password);
      navigate("/");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Registration failed. Try again.";
      setError(errorMessage);
    }
  };

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
            Register
          </Title>

          {error && <Alert message={error} type="error" showIcon style={{ marginBottom: "15px" }} />}

          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[{ required: true, message: "Please enter your full name!" }]}
            >
              <Input placeholder="John Doe" size="large" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter your email!" },
                { type: "email", message: "Enter a valid email!" },
              ]}
            >
              <Input placeholder="example@email.com" size="large" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please enter your password!" }]}
            >
              <Input.Password placeholder="Enter your password" size="large" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block size="large">
                Register
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
};

export default Register;
