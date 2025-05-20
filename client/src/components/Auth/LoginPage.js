import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css"; // Import CSS file

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const endpoint =
        role === "Admin"
          ? "http://localhost:5023/api/admin/login"
          : "http://localhost:5023/api/auth/login";

      const res = await axios.post(endpoint, { email, password });
      localStorage.setItem("token", res.data.token);

      if (res.data.admin) {
        navigate("/admin-details");
      } else {
        navigate("/profile");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form className="login-form" onSubmit={handleLogin}>
          <input
            className="form-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="form-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="role-selection">
            <label className="role-label">
              <input
                type="radio"
                value="User"
                checked={role === "User"}
                onChange={() => setRole("User")}
              />
              User
            </label>
            <label className="role-label">
              <input
                type="radio"
                value="Admin"
                checked={role === "Admin"}
                onChange={() => setRole("Admin")}
              />
              Admin
            </label>
          </div>
          <button className="submit-button" type="submit">
            Login
          </button>
        </form>
        <p className="register-link">
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
