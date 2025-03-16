import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import {  Layout } from "antd";
import { AuthContext } from "../context/AuthContext";

const { Content } = Layout;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useContext(AuthContext);

  if (!auth) return null;
  const { login, user } = auth;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  if (user) return <Navigate to="/" />;

  return (
    <Layout style={{ minHeight: "100vh", width: "100vw" }}>
      
      <Content className="flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold text-lg hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>
        </div>
      </Content>
    </Layout>
  );
};

export default Login;
