import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
      } else {
        try {
          const response = await axios.get(
            "http://localhost:5023/api/auth/profile",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setUser(response.data);
        } catch (err) {
          console.log(err);
          navigate("/login");
        }
      }
    };
    fetchUserData();
  }, [navigate]);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await axios.delete("http://localhost:5023/api/auth/logout", {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        console.error("Error during logout:", err);
      }
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const goToResourceManager = () => {
    navigate("/resources");
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h2 className="profile-title">User Profile</h2>
        {user ? (
          <div className="profile-details">
            <p className="profile-info">
              <strong>Username:</strong> {user.username}
            </p>
            <p className="profile-info">
              <strong>Email:</strong> {user.email}
            </p>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
            <button
              className="resource-manager-button"
              onClick={goToResourceManager}
            >
              Resource Manager
            </button>
          </div>
        ) : (
          <p className="loading-text">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
