import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import API from "../services/api";

import "./Register.css";

const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {

    if (!name || !email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      toast.error(
        "Password should be at least 6 characters"
      );
      return;
    }

    try {

      setLoading(true);

      await API.post(
        "/auth/register",
        {
          name,
          email,
          password
        }
      );

      toast.success(
        "Account created successfully"
      );

      navigate("/login");

    } catch (error) {

      console.log(error);

      toast.error(
        error?.response?.data?.message ||
        "Registration failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="register-page">

      {/* Decorative Blobs */}
      <div className="register-blur register-blur-1"></div>
      <div className="register-blur register-blur-2"></div>

      <div className="register-card">

        <div className="register-header">

          <span className="register-badge">
            Join Our Bakery Family
          </span>

          <h1 className="register-title">
            Create Account
          </h1>

          <p className="register-subtitle">
            Start ordering handcrafted bakery delights today.
          </p>

        </div>

        {/* Form */}
        <div className="register-form">

          <div className="input-group">

            <label>Full Name</label>

            <input
              type="text"
              placeholder="Enter your full name"
              className="register-input"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />
          </div>

          <div className="input-group">

            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              className="register-input"
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
              placeholder="Create a password"
              className="register-input"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />
          </div>

          <button
            className="register-btn"
            onClick={handleRegister}
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Register"}
          </button>

          <p className="login-redirect">
            Already have an account?{" "}

            <Link to="/login">
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Register;