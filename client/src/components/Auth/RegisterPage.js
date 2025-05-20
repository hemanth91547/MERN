import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css"; // Import CSS file

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint =
        role === "Admin"
          ? "http://localhost:5023/api/admin/register"
          : "http://localhost:5023/api/auth/register";

      await axios.post(endpoint, { username, email, password });
      navigate("/login");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error);
      } else {
        setError("Error creating account.");
      }
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2 className="register-title">Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <input
            className="form-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <input
            className="form-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
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
            Register
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default RegisterPage;
