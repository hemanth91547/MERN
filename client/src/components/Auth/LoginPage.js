// src/components/Auth/LoginForm.js

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User"); // Default to "User"
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
      localStorage.setItem("token", res.data.token); // Store JWT token

      // Determine if user is admin or regular user
      if (res.data.admin) {
        navigate("/admin-details"); // Redirect to admin details page
      } else {
        navigate("/profile"); // Redirect to user profile page
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed"); // Added fallback for error message
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div>
          <label>
            <input
              type="radio"
              value="User"
              checked={role === "User"}
              onChange={() => setRole("User")}
            />
            User
          </label>
          <label>
            <input
              type="radio"
              value="Admin"
              checked={role === "Admin"}
              onChange={() => setRole("Admin")}
            />
            Admin
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </div>
  );
};

export default LoginForm;
