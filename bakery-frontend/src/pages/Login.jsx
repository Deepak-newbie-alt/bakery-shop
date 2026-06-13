import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import API from "../services/api";

import "./Login.css";

const Login = ({ setUser }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {

      setLoading(true);

      const res = await API.post(
        "/auth/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      setUser(res.data.user);

      toast.success("Login successful");

      navigate("/");

    } catch (error) {

      console.log(error);

      toast.error(
        error?.response?.data?.message ||
        "Login failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* Background Decoration */}
      <div className="login-blur login-blur-1"></div>
      <div className="login-blur login-blur-2"></div>

      <div className="login-card">

        <div className="login-header">

          <span className="login-badge">
            Fresh Bakery Experience
          </span>

          <h1 className="login-title">
            Welcome Back
          </h1>

          <p className="login-subtitle">
            Login to continue ordering your favorite treats.
          </p>

        </div>

        {/* Form */}
        <div className="login-form">

          <div className="input-group">

            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              className="login-input"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>

          <div className="input-group">

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              className="login-input"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />
          </div>

          <button
            className="login-btn"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading
              ? "Signing In..."
              : "Login"}
          </button>

          <p className="auth-switch">
            Don’t have an account?{" "}
            <Link to="/register">
              Create one
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;