import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User"); // Default to "User"
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint =
        role === "Admin"
          ? "http://localhost:5023/api/admin/register"
          : "http://localhost:5023/api/auth/register";

      await axios.post(endpoint, {
        username,
        email,
        password,
      });
      navigate("/login"); // Redirect after successful registration
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error); // Display error from the backend
      } else {
        setError("Error creating account."); // Fallback error message
      }
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
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
        <button type="submit">Register</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default RegisterPage;
